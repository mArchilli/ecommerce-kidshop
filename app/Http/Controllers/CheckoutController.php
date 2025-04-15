<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        // Obtener el carrito del usuario autenticado
        $cart = $request->user()->cart()->with('items.product')->first();

        return Inertia::render('Cart/Checkout', [
            'cart' => $cart,
        ]);
    }

    public function payment(Request $request)
{
    // Obtener el carrito del usuario autenticado con los productos asociados
    $cart = $request->user()->cart()->with('items.product')->first();

    // Aquí puedes generar la preferencia de pago con MercadoPago si es necesario
    return Inertia::render('Cart/Payment', [
        'cart' => $cart,
    ]);
}
}