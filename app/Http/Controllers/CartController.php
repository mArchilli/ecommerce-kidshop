<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Si el usuario no está autenticado, se aborta o se redirige.
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        // Usar user_id en lugar de $user->cart() y cargar la oferta activa del producto
        $cart = \App\Models\Cart::with(['items.product.activeOffer'])
            ->where('user_id', $user->id)
            ->first();

        return inertia('Cart/Index', ['cart' => $cart]);
    }

    public function add(Request $request, Product $product)
    {

        $request->validate([
            'quantity' => 'required|integer|min:1',
            'size' => 'required|string',
        ]);

        $cart = Auth::user()->cart ?? Cart::create(['user_id' => Auth::id()]);

        // Recargar el producto con la oferta activa
        $product = Product::with('activeOffer')->find($product->id);
        
        // Determinar el precio actual (con oferta si aplica)
        $currentPrice = $product->activeOffer 
            ? $product->activeOffer->discount_price 
            : $product->price;

        Log::info('Adding product to cart', [
            'product_id' => $product->id,
            'product_price' => $product->price,
            'has_active_offer' => $product->activeOffer ? 'yes' : 'no',
            'offer_price' => $product->activeOffer ? $product->activeOffer->discount_price : 'N/A',
            'calculated_price' => $currentPrice
        ]);

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            // Actualizar el precio por si cambió la oferta
            $cartItem->price = $currentPrice;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'size' => $request->size,
                'price' => $currentPrice,
            ]);
        }

        return back()->with('success', '¡Producto agregado al carrito!');
    }

    public function remove(CartItem $cartItem)
    {
        $cartItem->delete();
        return back()->with('success', 'Producto eliminado del carrito.');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validated);

        // Retorna el carrito actualizado o redirige
        return back()->with('success', 'Cantidad actualizada');
    }

    public function updateAll(Request $request)
    {
        $quantities = $request->input('quantities');

        foreach ($quantities as $itemId => $quantity) {
            // Se supone que CartItem es el modelo de los items del carrito.
            $cartItem = CartItem::findOrFail($itemId);
            $cartItem->update(['quantity' => $quantity]);
        }

        return back()->with('success', 'Carrito actualizado');
    }

    // Vacía el carrito del usuario autenticado
    public function clear()
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        $cart = Cart::where('user_id', $user->id)->first();
        if ($cart) {
            $cart->items()->delete();
        }

        return back()->with('success', 'Carrito vaciado');
    }
}