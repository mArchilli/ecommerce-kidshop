<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class PaymentStatusController extends Controller
{
    public function success(Request $request)
    {
        // Obtener datos de la sesión
        $shippingInfo = $request->session()->get('shipping_info');
        $paymentInProgress = $request->session()->get('payment_in_progress', false);
        
        // Validar que haya un pago en progreso
        if (!$paymentInProgress || !$shippingInfo) {
            return redirect()->route('checkout.index')->with('error', 'No hay información de pago disponible.');
        }

        // Obtener el usuario autenticado
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login')->with('error', 'Debes iniciar sesión.');
        }

        // Obtener el carrito del usuario
        $cart = $user->cart()->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('checkout.index')->with('error', 'Tu carrito está vacío o expirado.');
        }

        // Obtener el payment_id de MercadoPago
        $paymentId = $request->get('payment_id') ?? 'pending';

        // --- Verificar si el webhook ya creó la orden para este pago ---
        $existingOrder = ($paymentId !== 'pending')
            ? Order::where('payment_id', $paymentId)->with(['items.product', 'user'])->first()
            : null;

        if ($existingOrder) {
            Log::info('success(): orden ya existente (creada por webhook)', ['order_id' => $existingOrder->id]);

            // Vaciar el carrito si todavía existe (puede que el webhook ya lo hizo)
            if ($cart) {
                $cart->items()->delete();
                $cart->delete();
            }
            // Limpiar sesión
            $request->session()->forget(['shipping_info', 'payment_in_progress']);

            return Inertia::render('Cart/Success', [
                'message'    => '¡Pago realizado con éxito!',
                'payment_id' => $paymentId,
                'order'      => $existingOrder,
                'user'       => $user,
                'shippingInfo' => $shippingInfo,
                'autoWhatsApp' => true,
            ]);
        }

        // --- La orden NO fue creada por webhook: la creamos ahora ---
        $dni = $shippingInfo['dni'] ?? null;

        if (!$dni) {
            return redirect()->route('checkout.index')->with('error', 'Falta información del DNI.');
        }

        $order = $user->orders()->create([
            'payment_id' => $paymentId,
            'total' => $cart->items->sum(fn($item) => $item->unit_price * $item->quantity),
            'status' => 'completed',
            'shipping_status' => Order::SHIPPING_STATUS_PENDING,
            'province' => $shippingInfo['province'] ?? null,
            'city' => $shippingInfo['city'] ?? null,
            'postal_code' => $shippingInfo['postal_code'] ?? null,
            'address' => $shippingInfo['address'] ?? null,
            'phone' => $shippingInfo['phone'] ?? null,
            'shipping_method' => $shippingInfo['shipping_method'] ?? null,
            'dni' => $dni,
            'first_name' => $shippingInfo['first_name'] ?? null,
            'last_name' => $shippingInfo['last_name'] ?? null,
            'email' => $shippingInfo['email'] ?? null,
            'observations' => $shippingInfo['observations'] ?? null,
            'courier_company' => $shippingInfo['courier_company'] ?? null,
        ]);

        // Crear los detalles de la orden con el precio real del carrito
        foreach ($cart->items as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->unit_price, // Precio con descuento aplicado
                'size' => $item->size ?? null,
            ]);
        }

        // Vaciar el carrito
        $cart->items()->delete();
        $cart->delete();

        // Limpiar la sesión
        $request->session()->forget(['shipping_info', 'payment_in_progress']);

        // Cargar relaciones necesarias para la vista
        $order->load(['items.product', 'user']);

        // Renderizar la vista de éxito con datos completos
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
