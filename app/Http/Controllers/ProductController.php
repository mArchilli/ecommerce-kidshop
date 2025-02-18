<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use App\Models\Color;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['categories', 'sizes', 'colors'])->get();
        return Inertia::render('Admin/Products/ProductsView', ['products' => $products]);
    }

    public function create()
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        return Inertia::render('Admin/Products/CreateProduct', [
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'nullable|integer',
            'categories' => 'array',
            'sizes' => 'array',
            'colors' => 'array',
        ]);

        $product = Product::create($request->only(['name', 'description', 'price', 'stock']));
        $product->categories()->sync($request->categories);
        $product->sizes()->sync($request->sizes);
        $product->colors()->sync($request->colors);

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        return Inertia::render('Admin/Products/EditProduct', [
            'product' => $product->load(['categories', 'sizes', 'colors']),
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'nullable|integer',
            'categories' => 'array',
            'sizes' => 'array',
            'colors' => 'array',
        ]);

        $product->update($request->only(['name', 'description', 'price', 'stock']));
        $product->categories()->sync($request->categories);
        $product->sizes()->sync($request->sizes);
        $product->colors()->sync($request->colors);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}