<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentStatusController extends Controller
{
    public function success(Request $request)
    {
        // Verificar si el usuario tiene permiso para acceder
        if (!$request->session()->has('payment_in_progress')) {
            return redirect('/')->with('error', 'No tienes permiso para acceder a esta página.');
        }

        // Limpiar la sesión después de acceder
        $request->session()->forget('payment_in_progress');

        $cart = $request->user()->cart()->with('items.product')->first();

        // Vaciar el carrito
        if ($cart) {
            $cart->items()->delete(); // Elimina los elementos del carrito
            $cart->delete(); // Opcional: elimina el carrito si ya no se necesita
        }

        return Inertia::render('Cart/Success', [
            'message' => '¡Pago realizado con éxito!',
            'payment_id' => $request->get('payment_id'),
            'cart' => $cart,
            'user' => $request->user(),
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
