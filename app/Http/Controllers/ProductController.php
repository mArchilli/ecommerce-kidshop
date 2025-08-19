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

        $products = $query->paginate(9); // 9 productos por página
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        $genders = Gender::all();

        // Pasar los filtros actuales a la vista para mantener el estado
        $filters = [
            'category' => $request->category,
            'color' => $request->color,
            'gender' => $request->gender,
            'size' => $request->size,
        ];

        return Inertia::render('Welcome', compact('products', 'categories', 'colors', 'sizes', 'genders', 'filters'));
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
            'image_1' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_2' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_3' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageFields = ['image_1', 'image_2', 'image_3'];
        $imagePaths = [];
        try {
            foreach ($imageFields as $field) {
                if ($request->hasFile($field)) {
                    $imagePaths[] = $request->file($field)->store('products', 'public');
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['images' => 'Error al guardar las imágenes.']);
        }

        $product = Product::create($request->only(['name', 'description', 'price', 'gender_id']) + ['images' => $imagePaths]);
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
            'images' => 'nullable|array|max:4', // Validar que sea un array con un máximo de 4 elementos
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validar que cada elemento del array sea una imagen válida
        ]);

        $imagePaths = $product->images;
        if ($request->hasFile('images')) {
            // Eliminar las imágenes antiguas
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image);
            }

            // Guardar las nuevas imágenes
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('products', 'public');
            }
        }

        $product->update($request->only(['name', 'description', 'price', 'gender_id']) + ['images' => $imagePaths]);
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
        // Eliminar las imágenes del producto
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image);
        }

        $product->delete();
        return redirect()->route('products.index');
    }

    public function catalog(Request $request)
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

        $products = $query->paginate(9);
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        $genders = Gender::all();

        $filters = [
            'category' => $request->category,
            'color' => $request->color,
            'gender' => $request->gender,
            'size' => $request->size,
        ];

        return Inertia::render('Ecommerce/ProductList', compact('products', 'categories', 'colors', 'sizes', 'genders', 'filters'));
    }
}