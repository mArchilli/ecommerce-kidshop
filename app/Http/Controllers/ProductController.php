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
        $products = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])->get();
        return Inertia::render('Admin/Products/ProductsView', ['products' => $products]);
    }

    public function showProducts(Request $request)
    {
        $query = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            });

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
            $query->whereHas('genders', function ($q) use ($request) {
                $q->where('name', $request->gender);
            });
        }        

    $products = $query->paginate(20); // 20 productos por página
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();
        $genders = Gender::all();

        // Productos con ofertas activas (query independiente, no paginada)
        $offersProducts = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->whereHas('activeOffer')
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            })
            ->get();

        // Productos destacados (query independiente, no paginada)
        $featuredProducts = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->where('is_featured', true)
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            })
            ->get();

        // Pasar los filtros actuales a la vista para mantener el estado
        $filters = [
            'category' => $request->category,
            'color' => $request->color,
            'gender' => $request->gender,
            'size' => $request->size,
        ];

        return Inertia::render('Welcome', compact('products', 'categories', 'colors', 'sizes', 'genders', 'filters', 'offersProducts', 'featuredProducts'));
    }

    public function show(Product $product)
    {
        $product->load(['categories', 'sizes', 'colors', 'genders', 'activeOffer']);
        
        // Productos relacionados: misma categoría o género, excluyendo el actual y sin stock
        $genderIds = $product->genders->pluck('id');
        $relatedProducts = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->where('id', '!=', $product->id)
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            })
            ->where(function($query) use ($product, $genderIds) {
                // Productos del mismo género
                if ($genderIds->isNotEmpty()) {
                    $query->whereHas('genders', function($q) use ($genderIds) {
                        $q->whereIn('genders.id', $genderIds);
                    });
                }
                
                // O productos con categorías similares
                if ($product->categories->isNotEmpty()) {
                    $categoryIds = $product->categories->pluck('id');
                    $query->orWhereHas('categories', function($q) use ($categoryIds) {
                        $q->whereIn('categories.id', $categoryIds);
                    });
                }
            })
            ->take(4)
            ->get();
        
        // Productos en oferta (excluyendo el actual y sin stock)
        $offersProducts = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->where('id', '!=', $product->id)
            ->whereHas('activeOffer')
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            })
            ->take(4)
            ->get();
        
        return Inertia::render('Ecommerce/ProductView', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'offersProducts' => $offersProducts,
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
            'gender_ids' => 'required|array|min:1',
            'gender_ids.*' => 'exists:genders,id',
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
        // Ruta del filesystem para GUARDAR el archivo (en producción apunta fuera de laravel, ej: /../../public_html/images)
        $imagesStorePath = rtrim(env('PUBLIC_IMAGES_PATH', 'images'), '/');
        // Ruta URL para ALMACENAR en la BD (siempre relativa al webroot, ej: images)
        $imagesUrlPath   = rtrim(env('PUBLIC_IMAGES_URL_PATH', 'images'), '/');
        $absolutePath = public_path($imagesStorePath . '/products');

        // Crear el directorio si no existe (crucial en producción)
        if (!is_dir($absolutePath)) {
            mkdir($absolutePath, 0755, true);
        }

        try {
            foreach ($imageFields as $field) {
                if ($request->hasFile($field)) {
                    $file = $request->file($field);
                    $filename = uniqid() . '_' . $file->getClientOriginalName();
                    $file->move($absolutePath, $filename);
                    // Guardar en BD la ruta URL (images/products/filename)
                    $imagePaths[] = $imagesUrlPath . '/products/' . $filename;
                }
            }
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['images' => 'Error al guardar las imágenes: ' . $e->getMessage()]);
        }

        $product = Product::create($request->only(['name', 'description', 'price', 'is_featured']) + ['images' => $imagePaths]);
        $product->categories()->sync($request->categories);
        $product->genders()->sync($request->gender_ids);
        $product->colors()->sync($request->colors);

        $sizes = [];
        foreach ($request->sizes as $size) {
            $sizes[$size['id']] = ['stock' => $size['stock']];
        }
        $product->sizes()->sync($sizes);

        return redirect()->route('products.index')->with('success', 'Prenda creada exitosamente.');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all(); // Cargar géneros
        return Inertia::render('Admin/Products/EditProduct', [
            'product' => $product->load(['categories', 'sizes', 'colors', 'genders']),
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
            'gender_ids' => 'required|array|min:1',
            'gender_ids.*' => 'exists:genders,id',
            'is_featured' => 'nullable|boolean',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagesStorePath = rtrim(env('PUBLIC_IMAGES_PATH', 'images'), '/');
        $imagesUrlPath   = rtrim(env('PUBLIC_IMAGES_URL_PATH', 'images'), '/');
        $absolutePath = public_path($imagesStorePath . '/products');

        // Crear el directorio si no existe (crucial en producción)
        if (!is_dir($absolutePath)) {
            mkdir($absolutePath, 0755, true);
        }

        // Mantener las imágenes actuales como base
        $imagePaths = $product->images ?? [];

        // Procesar cada imagen individualmente
        $imageFields = ['image_1', 'image_2', 'image_3'];
        foreach ($imageFields as $index => $field) {
            if ($request->hasFile($field)) {
                // Eliminar la imagen antigua usando la ruta real del filesystem
                if (isset($imagePaths[$index])) {
                    $oldAbsPath = $absolutePath . '/' . basename($imagePaths[$index]);
                    if (file_exists($oldAbsPath)) {
                        @unlink($oldAbsPath);
                    }
                }

                // Guardar la nueva imagen
                $file = $request->file($field);
                $filename = uniqid() . '_' . $file->getClientOriginalName();
                $file->move($absolutePath, $filename);
                // Guardar en BD la ruta URL (images/products/filename)
                $imagePaths[$index] = $imagesUrlPath . '/products/' . $filename;
            }
        }

        $product->update($request->only(['name', 'description', 'price', 'is_featured']) + ['images' => $imagePaths]);
        $product->categories()->sync($request->categories);
        $product->genders()->sync($request->gender_ids);
        $product->colors()->sync($request->colors);

        $sizes = [];
        foreach ($request->sizes as $size) {
            $sizes[$size['id']] = ['stock' => $size['stock']];
        }
        $product->sizes()->sync($sizes);

        return redirect()->route('products.edit', $product->id)->with('success', 'Prenda actualizada exitosamente.');
    }

    public function delete(Product $product)
    {
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all();
        return Inertia::render('Admin/Products/DeleteProduct', [
            'product' => $product->load(['categories', 'sizes', 'colors', 'genders']),
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
        return redirect()->route('products.index')->with('success', 'Prenda eliminada exitosamente.');
    }

    public function catalog(Request $request)
    {
        $query = Product::with(['categories', 'sizes', 'colors', 'genders', 'activeOffer'])
            ->whereHas('sizes', function ($q) {
                $q->where('product_size.stock', '>', 0);
            });

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

        if ($request->filled('genders')) {
            $genderNames = $request->input('genders', []);
            $query->whereHas('genders', function ($q) use ($genderNames) {
                $q->whereIn('name', $genderNames);
            });
        } elseif ($request->has('gender') && $request->gender !== '') {
            $query->whereHas('genders', function ($q) use ($request) {
                $q->where('name', $request->gender);
            });
        }

        if ($request->filled('has_offer')) {
            $query->whereHas('activeOffer');
        }

        if ($request->filled('is_featured')) {
            $query->where('is_featured', true);
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
            'genders' => $request->input('genders', []),
            'size' => $request->size,
            'sort' => $request->sort,
            'has_offer' => $request->has_offer,
            'is_featured' => $request->is_featured,
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