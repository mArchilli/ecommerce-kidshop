<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->user()->cart()->with('items.product')->first();

        return Inertia::render('Cart/Checkout', [
            'cart' => $cart,
        ]);
    }

    public function payment(Request $request)
    {
        // Establecer indicador en la sesión
        $request->session()->put('payment_in_progress', true);

        // Obtener el carrito del usuario
        $cart = $request->user()->cart()->with('items.product')->first();

        // Verificar si el carrito está vacío
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('checkout.index')->with('error', 'Tu carrito está vacío.');
        }

        // Configurar el token de MercadoPago
        MercadoPagoConfig::setAccessToken(config('services.mercadopago.access_token'));

        // Crear cliente de preferencias
        $client = new PreferenceClient();

        // Mapea los items para MercadoPago
        $items = $cart->items->map(function ($item) {
            return [
                'title' => $item->product->name,
                'quantity' => (int) $item->quantity,
                'unit_price' => (float) $item->product->price,
            ];
        })->toArray();

        // Crear la preferencia
        $preference = $client->create([
            'items' => $items,
            'back_urls' => [
                'success' => route('payment.success'),
                'failure' => route('payment.failure'),
                'pending' => route('payment.pending'),
            ],
            'auto_return' => 'approved',
        ]);

        // Retornar la vista con el preferenceId
        return Inertia::render('Cart/Payment', [
            'cart' => $cart,
            'preferenceId' => $preference->id,
        ]);
    }
}
