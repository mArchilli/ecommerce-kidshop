<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Order;
use App\Models\Size;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaymentStatusController extends Controller
{
    private function findSizeModel(string $sizeName)
    {
        $byExact = Size::where('name', $sizeName)->first();
        if ($byExact) return $byExact;

        $normalized = Str::of($sizeName)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value();
        return Size::all()->first(fn($s) => Str::of($s->name)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value() === $normalized);
    }

    public function success(Request $request)
    {
        $paymentId    = $request->get('payment_id');
        $shippingInfo = $request->session()->get('shipping_info');

        // ── PASO 1: Buscar orden existente por payment_id PRIMERO ──────────
        // Cubre: webhook ya la creó, o success() ya la creó en un intento previo.
        // También cubre pérdida de sesión en mobile (MercadoPago abre nueva pestaña).
        if ($paymentId && $paymentId !== 'pending') {
            $existingOrder = Order::where('payment_id', $paymentId)
                ->with(['items.product', 'user'])
                ->first();

            if ($existingOrder) {
                Log::info('success(): orden encontrada por payment_id', ['order_id' => $existingOrder->id]);

                // Limpiar carrito y sesión si todavía existen
                $user = $request->user();
                if ($user) {
                    $cart = $user->cart()->with('items')->first();
                    if ($cart) {
                        $cart->items()->delete();
                        $cart->delete();
                    }
                }
                $request->session()->forget(['shipping_info', 'payment_in_progress']);

                return Inertia::render('Cart/Success', [
                    'message'      => '¡Pago realizado con éxito!',
                    'payment_id'   => $paymentId,
                    'order'        => $existingOrder,
                    'user'         => $existingOrder->user,
                    'shippingInfo' => $shippingInfo,
                    'autoWhatsApp' => true,
                ]);
            }
        }

        // ── PASO 2: No existe orden aún → necesitamos sesión para crearla ──
        $paymentInProgress = $request->session()->get('payment_in_progress', false);

        if (!$paymentInProgress || !$shippingInfo) {
            // Sesión perdida y el webhook no creó la orden (o aún no llegó).
            // Redirigir al inicio con mensaje amigable; el webhook la creará igual.
            Log::warning('success(): sesión perdida y sin orden existente', ['payment_id' => $paymentId]);
            return redirect()->route('welcome')
                ->with('info', 'Tu pago fue procesado correctamente. Podés ver tu orden en "Mis Pedidos".');
        }

        // Obtener el usuario autenticado
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login');
        }

        // Obtener el carrito del usuario
        $cart = $user->cart()->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('welcome')
                ->with('info', 'Tu pago fue procesado. Podés ver tu orden en "Mis Pedidos".');
        }

        // ── PASO 3: Crear la orden (el webhook no llegó a tiempo) ───────────
        $dni = $shippingInfo['dni'] ?? null;
        if (!$dni) {
            return redirect()->route('checkout.index')->with('error', 'Falta información del DNI.');
        }

        $order = DB::transaction(function () use ($user, $cart, $paymentId, $shippingInfo, $dni) {
            $order = $user->orders()->create([
                'payment_id'      => $paymentId ?? 'pending',
                'total'           => $cart->items->sum(fn($item) => $item->unit_price * $item->quantity),
                'status'          => 'completed',
                'shipping_status' => Order::SHIPPING_STATUS_PENDING,
                'province'        => $shippingInfo['province'] ?? null,
                'city'            => $shippingInfo['city'] ?? null,
                'postal_code'     => $shippingInfo['postal_code'] ?? null,
                'address'         => $shippingInfo['address'] ?? null,
                'phone'           => $shippingInfo['phone'] ?? null,
                'shipping_method' => $shippingInfo['shipping_method'] ?? null,
                'dni'             => $dni,
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

        $request->session()->forget(['shipping_info', 'payment_in_progress']);
        $order->load(['items.product', 'user']);

        return Inertia::render('Cart/Success', [
            'message'      => '¡Pago realizado con éxito!',
            'payment_id'   => $paymentId,
            'order'        => $order,
            'user'         => $user,
            'shippingInfo' => $shippingInfo,
            'autoWhatsApp' => true,
        ]);
    }

    public function failure(Request $request)
    {
        // Limpiar la sesión de pago
        $request->session()->forget('payment_in_progress');

        return Inertia::render('Cart/Failure', [
            'message' => 'El pago ha fallado o fue cancelado.',
        ]);
    }

    public function pending(Request $request)
    {
        // Mantener la información en sesión por si se completa después
        return Inertia::render('Cart/Pending', [
            'message' => 'Tu pago está pendiente de aprobación.',
        ]);
    }
}
