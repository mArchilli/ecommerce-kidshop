<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Order;
use App\Models\User;
use App\Models\Size;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;

class MercadoPagoWebhookController extends Controller
{
    private function findSizeModel(string $sizeName)
    {
        $byExact = Size::where('name', $sizeName)->first();
        if ($byExact) return $byExact;

        $normalized = Str::of($sizeName)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value();
        return Size::all()->first(fn($s) => Str::of($s->name)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value() === $normalized);
    }

    public function handle(Request $request)
    {
        $payload = $request->all();

        Log::info('Webhook MercadoPago recibido', $payload);

        // ── Validación de firma HMAC-SHA256 ──────────────────────────────────
        $secret = config('services.mercadopago.webhook_secret');

        if ($secret) {
            $xSignature = $request->header('x-signature');      // ts=...,v1=...
            $xRequestId = $request->header('x-request-id', '');
            $dataId     = $payload['data']['id'] ?? $payload['id'] ?? null;

            if (!$xSignature) {
                Log::warning('Webhook: falta el header x-signature');
                return response()->json(['status' => 'unauthorized'], 401);
            }

            // Parsear ts y v1 del header x-signature
            $ts = null;
            $v1 = null;
            foreach (explode(',', $xSignature) as $part) {
                [$key, $val] = array_pad(explode('=', trim($part), 2), 2, null);
                if ($key === 'ts') $ts = $val;
                if ($key === 'v1') $v1 = $val;
            }

            if (!$ts || !$v1) {
                Log::warning('Webhook: header x-signature malformado', ['x-signature' => $xSignature]);
                return response()->json(['status' => 'unauthorized'], 401);
            }

            // Construir el manifest según la documentación de MercadoPago
            $manifest = "id:{$dataId};request-id:{$xRequestId};ts:{$ts};";
            $computed  = hash_hmac('sha256', $manifest, $secret);

            if (!hash_equals($computed, $v1)) {
                Log::warning('Webhook: firma inválida', [
                    'manifest' => $manifest,
                    'computed' => $computed,
                    'received' => $v1,
                ]);
                return response()->json(['status' => 'unauthorized'], 401);
            }

            Log::info('Webhook: firma válida');
        } else {
            Log::warning('Webhook: MERCADOPAGO_WEBHOOK_SECRET no configurado, saltando validación de firma');
        }
        // ─────────────────────────────────────────────────────────────────────

        // MercadoPago envía diferentes tipos de notificaciones
        $type   = $payload['type'] ?? $payload['topic'] ?? null;
        // $dataId ya fue declarado arriba si se validó la firma, sino lo declaramos aquí
        $dataId = $payload['data']['id'] ?? $payload['id'] ?? null;

        // Sólo procesamos notificaciones de pago
        if (!in_array($type, ['payment', 'merchant_order']) || !$dataId) {
            Log::info('Webhook ignorado: tipo no soportado o sin ID', ['type' => $type, 'id' => $dataId]);
            return response()->json(['status' => 'ignored'], 200);
        }

        try {
            // Configurar el token de MercadoPago
            MercadoPagoConfig::setAccessToken(config('services.mercadopago.access_token'));

            // Obtener detalles del pago desde la API de MercadoPago
            $client = new PaymentClient();
            $payment = $client->get((int) $dataId);

            if (!$payment) {
                Log::warning('Webhook: pago no encontrado', ['payment_id' => $dataId]);
                return response()->json(['status' => 'payment_not_found'], 200);
            }

            $status = $payment->status ?? null;
            $externalReference = $payment->external_reference ?? null;
            $paymentId = (string) $payment->id;

            Log::info('Webhook: detalles del pago', [
                'payment_id' => $paymentId,
                'status' => $status,
                'external_reference' => $externalReference,
            ]);

            // Solo procesamos pagos aprobados
            if ($status !== 'approved') {
                Log::info('Webhook: pago no aprobado, ignorando', ['status' => $status]);
                return response()->json(['status' => 'not_approved'], 200);
            }

            // Verificar si ya existe una orden con este payment_id (idempotencia)
            $existingOrder = Order::where('payment_id', $paymentId)->first();
            if ($existingOrder) {
                Log::info('Webhook: orden ya existe para este pago', ['order_id' => $existingOrder->id]);
                return response()->json(['status' => 'already_processed'], 200);
            }

            // Recuperar la información de envío guardada en cache por external_reference
            $cacheKey = 'shipping_info_' . $externalReference;
            $shippingInfo = Cache::get($cacheKey);

            if (!$shippingInfo) {
                Log::warning('Webhook: no se encontró shipping_info en cache', [
                    'external_reference' => $externalReference,
                    'cache_key' => $cacheKey,
                ]);
                return response()->json(['status' => 'shipping_info_not_found'], 200);
            }

            // Extraer el user_id del external_reference (formato: "userId_timestamp")
            $parts = explode('_', $externalReference);
            $userId = (int) $parts[0];
            $user = User::find($userId);

            if (!$user) {
                Log::warning('Webhook: usuario no encontrado', ['user_id' => $userId]);
                return response()->json(['status' => 'user_not_found'], 200);
            }

            // Obtener el carrito del usuario
            $cart = $user->cart()->with('items.product')->first();

            if (!$cart || $cart->items->isEmpty()) {
                Log::warning('Webhook: carrito vacío o no encontrado', ['user_id' => $userId]);
                return response()->json(['status' => 'cart_empty'], 200);
            }

            // Calcular total antes del closure para evitar ambigüedad de tipos
            $orderTotal = $cart->items->reduce(fn($carry, $item) => $carry + ($item->unit_price * $item->quantity), 0);

            // Crear la orden
            $order = DB::transaction(function () use ($user, $cart, $paymentId, $shippingInfo, $orderTotal) {
                $order = $user->orders()->create([
                    'payment_id'      => $paymentId,
                    'total'           => $orderTotal,
                    'status'          => 'completed',
                    'shipping_status' => Order::SHIPPING_STATUS_PENDING,
                    'province'        => $shippingInfo['province'] ?? null,
                    'city'            => $shippingInfo['city'] ?? null,
                    'postal_code'     => $shippingInfo['postal_code'] ?? null,
                    'address'         => $shippingInfo['address'] ?? null,
                    'phone'           => $shippingInfo['phone'] ?? null,
                    'shipping_method' => $shippingInfo['shipping_method'] ?? null,
                    'dni'             => $shippingInfo['dni'] ?? null,
                    'first_name'      => $shippingInfo['first_name'] ?? null,
                    'last_name'       => $shippingInfo['last_name'] ?? null,
                    'email'           => $shippingInfo['email'] ?? null,
                    'observations'    => $shippingInfo['observations'] ?? null,
                    'courier_company' => $shippingInfo['courier_company'] ?? null,
                ]);

                foreach ($cart->items as $item) {
                    $order->items()->create([
                        'product_id' => $item->product_id,
                        'quantity'   => $item->quantity,
                        'price'      => $item->unit_price,
                        'size'       => $item->size ?? null,
                    ]);

                    if ($item->size) {
                        $sizeModel = $this->findSizeModel($item->size);
                        if ($sizeModel) {
                            DB::table('product_size')
                                ->where('product_id', $item->product_id)
                                ->where('size_id', $sizeModel->id)
                                ->where('stock', '>', 0)
                                ->decrement('stock', $item->quantity);
                        }
                    }
                }

                $cart->items()->delete();
                $cart->delete();

                return $order;
            });

            // Limpiar el cache
            Cache::forget($cacheKey);

            Log::info('Webhook: orden creada exitosamente por webhook', [
                'order_id'   => $order->id,
                'user_id'    => $userId,
                'payment_id' => $paymentId,
            ]);

            return response()->json(['status' => 'order_created', 'order_id' => $order->id], 200);

        } catch (\Exception $e) {
            Log::error('Webhook MercadoPago: error al procesar pago', [
                'error'      => $e->getMessage(),
                'payment_id' => $dataId,
            ]);

            // Devolvemos 200 para que MercadoPago no reintente indefinidamente en errores lógicos
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 200);
        }
    }
}
