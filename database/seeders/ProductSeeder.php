<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use App\Models\Color;
use App\Models\Gender;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Obtener categorías, talles, colores y géneros
        $categories = Category::all();
        $sizes = Size::all();
        $colors = Color::all();
        $genders = Gender::all();

        // Array de productos destacados
        $featuredProducts = [
            [
                'name' => 'Remera Estampada Dinosaurios',
                'description' => 'Remera 100% algodón con estampado de dinosaurios. Ideal para el día a día, cómoda y divertida.',
                'price' => 4500,
                'images' => ['images/products/remera_dinosaurios.jpg'],
                'is_featured' => true,
                'gender' => 'Niños',
                'categories' => ['Remeras', 'Casual'],
                'colors' => ['Verde', 'Azul'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 15],
                    ['name' => '4 - niño/a ', 'stock' => 20],
                    ['name' => '6 - niño/a ', 'stock' => 18],
                    ['name' => '8 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Vestido Floreado Primavera',
                'description' => 'Hermoso vestido con estampado floral. Perfecto para ocasiones especiales o paseos al aire libre.',
                'price' => 6800,
                'images' => ['images/products/vestido_flores.jpg'],
                'is_featured' => true,
                'gender' => 'Niñas',
                'categories' => ['Vestidos', 'Casual'],
                'colors' => ['Rosa', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 10],
                    ['name' => '4 - niño/a ', 'stock' => 15],
                    ['name' => '6 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Jogger Deportivo Unicolor',
                'description' => 'Pantalón jogger súper cómodo, ideal para actividades deportivas o uso casual.',
                'price' => 5200,
                'images' => ['images/products/jogger_deportivo.jpg'],
                'is_featured' => true,
                'gender' => 'Unisex',
                'categories' => ['Joggers', 'Deportiva'],
                'colors' => ['Negro', 'Gris', 'Azul'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 25],
                    ['name' => '6 - niño/a ', 'stock' => 30],
                    ['name' => '8 - niño/a ', 'stock' => 20],
                    ['name' => '10 - niño/a ', 'stock' => 15],
                ]
            ],
            [
                'name' => 'Buzo con Capucha Superhéroes',
                'description' => 'Buzo abrigado con capucha y estampado de superhéroes. Interior de algodón suave.',
                'price' => 7500,
                'images' => ['images/products/buzo_superheroes.jpg'],
                'is_featured' => true,
                'gender' => 'Niños',
                'categories' => ['Buzos', 'Casual'],
                'colors' => ['Rojo', 'Azul', 'Negro'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 18],
                    ['name' => '6 - niño/a ', 'stock' => 22],
                    ['name' => '8 - niño/a ', 'stock' => 16],
                ]
            ],
            [
                'name' => 'Conjunto Deportivo Unicornio',
                'description' => 'Set de remera y calza con diseño de unicornios. Tela elástica y respirable.',
                'price' => 8900,
                'images' => ['images/products/conjunto_unicornio.jpg'],
                'is_featured' => true,
                'gender' => 'Niñas',
                'categories' => ['Conjuntos', 'Deportiva'],
                'colors' => ['Rosa', 'Violeta', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 12],
                    ['name' => '4 - niño/a ', 'stock' => 18],
                    ['name' => '6 - niño/a ', 'stock' => 15],
                ]
            ],
            [
                'name' => 'Campera Jean Clásica',
                'description' => 'Campera de jean resistente y atemporal. Con bolsillos frontales y botones metálicos.',
                'price' => 9500,
                'images' => ['images/products/campera_jean.jpg'],
                'is_featured' => true,
                'gender' => 'Unisex',
                'categories' => ['Camperas', 'Casual'],
                'colors' => ['Azul'],
                'sizes' => [
                    ['name' => '6 - niño/a ', 'stock' => 20],
                    ['name' => '8 - niño/a ', 'stock' => 25],
                    ['name' => '10 - niño/a ', 'stock' => 18],
                    ['name' => '12 - niño/a ', 'stock' => 14],
                ]
            ],
            [
                'name' => 'Short Cargo Veraniego',
                'description' => 'Short cargo con múltiples bolsillos. Tela liviana y fresca para el verano.',
                'price' => 4200,
                'images' => ['images/products/short_cargo.jpg'],
                'is_featured' => true,
                'gender' => 'Niños',
                'categories' => ['Shorts', 'Casual'],
                'colors' => ['Beige', 'Verde', 'Negro'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 22],
                    ['name' => '6 - niño/a ', 'stock' => 28],
                    ['name' => '8 - niño/a ', 'stock' => 20],
                ]
            ],
            [
                'name' => 'Pollera Tul Princesa',
                'description' => 'Pollera de tul con detalles brillantes. Perfecta para fiestas y eventos especiales.',
                'price' => 6200,
                'images' => ['images/products/pollera_tul.jpg'],
                'is_featured' => true,
                'gender' => 'Niñas',
                'categories' => ['Faldas', 'Formal'],
                'colors' => ['Rosa', 'Violeta', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 10],
                    ['name' => '4 - niño/a ', 'stock' => 14],
                    ['name' => '6 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Musculosa Deportiva Rayas',
                'description' => 'Musculosa liviana con diseño a rayas. Perfecta para días calurosos.',
                'price' => 3500,
                'images' => ['images/products/musculosa_rayas.jpg'],
                'is_featured' => true,
                'gender' => 'Unisex',
                'categories' => ['Remeras', 'Deportiva'],
                'colors' => ['Blanco', 'Azul', 'Rojo'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 30],
                    ['name' => '4 - niño/a ', 'stock' => 35],
                    ['name' => '6 - niño/a ', 'stock' => 25],
                    ['name' => '8 - niño/a ', 'stock' => 20],
                ]
            ],
            [
                'name' => 'Enterito Polar Animales',
                'description' => 'Enterito de polar súper abrigado con diseño de animales. Ideal para dormir o estar en casa.',
                'price' => 8500,
                'images' => ['images/products/enterito_polar.jpg'],
                'is_featured' => true,
                'gender' => 'Unisex',
                'categories' => ['Pijamas', 'Enteritos'],
                'colors' => ['Gris', 'Azul', 'Rosa'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 15],
                    ['name' => '4 - niño/a ', 'stock' => 20],
                    ['name' => '6 - niño/a ', 'stock' => 18],
                    ['name' => '8 - niño/a ', 'stock' => 12],
                ]
            ],
        ];

        // Crear los productos
        foreach ($featuredProducts as $productData) {
            // Buscar el género
            $gender = $genders->firstWhere('name', $productData['gender']);
            
            if (!$gender) continue;

            // Crear el producto
            $product = Product::create([
                'name' => $productData['name'],
                'description' => $productData['description'],
                'price' => $productData['price'],
                'images' => $productData['images'],
                'is_featured' => $productData['is_featured'],
                'gender_id' => $gender->id,
            ]);

            // Asociar categorías
            $categoryIds = $categories->whereIn('name', $productData['categories'])->pluck('id')->toArray();
            if (!empty($categoryIds)) {
                $product->categories()->attach($categoryIds);
            }

            // Asociar colores
            $colorIds = $colors->whereIn('name', $productData['colors'])->pluck('id')->toArray();
            if (!empty($colorIds)) {
                $product->colors()->attach($colorIds);
            }

            // Asociar talles con stock
            foreach ($productData['sizes'] as $sizeData) {
                $size = $sizes->firstWhere('name', $sizeData['name']);
                if ($size) {
                    $product->sizes()->attach($size->id, ['stock' => $sizeData['stock']]);
                }
            }
        }
    }
}