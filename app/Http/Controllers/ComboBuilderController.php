<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Combo;
use App\Models\ComboCartItem;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComboBuilderController extends Controller
{
    public function index()
    {
        $combos = Combo::where('is_active', true)
            ->with(['items.category'])
            ->get()
            ->map(function ($combo) {
                $combo->category_names = $combo->items
                    ->pluck('category.name')
                    ->unique()
                    ->values();
                return $combo;
            });

        return Inertia::render('Combos/Index', ['combos' => $combos]);
    }

    public function show(Combo $combo)
    {
        abort_if(!$combo->is_active, 404);

        $combo->load(['items.category', 'items.product.sizes', 'sizes']);

        $allowedSizeIds = $combo->sizes->pluck('id')->toArray();

        $categoriesWithProducts = $combo->items
            ->groupBy('category_id')
            ->map(function ($items) {
                $category = $items->first()->category;
                $products = $items->map(function ($item) {
                    $product = $item->product;
                    $product->sizes_with_stock = $product->sizes->map(fn($s) => [
                        'id'    => $s->id,
                        'name'  => $s->name,
                        'stock' => $s->pivot->stock,
                    ])->values();
                    return $product;
                })->values();

                return ['category' => $category, 'products' => $products];
            })
            ->values();

        $availableSizes = $combo->items
            ->flatMap(fn($item) => $item->product->sizes->filter(fn($s) => $s->pivot->stock > 0))
            ->unique('id')
            ->filter(fn($s) => in_array($s->id, $allowedSizeIds))
            ->map(fn($s) => ['id' => $s->id, 'name' => $s->name])
            ->values();

        return Inertia::render('Combos/Builder', [
            'combo'          => $combo,
            'categories'     => $categoriesWithProducts,
            'availableSizes' => $availableSizes,
        ]);
    }

    public function addToCart(Request $request, Combo $combo)
    {
        abort_if(!$combo->is_active, 404);

        $validated = $request->validate([
            'size_id'                     => 'required|exists:sizes,id',
            'selections'                  => 'required|array',
            'selections.*.category_id'    => 'required|exists:categories,id',
            'selections.*.product_id'     => 'required|exists:products,id',
        ]);

        $size = Size::findOrFail($validated['size_id']);

        $comboItems = [];
        foreach ($validated['selections'] as $selection) {
            $product  = Product::with('sizes')->findOrFail($selection['product_id']);
            $sizeData = $product->sizes->firstWhere('id', $validated['size_id']);

            if (!$sizeData || $sizeData->pivot->stock <= 0) {
                return back()->withErrors([
                    'stock' => "Sin stock para \"{$product->name}\" en talle {$size->name}.",
                ]);
            }

            $category = Category::findOrFail($selection['category_id']);

            $comboItems[] = [
                'category_id'   => (int) $selection['category_id'],
                'category_name' => $category->name,
                'product_id'    => (int) $selection['product_id'],
                'product_name'  => $product->name,
                'product_image' => $product->images[0] ?? null,
            ];
        }

        $user = Auth::user();
        $cart = $user->cart ?? Cart::create(['user_id' => $user->id]);

        ComboCartItem::create([
            'cart_id'    => $cart->id,
            'combo_id'   => $combo->id,
            'size'       => $size->name,
            'price'      => $combo->price,
            'quantity'   => 1,
            'combo_data' => [
                'combo_name' => $combo->name,
                'size'       => $size->name,
                'items'      => $comboItems,
            ],
        ]);

        return redirect()->route('cart.index')->with('success', '¡Combo agregado al carrito!');
    }

    public function removeFromCart(ComboCartItem $comboCartItem)
    {
        $user = Auth::user();
        if (!$comboCartItem->cart || $comboCartItem->cart->user_id !== $user->id) {
            abort(403);
        }
        $comboCartItem->delete();
        return back()->with('success', 'Combo eliminado del carrito.');
    }
}
