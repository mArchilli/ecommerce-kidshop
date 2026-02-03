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

        // Obtener la información de envío guardada en sesión (si existe)
        $shippingInfo = $request->session()->get('shipping_info', null);

        return Inertia::render('Cart/Checkout', [
            'cart' => $cart,
            'savedShippingInfo' => $shippingInfo,
        ]);
    }

    public function payment(Request $request)
    {
        // Validar los datos de envío (opcionales) y método requerido
        $validated = $request->validate([
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'shipping_method' => 'required|string|in:Envio a Domicilio,Envio a Sucursal',
            'dni' => 'required|string|max:15',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'observations' => 'nullable|string|max:1000',
            'courier_company' => 'nullable|string|in:Correo Argentino,Andreani,Via Cargo,Consultar con la tienda',
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

        // Mapea los items para MercadoPago - validar que cumplan los requisitos
        $items = $cart->items->map(function ($item) {
            $unitPrice = round((float) $item->unit_price, 2);
            
            // Validar que el precio sea mayor a 0
            if ($unitPrice <= 0) {
                throw new \Exception("El precio del producto '{$item->product->name}' debe ser mayor a 0");
            }
            
            return [
                'title' => substr($item->product->name, 0, 256), // Máximo 256 caracteres
                'quantity' => (int) $item->quantity,
                'unit_price' => $unitPrice,
                'currency_id' => 'ARS',
            ];
        })->toArray();

        // Validar que haya items
        if (empty($items)) {
            return redirect()->route('checkout.index')->with('error', 'No hay productos para procesar.');
        }

        // Guardar la información de envío en la sesión ANTES de crear la preferencia
        $request->session()->put('shipping_info', $validated);
        $request->session()->put('payment_in_progress', true);

        // Limpiar y validar DNI (solo números)
        $dniLimpio = preg_replace('/[^0-9]/', '', $validated['dni']);

        // Preparar datos del payer
        $payerData = [
            'name' => trim($validated['first_name']),
            'surname' => trim($validated['last_name']),
            'email' => trim($validated['email']),
            'identification' => [
                'type' => 'DNI',
                'number' => $dniLimpio,
            ],
        ];

        // Solo agregar teléfono si existe y no está vacío
        if (!empty($validated['phone'])) {
            $payerData['phone'] = [
                'area_code' => '',
                'number' => preg_replace('/[^0-9]/', '', $validated['phone']),
            ];
        }

        try {
            // Crear la preferencia con external_reference simplificado
            $preference = $client->create([
                'items' => $items,
                'back_urls' => [
                    'success' => config('app.url') . '/payment/success',
                    'failure' => config('app.url') . '/payment/failure',
                    'pending' => config('app.url') . '/payment/pending',
                ],
                'auto_return' => 'approved',
                'external_reference' => $user->id . '_' . time(),
                'payer' => $payerData,
                'statement_descriptor' => 'TIENDA NIÑOS',
            ]);
        } catch (\Exception $e) {
            \Log::error('Error al crear preferencia de MercadoPago', [
                'error' => $e->getMessage(),
                'items' => $items,
                'payer' => $payerData,
            ]);
            
            return redirect()->route('checkout.index')
                ->with('error', 'Error al procesar el pago. Por favor, intenta nuevamente.');
        }

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
        
        // Obtener el usuario autenticado
        $user = $request->user();
        
        // Obtener el carrito del usuario con los items y productos
        $cart = \App\Models\Cart::with('items.product')
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Cart/Success', [
            'shippingInfo' => $shippingInfo,
            'user' => $user,
            'cart' => $cart,
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
