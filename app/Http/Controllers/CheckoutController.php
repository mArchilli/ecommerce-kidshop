<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Size;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    private function findSizeByName($sizes, string $sizeName)
    {
        $byExact = $sizes->firstWhere('name', $sizeName);
        if ($byExact) return $byExact;

        $normalized = Str::of($sizeName)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value();
        return $sizes->first(fn($s) => Str::of($s->name)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value() === $normalized);
    }

    private function findSizeModel(string $sizeName)
    {
        $byExact = Size::where('name', $sizeName)->first();
        if ($byExact) return $byExact;

        $normalized = Str::of($sizeName)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value();
        return Size::all()->first(fn($s) => Str::of($s->name)->lower()->ascii()->replaceMatches('/\s+/', ' ')->trim()->value() === $normalized);
    }

    public function index(Request $request)
    {
        $cart = \App\Models\Cart::with([
            'items.product',
            'items.product.activeOffer',
            'comboItems.combo',
        ])->where('user_id', $request->user()->id)->first();

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

        $user = $request->user();

        $cart = \App\Models\Cart::with([
            'items.product',
            'items.product.sizes',
            'comboItems.combo',
        ])->where('user_id', $user->id)->first();

        $hasRegularItems = $cart && $cart->items->isNotEmpty();
        $hasComboItems   = $cart && $cart->comboItems->isNotEmpty();

        if (!$cart || (!$hasRegularItems && !$hasComboItems)) {
            return redirect()->route('checkout.index')->with('error', 'Tu carrito está vacío.');
        }

        // Verificar stock de cada ítem regular antes de confirmar
        foreach ($cart->items as $item) {
            $size = $this->findSizeByName($item->product->sizes, $item->size ?? '');
            if (!$size || $size->pivot->stock <= 0) {
                return redirect()->route('cart.index')->with('error',
                    "Sin stock: \"" . $item->product->name . "\" (talle " . $item->size . ") ya no tiene stock. Por favor eliminá ese ítem del carrito."
                );
            }
            if ($item->quantity > $size->pivot->stock) {
                return redirect()->route('cart.index')->with('error',
                    "Stock insuficiente: \"" . $item->product->name . "\" (talle " . $item->size . ") solo tiene " . $size->pivot->stock . " unidades disponibles."
                );
            }
        }

        // Limpiar DNI (solo números)
        $validated['dni'] = preg_replace('/[^0-9]/', '', $validated['dni']);

        $regularTotal = $cart->items->reduce(fn($carry, $item) => $carry + ($item->unit_price * $item->quantity), 0);
        $comboTotal   = $cart->comboItems->reduce(fn($carry, $item) => $carry + ($item->unit_price * $item->quantity), 0);
        $orderTotal   = $regularTotal + $comboTotal;

        $order = DB::transaction(function () use ($user, $cart, $validated, $orderTotal) {
            $order = $user->orders()->create([
                'total'           => $orderTotal,
                'status'          => 'completed',
                'shipping_status' => Order::SHIPPING_STATUS_PENDING,
                'province'        => $validated['province'] ?? null,
                'city'            => $validated['city'] ?? null,
                'postal_code'     => $validated['postal_code'] ?? null,
                'address'         => $validated['address'] ?? null,
                'phone'           => $validated['phone'] ?? null,
                'shipping_method' => $validated['shipping_method'] ?? null,
                'dni'             => $validated['dni'] ?? null,
                'first_name'      => $validated['first_name'] ?? null,
                'last_name'       => $validated['last_name'] ?? null,
                'email'           => $validated['email'] ?? null,
                'observations'    => $validated['observations'] ?? null,
                'courier_company' => $validated['courier_company'] ?? null,
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

            foreach ($cart->comboItems as $comboItem) {
                $order->items()->create([
                    'product_id' => null,
                    'quantity'   => $comboItem->quantity,
                    'price'      => $comboItem->unit_price,
                    'size'       => $comboItem->size,
                    'combo_data' => $comboItem->combo_data,
                ]);

                $sizeModel = $this->findSizeModel($comboItem->size);
                if ($sizeModel) {
                    foreach (($comboItem->combo_data['items'] ?? []) as $selectedProduct) {
                        DB::table('product_size')
                            ->where('product_id', $selectedProduct['product_id'])
                            ->where('size_id', $sizeModel->id)
                            ->where('stock', '>', 0)
                            ->decrement('stock', $comboItem->quantity);
                    }
                }
            }

            $cart->items()->delete();
            $cart->comboItems()->delete();
            $cart->delete();

            return $order;
        });

        $request->session()->forget('shipping_info');

        return redirect()->route('checkout.success', ['order' => $order->id]);
    }

    public function success(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        $order->load(['items.product', 'user']);

        return Inertia::render('Cart/Success', [
            'order'        => $order,
            'user'         => $order->user,
            'autoWhatsApp' => true,
        ]);
    }
}
