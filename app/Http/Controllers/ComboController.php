<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Combo;
use App\Models\ComboItem;
use App\Models\Size;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComboController extends Controller
{
    public function index()
    {
        $combos = Combo::with(['items.category', 'items.product', 'sizes'])->get();

        $combos->each(function ($combo) {
            $combo->categories_summary = $combo->items
                ->groupBy('category_id')
                ->map(fn($items) => [
                    'category' => $items->first()->category,
                    'products' => $items->pluck('product'),
                ])
                ->values();
            $combo->size_names = $combo->sizes->pluck('name')->values();
        });

        return Inertia::render('Admin/Combos/CombosView', [
            'combos' => $combos,
        ]);
    }

    public function create()
    {
        $categories = Category::with(['products' => function ($q) {
            $q->select('products.id', 'products.name', 'products.images', 'products.price');
        }])->get();

        $sizes = Size::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Combos/CreateCombo', [
            'categories' => $categories,
            'sizes'      => $sizes,
        ]);
    }

    private function storeImage($file): string
    {
        $storePath = rtrim(env('COMBO_IMAGES_PATH', 'images'), '/');
        $urlPath   = rtrim(env('COMBO_IMAGES_URL_PATH', 'images'), '/');
        $absPath   = public_path($storePath . '/combos');

        if (!is_dir($absPath)) {
            mkdir($absPath, 0755, true);
        }

        $filename = uniqid() . '_' . $file->getClientOriginalName();
        $file->move($absPath, $filename);

        return $urlPath . '/combos/' . $filename;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                      => 'required|string|max:255',
            'description'               => 'nullable|string',
            'price'                     => 'required|numeric|min:0',
            'is_active'                 => 'boolean',
            'is_featured'               => 'boolean',
            'image'                     => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'size_ids'                  => 'required|array|min:1',
            'size_ids.*'                => 'exists:sizes,id',
            'items'                     => 'required|array|min:1',
            'items.*.category_id'       => 'required|exists:categories,id',
            'items.*.quantity'          => 'required|integer|min:1|max:10',
            'items.*.product_ids'       => 'required|array|min:1',
            'items.*.product_ids.*'     => 'exists:products,id',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $imageUrl = $this->storeImage($request->file('image'));
        }

        $combo = Combo::create([
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price'       => $validated['price'],
            'is_active'   => $validated['is_active'] ?? true,
            'is_featured' => $validated['is_featured'] ?? false,
            'image'       => $imageUrl,
        ]);

        $combo->sizes()->sync($validated['size_ids']);

        foreach ($validated['items'] as $item) {
            foreach ($item['product_ids'] as $productId) {
                ComboItem::create([
                    'combo_id'    => $combo->id,
                    'category_id' => $item['category_id'],
                    'quantity'    => $item['quantity'],
                    'product_id'  => $productId,
                ]);
            }
        }

        return redirect()->route('combos.index')->with('success', 'Combo creado exitosamente');
    }

    public function edit(Combo $combo)
    {
        $combo->load(['items.category', 'items.product', 'sizes']);

        $categories = Category::with(['products' => function ($q) {
            $q->select('products.id', 'products.name', 'products.images', 'products.price');
        }])->get();

        $sizes = Size::orderBy('name')->get(['id', 'name']);

        $itemsByCategory = $combo->items
            ->groupBy('category_id')
            ->map(fn($items) => [
                'category_id' => $items->first()->category_id,
                'quantity'    => $items->first()->quantity,
                'product_ids' => $items->pluck('product_id')->toArray(),
            ])
            ->values();

        return Inertia::render('Admin/Combos/EditCombo', [
            'combo'        => $combo,
            'categories'   => $categories,
            'items'        => $itemsByCategory,
            'sizes'        => $sizes,
            'comboSizeIds' => $combo->sizes->pluck('id')->toArray(),
        ]);
    }

    public function update(Request $request, Combo $combo)
    {
        $validated = $request->validate([
            'name'                      => 'required|string|max:255',
            'description'               => 'nullable|string',
            'price'                     => 'required|numeric|min:0',
            'is_active'                 => 'boolean',
            'is_featured'               => 'boolean',
            'image'                     => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'size_ids'                  => 'required|array|min:1',
            'size_ids.*'                => 'exists:sizes,id',
            'items'                     => 'required|array|min:1',
            'items.*.category_id'       => 'required|exists:categories,id',
            'items.*.quantity'          => 'required|integer|min:1|max:10',
            'items.*.product_ids'       => 'required|array|min:1',
            'items.*.product_ids.*'     => 'exists:products,id',
        ]);

        $imageUrl = $combo->image;
        if ($request->hasFile('image')) {
            $imageUrl = $this->storeImage($request->file('image'));
        }

        $combo->update([
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price'       => $validated['price'],
            'is_active'   => $validated['is_active'] ?? true,
            'is_featured' => $validated['is_featured'] ?? false,
            'image'       => $imageUrl,
        ]);

        $combo->sizes()->sync($validated['size_ids']);

        $combo->items()->delete();

        foreach ($validated['items'] as $item) {
            foreach ($item['product_ids'] as $productId) {
                ComboItem::create([
                    'combo_id'    => $combo->id,
                    'category_id' => $item['category_id'],
                    'quantity'    => $item['quantity'],
                    'product_id'  => $productId,
                ]);
            }
        }

        return redirect()->route('combos.index')->with('success', 'Combo actualizado exitosamente');
    }

    public function delete(Combo $combo)
    {
        $combo->load(['items.category', 'items.product']);

        $categoriesSummary = $combo->items
            ->groupBy('category_id')
            ->map(fn($items) => [
                'category' => $items->first()->category,
                'products' => $items->pluck('product'),
            ])
            ->values();

        return Inertia::render('Admin/Combos/DeleteCombo', [
            'combo'              => $combo,
            'categories_summary' => $categoriesSummary,
        ]);
    }

    public function destroy(Combo $combo)
    {
        $combo->delete();
        return redirect()->route('combos.index')->with('success', 'Combo eliminado exitosamente');
    }

    public function toggleActive(Combo $combo)
    {
        $combo->update(['is_active' => !$combo->is_active]);
        return back()->with('success', 'Estado del combo actualizado');
    }

    public function toggleFeatured(Combo $combo)
    {
        $combo->update(['is_featured' => !$combo->is_featured]);
        return back()->with('success', 'Destacado del combo actualizado');
    }
}
