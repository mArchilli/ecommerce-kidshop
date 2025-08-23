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
        $cart = \App\Models\Cart::with('items.product')
            ->where('user_id', $request->user()->id)
            ->first();

        return Inertia::render('Cart/Checkout', [
            'cart' => $cart,
        ]);
    }

    public function payment(Request $request)
    {
        // Validar los datos de envío (opcionales) y método requerido
        $validated = $request->validate([
            'province' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'shipping_method' => 'required|string|in:Envio a Domicilio,Retirar en el local',
            'dni' => 'required|string|max:15',
        ]);

        // Obtener el usuario autenticado
        $user = $request->user();

        // Obtener el carrito del usuario
        $cart = \App\Models\Cart::with('items.product')
            ->where('user_id', $user->id)
            ->first();

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
                'success' => "https://latiendadelosniños.com/payment/success",
                'failure' => "https://latiendadelosniños.com/payment/failure",
                'pending' => "https://latiendadelosniños.com/payment/pending",
            ],
            'auto_return' => 'approved',
            'external_reference' => json_encode([
                'user_id' => $user->id,
                'shipping_info' => $validated,
            ]),
        ]);

        // Guardar la información de envío en la sesión
        $request->session()->put('shipping_info', $validated);

        // Retornar la vista con el preferenceId y la información de envío
        return Inertia::render('Cart/Payment', [
            'cart' => $cart,
            'preferenceId' => $preference->id,
            'shippingInfo' => $validated,
        ]);
    }


    public function success(Request $request)
    {
        // Obtener la información de envío de la sesión
        $shippingInfo = $request->session()->get('shipping_info');

        // Aquí puedes guardar la orden en la base de datos
        // ...

        return Inertia::render('Cart/Success', [
            'shippingInfo' => $shippingInfo,
        ]);
    }

    public function failure()
    {
        return Inertia::render('Cart/Failure');
    }

    public function pending()
    {
        return Inertia::render('Cart/Pending');
    }
}
