<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use App\Models\Color;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['categories', 'sizes', 'colors', 'gender'])->get();
        return Inertia::render('Admin/Products/ProductsView', ['products' => $products]);
    }

    public function showProducts(Request $request)
    {
        $query = Product::with(['categories', 'sizes', 'colors', 'gender']);

        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        if ($request->has('color')) {
            $query->whereHas('colors', function ($q) use ($request) {
                $q->where('name', $request->color);
            });
        }

        if ($request->has('size')) {
            $query->whereHas('sizes', function ($q) use ($request) {
                $q->where('name', $request->size);
            });
        }

        if ($request->has('gender')) {
            $query->whereHas('gender', function ($q) use ($request) {
                $q->where('name', $request->gender);
            });
        }        

        $products = $query->get();
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        $genders = Gender::all();
    
        // 🔍 Depurar lo que está enviando Laravel
        // dd([
        //     'products' => $products,
        //     'categories' => $categories,
        //     'colors' => $colors,
        //     'sizes' => $sizes,
        //     'genders' => $genders,
        // ]);
    
        return Inertia::render('Welcome', compact('products', 'categories', 'colors', 'sizes', 'genders'));
    }

    public function show(Product $product)
    {
        $product->load(['categories', 'sizes', 'colors', 'gender']);
        return Inertia::render('Ecommerce/ProductView', [
            'product' => $product,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all();
        return Inertia::render('Admin/Products/CreateProduct', [
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
            'genders' => $genders, 
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'categories' => 'array',
            'sizes' => 'array',
            'sizes.*.id' => 'required|exists:sizes,id',
            'sizes.*.stock' => 'required|integer|min:0',
            'colors' => 'array',
            'gender_id' => 'required|exists:genders,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($request->only(['name', 'description', 'price', 'gender_id']) + ['image' => $imagePath]);
        $product->categories()->sync($request->categories);
        $product->colors()->sync($request->colors);

        $sizes = [];
        foreach ($request->sizes as $size) {
            $sizes[$size['id']] = ['stock' => $size['stock']];
        }
        $product->sizes()->sync($sizes);

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all(); // Cargar géneros
        return Inertia::render('Admin/Products/EditProduct', [
            'product' => $product->load(['categories', 'sizes', 'colors', 'gender']),
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
            'genders' => $genders, // Pasar géneros a la vista
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'categories' => 'array',
            'sizes' => 'array',
            'sizes.*.id' => 'required|exists:sizes,id',
            'sizes.*.stock' => 'required|integer|min:0',
            'colors' => 'array',
            'gender_id' => 'required|exists:genders,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $product->image;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product->update($request->only(['name', 'description', 'price', 'gender_id']) + ['image' => $imagePath]);
        $product->categories()->sync($request->categories);
        $product->colors()->sync($request->colors);

        $sizes = [];
        foreach ($request->sizes as $size) {
            $sizes[$size['id']] = ['stock' => $size['stock']];
        }
        $product->sizes()->sync($sizes);

        return redirect()->route('products.index');
    }
    public function delete(Product $product)
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all();
        return Inertia::render('Admin/Products/DeleteProduct', [
            'product' => $product->load(['categories', 'sizes', 'colors', 'gender']),
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
            'genders' => $genders, 
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->route('products.index');
    }
}