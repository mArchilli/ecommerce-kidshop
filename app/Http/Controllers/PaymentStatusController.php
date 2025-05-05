<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class PaymentStatusController extends Controller
{
    public function success(Request $request)
    {
        // Obtener y decodificar la external_reference
        $externalRef = json_decode($request->get('external_reference'), true);

        // Extraer los datos de external_reference
        $userId = $externalRef['user_id'] ?? null;
        $shippingInfo = $externalRef['shipping_info'] ?? null;
        $paymentId = $request->get('payment_id');

        // Validaciones básicas
        if (!$paymentId || !$userId || !$shippingInfo) {
            return redirect()->route('checkout.index')->with('error', 'Datos de pago inválidos o incompletos.');
        }

        // Buscar al usuario
        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('checkout.index')->with('error', 'Usuario no encontrado.');
        }

        // Obtener el carrito del usuario
        $cart = $user->cart()->with('items.product')->first();
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('checkout.index')->with('error', 'Tu carrito está vacío o expirado.');
        }

        // Crear la orden
        $order = $user->orders()->create([
            'payment_id' => $paymentId,
            'total' => $cart->items->sum(fn($item) => $item->product->price * $item->quantity),
            'status' => 'completed',
            'province' => $shippingInfo['province'],
            'city' => $shippingInfo['city'],
            'postal_code' => $shippingInfo['postal_code'],
            'address' => $shippingInfo['address'],
            'phone' => $shippingInfo['phone'],
            'shipping_method' => $shippingInfo['shipping_method'],
        ]);

        // Crear los detalles de la orden
        foreach ($cart->items as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
                'status' => 'completed',
            ]);
        }

        // Vaciar el carrito
        $cart->items()->delete();
        $cart->delete();

        // Renderizar la vista de éxito
        return Inertia::render('Cart/Success', [
            'message' => '¡Pago realizado con éxito!',
            'payment_id' => $paymentId,
            'order' => $order,
            'user' => $user,
        ]);
    }

    public function failure(Request $request)
    {
        if (!$request->session()->has('payment_in_progress')) {
            return redirect('/')->with('error', 'No tienes permiso para acceder a esta página.');
        }

        $request->session()->forget('payment_in_progress');

        return Inertia::render('Cart/Failure', [
            'message' => 'El pago ha fallado o fue cancelado.',
        ]);
    }

    public function pending(Request $request)
    {
        if (!$request->session()->has('payment_in_progress')) {
            return redirect('/')->with('error', 'No tienes permiso para acceder a esta página.');
        }

        $request->session()->forget('payment_in_progress');

        return Inertia::render('Cart/Pending', [
            'message' => 'Tu pago está pendiente de aprobación.',
        ]);
    }
}
