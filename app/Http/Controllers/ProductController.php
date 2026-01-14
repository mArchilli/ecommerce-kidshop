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

    $products = $query->paginate(20); // 20 productos por página
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
            'is_featured' => 'nullable|boolean',
            // Eliminar validación obligatoria de cada imagen individual
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Validar que al menos una imagen esté presente
        if (
            !$request->hasFile('image_1') &&
            !$request->hasFile('image_2') &&
            !$request->hasFile('image_3')
        ) {
            return redirect()->back()->withErrors(['images' => 'Debe cargar al menos una imagen.'])->withInput();
        }

        $imageFields = ['image_1', 'image_2', 'image_3'];
        $imagePaths = [];
        $imagesBasePath = rtrim(env('PUBLIC_IMAGES_PATH', 'public/images/'), '/');
        $productsPath = $imagesBasePath . '/products';
        try {
            foreach ($imageFields as $field) {
                if ($request->hasFile($field)) {
                    $file = $request->file($field);
                    $filename = uniqid() . '_' . $file->getClientOriginalName();
                    $file->move(public_path($productsPath), $filename);
                    $imagePaths[] = 'images/products/' . $filename;
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['images' => 'Error al guardar las imágenes.']);
        }

        $product = Product::create($request->only(['name', 'description', 'price', 'gender_id', 'is_featured']) + ['images' => $imagePaths]);
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
            'is_featured' => 'nullable|boolean',
            'images' => 'nullable|array|max:4', // Validar que sea un array con un máximo de 4 elementos
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validar que cada elemento del array sea una imagen válida
        ]);

        $imagesBasePath = rtrim(env('PUBLIC_IMAGES_PATH', 'public/images/'), '/');
        $productsPath = $imagesBasePath . '/products';
        $imagePaths = $product->images;
        if ($request->hasFile('images')) {
            // Eliminar las imágenes antiguas
            foreach ($product->images as $image) {
                $imagePath = public_path($image);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
            }

            // Guardar las nuevas imágenes
            $imagePaths = [];
            foreach ($request->file('images') as $file) {
                $filename = uniqid() . '_' . $file->getClientOriginalName();
                $file->move(public_path($productsPath), $filename);
                $imagePaths[] = 'images/products/' . $filename;
            }
        }

        $product->update($request->only(['name', 'description', 'price', 'gender_id', 'is_featured']) + ['images' => $imagePaths]);
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
            $imagePath = public_path($image);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        $product->delete();
        return redirect()->route('products.index');
    }

    public function catalog(Request $request)
    {
        $query = Product::with(['categories', 'sizes', 'colors', 'gender']);

        if ($request->filled('q')) {
            $q = trim($request->q);
            $query->where(function($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', (float)$request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float)$request->max_price);
        }

        if ($request->has('category') && $request->category !== '') {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        if ($request->has('color') && $request->color !== '') {
            $query->whereHas('colors', function ($q) use ($request) {
                $q->where('name', $request->color);
            });
        }

        if ($request->has('size') && $request->size !== '') {
            $query->whereHas('sizes', function ($q) use ($request) {
                $q->where('name', $request->size);
            });
        }

        if ($request->has('gender') && $request->gender !== '') {
            $query->whereHas('gender', function ($q) use ($request) {
                $q->where('name', $request->gender);
            });
        }

        // Ordenamiento
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
            }
        }

    // Paginación (agregamos parámetros de filtros a los links manualmente para versiones sin withQueryString)
    $products = $query->paginate(18);
    $products->appends($request->except('page'));
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        $genders = Gender::all();

        $filters = [
            'q' => $request->q,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'category' => $request->category,
            'color' => $request->color,
            'gender' => $request->gender,
            'size' => $request->size,
            'sort' => $request->sort,
        ];

        return Inertia::render('Ecommerce/ProductList', compact('products', 'categories', 'colors', 'sizes', 'genders', 'filters'));
    }

    public function toggleFeatured(Product $product)
    {
        $product->is_featured = !$product->is_featured;
        $product->save();

        return redirect()->back()->with('success', 'Estado de destacado actualizado correctamente');
    }
}