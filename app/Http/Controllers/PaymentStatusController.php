<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentStatusController extends Controller
{
    public function success(Request $request)
    {
        // Obtener el carrito del usuario
        $cart = $request->user()->cart()->with('items.product')->first();

        // Verificar si el carrito existe y tiene productos
        if ($cart && $cart->items->isNotEmpty()) {
            // Obtener la información de envío desde la sesión
            $shippingInfo = $request->session()->get('shipping_info');

            if (!$shippingInfo) {
                return redirect()->route('checkout.index')->with('error', 'No se encontró la información de envío.');
            }

            // Crear la orden
            $order = $request->user()->orders()->create([
                'payment_id' => $request->get('payment_id'),
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
                    'province' => $shippingInfo['province'],
                    'city' => $shippingInfo['city'],
                    'postal_code' => $shippingInfo['postal_code'],
                    'address' => $shippingInfo['address'],
                    'phone' => $shippingInfo['phone'],
                    'shipping_method' => $shippingInfo['shipping_method'],
                ]);
            }

            // Vaciar el carrito
            $cart->items()->delete(); // Elimina los elementos del carrito
            $cart->delete(); // Opcional: elimina el carrito si ya no se necesita
        }

        // Retornar la vista de éxito con los datos adicionales
        return Inertia::render('Cart/Success', [
            'message' => '¡Pago realizado con éxito!',
            'payment_id' => $request->get('payment_id'),
            'order' => $order ?? null, // Pasar la orden a la vista si fue creada
            'user' => $request->user(), // Pasar el usuario autenticado a la vista
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
