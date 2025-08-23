<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Si el usuario no está autenticado, se aborta o se redirige.
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        // Usar user_id en lugar de $user->cart()
        $cart = \App\Models\Cart::with('items.product')
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

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'size' => $request->size,
            ]);
        }

        return redirect()->route('cart.index');
    }

    public function remove(CartItem $cartItem)
    {
        $cartItem->delete();
        return redirect()->route('cart.index');
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