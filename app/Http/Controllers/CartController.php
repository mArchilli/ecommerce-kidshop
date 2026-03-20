<?php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class CartController extends Controller
{
    private function normalizeSizeName(?string $value): string
    {
        return Str::of($value ?? '')
            ->lower()
            ->ascii()
            ->replaceMatches('/\s+/', ' ')
            ->trim()
            ->value();
    }

    private function findSelectedSize($sizes, ?string $sizeName = null, ?int $sizeId = null)
    {
        $sizes = $sizes instanceof Collection ? $sizes : collect($sizes);

        if ($sizeId) {
            $byId = $sizes->firstWhere('id', $sizeId);
            if ($byId) {
                return $byId;
            }
        }

        if ($sizeName !== null) {
            $byExactName = $sizes->firstWhere('name', $sizeName);
            if ($byExactName) {
                return $byExactName;
            }

            $normalizedTarget = $this->normalizeSizeName($sizeName);
            return $sizes->first(function ($size) use ($normalizedTarget) {
                return $this->normalizeSizeName($size->name) === $normalizedTarget;
            });
        }

        return null;
    }

    public function index()
    {
        $user = Auth::user();

        // Si el usuario no está autenticado, se aborta o se redirige.
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        // Cargar carrito con oferta activa y talles (con stock) de cada producto
        $cart = \App\Models\Cart::with(['items.product.activeOffer', 'items.product.sizes'])
            ->where('user_id', $user->id)
            ->first();

        if ($cart && $cart->items) {
            $cart->items->transform(function ($item) {
                $selectedSize = $item->product && $item->product->sizes
                    ? $this->findSelectedSize($item->product->sizes, $item->size)
                    : null;

                $currentStock = $selectedSize?->pivot?->stock ?? 0;
                $item->current_stock = $currentStock;
                $item->has_stock = $currentStock >= $item->quantity && $currentStock > 0;

                return $item;
            });
        }

        return inertia('Cart/Index', ['cart' => $cart]);
    }

    public function add(Request $request, Product $product)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
            'size_id' => 'nullable|integer|exists:sizes,id',
            'size' => 'nullable|string',
        ]);

        if (!$request->filled('size_id') && !$request->filled('size')) {
            return back()->withErrors(['size' => 'Debes seleccionar un talle.']);
        }

        $cart = $user->cart ?? Cart::create(['user_id' => $user->id]);

        // Recargar el producto con la oferta activa y los talles (para verificar stock)
        $product = Product::with(['activeOffer', 'sizes'])->find($product->id);

        // Verificar stock del talle seleccionado (prioridad por ID para evitar falsos negativos)
        $size = $this->findSelectedSize(
            $product->sizes,
            $request->input('size'),
            $request->filled('size_id') ? (int) $request->size_id : null
        );

        if (!$size || $size->pivot->stock <= 0) {
            return back()->withErrors(['stock' => 'Sin stock disponible para el talle seleccionado.']);
        }

        $selectedSizeName = $size->name;

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

        $cartItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('size', $selectedSizeName)
            ->first();

        $newQuantity = $cartItem ? $cartItem->quantity + $request->quantity : $request->quantity;

        // Verificar que la cantidad total no supere el stock del talle seleccionado
        if ($newQuantity > $size->pivot->stock) {
            return back()->withErrors(['stock' => 'Stock insuficiente. Solo quedan ' . $size->pivot->stock . ' unidades disponibles para el talle seleccionado.']);
        }

        if ($cartItem) {
            $cartItem->quantity = $newQuantity;
            // Actualizar el precio por si cambió la oferta
            $cartItem->price = $currentPrice;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'size' => $selectedSizeName,
                'price' => $currentPrice,
            ]);
        }

        return back()->with('success', '¡Producto agregado al carrito!');
    }

    public function remove(CartItem $cartItem)
    {
        $user = Auth::user();
        if (!$user || !$cartItem->cart || $cartItem->cart->user_id !== $user->id) {
            abort(403, 'No autorizado para eliminar este item del carrito.');
        }

        $cartItem->delete();
        return back()->with('success', 'Producto eliminado del carrito.');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $user = Auth::user();
        if (!$user || !$cartItem->cart || $cartItem->cart->user_id !== $user->id) {
            abort(403, 'No autorizado para actualizar este item del carrito.');
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::with('sizes')->find($cartItem->product_id);
        $selectedSize = $product && $product->sizes
            ? $this->findSelectedSize($product->sizes, $cartItem->size)
            : null;

        if (!$selectedSize || $validated['quantity'] > $selectedSize->pivot->stock) {
            return back()->withErrors(['stock' => 'Stock insuficiente para actualizar la cantidad de este producto.']);
        }

        $cartItem->update($validated);

        // Retorna el carrito actualizado o redirige
        return back()->with('success', 'Cantidad actualizada');
    }

    public function updateAll(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        $request->validate([
            'quantities' => 'required|array',
            'quantities.*' => 'required|integer|min:1',
        ]);

        $quantities = $request->input('quantities');

        foreach ($quantities as $itemId => $quantity) {
            $cartItem = CartItem::with(['cart', 'product.sizes'])->findOrFail($itemId);

            if (!$cartItem->cart || $cartItem->cart->user_id !== $user->id) {
                abort(403, 'No autorizado para actualizar items de otro carrito.');
            }

            $selectedSize = $cartItem->product && $cartItem->product->sizes
                ? $this->findSelectedSize($cartItem->product->sizes, $cartItem->size)
                : null;
            if (!$selectedSize || $quantity > $selectedSize->pivot->stock) {
                return back()->withErrors(['stock' => 'Stock insuficiente para actualizar uno de los productos del carrito.']);
            }

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