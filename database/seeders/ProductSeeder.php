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
            [
                'name' => 'Remera Básica Manga Larga',
                'description' => 'Remera de manga larga en algodón suave, ideal para media estación.',
                'price' => 4800,
                'images' => ['images/products/remera_manga_larga.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Remeras', 'Casual'],
                'colors' => ['Blanco', 'Negro', 'Gris'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 16],
                    ['name' => '4 - niño/a ', 'stock' => 20],
                    ['name' => '6 - niño/a ', 'stock' => 20],
                    ['name' => '8 - niño/a ', 'stock' => 14],
                ]
            ],
            [
                'name' => 'Buzo Frizado School',
                'description' => 'Buzo frizado con cuello redondo, cómodo para uso diario y colegio.',
                'price' => 7900,
                'images' => ['images/products/buzo_school.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Buzos', 'Casual'],
                'colors' => ['Azul', 'Gris'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 17],
                    ['name' => '6 - niño/a ', 'stock' => 19],
                    ['name' => '8 - niño/a ', 'stock' => 15],
                    ['name' => '10 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Calza Deportiva Kids',
                'description' => 'Calza elástica y respirable para entrenamiento y juego.',
                'price' => 4300,
                'images' => ['images/products/calza_deportiva.jpg'],
                'is_featured' => false,
                'gender' => 'Niñas',
                'categories' => ['Conjuntos', 'Deportiva'],
                'colors' => ['Negro', 'Rosa'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 14],
                    ['name' => '4 - niño/a ', 'stock' => 18],
                    ['name' => '6 - niño/a ', 'stock' => 16],
                    ['name' => '8 - niño/a ', 'stock' => 11],
                ]
            ],
            [
                'name' => 'Campera Rompeviento Flash',
                'description' => 'Campera liviana rompeviento con capucha, ideal para días frescos.',
                'price' => 9900,
                'images' => ['images/products/campera_rompeviento.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Camperas', 'Deportiva'],
                'colors' => ['Rojo', 'Negro', 'Azul'],
                'sizes' => [
                    ['name' => '6 - niño/a ', 'stock' => 13],
                    ['name' => '8 - niño/a ', 'stock' => 16],
                    ['name' => '10 - niño/a ', 'stock' => 14],
                    ['name' => '12 - niño/a ', 'stock' => 10],
                ]
            ],
            [
                'name' => 'Vestido Tul Fiesta',
                'description' => 'Vestido de fiesta con capas de tul y cintura con lazo.',
                'price' => 11200,
                'images' => ['images/products/vestido_tul_fiesta.jpg'],
                'is_featured' => false,
                'gender' => 'Niñas',
                'categories' => ['Vestidos', 'Formal'],
                'colors' => ['Rosa', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 9],
                    ['name' => '4 - niño/a ', 'stock' => 12],
                    ['name' => '6 - niño/a ', 'stock' => 10],
                ]
            ],
            [
                'name' => 'Pijama Algodón Nubes',
                'description' => 'Pijama de dos piezas de algodón peinado, suave para dormir.',
                'price' => 6100,
                'images' => ['images/products/pijama_nubes.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Pijamas', 'Casual'],
                'colors' => ['Celeste', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 20],
                    ['name' => '4 - niño/a ', 'stock' => 22],
                    ['name' => '6 - niño/a ', 'stock' => 18],
                    ['name' => '8 - niño/a ', 'stock' => 14],
                ]
            ],
            [
                'name' => 'Short Deportivo Active',
                'description' => 'Short liviano con cintura elástica y secado rápido.',
                'price' => 3900,
                'images' => ['images/products/short_active.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Shorts', 'Deportiva'],
                'colors' => ['Negro', 'Azul'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 24],
                    ['name' => '6 - niño/a ', 'stock' => 26],
                    ['name' => '8 - niño/a ', 'stock' => 21],
                    ['name' => '10 - niño/a ', 'stock' => 15],
                ]
            ],
            [
                'name' => 'Falda Plisada Colegio',
                'description' => 'Falda plisada clásica con cintura cómoda y buen calce.',
                'price' => 5700,
                'images' => ['images/products/falda_plisada.jpg'],
                'is_featured' => false,
                'gender' => 'Niñas',
                'categories' => ['Faldas', 'Casual'],
                'colors' => ['Azul', 'Negro'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 14],
                    ['name' => '6 - niño/a ', 'stock' => 15],
                    ['name' => '8 - niño/a ', 'stock' => 13],
                ]
            ],
            [
                'name' => 'Jogger Plush Invierno',
                'description' => 'Jogger de invierno con interior plush para mayor abrigo.',
                'price' => 6400,
                'images' => ['images/products/jogger_plush.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Joggers', 'Casual'],
                'colors' => ['Gris', 'Negro'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 18],
                    ['name' => '6 - niño/a ', 'stock' => 20],
                    ['name' => '8 - niño/a ', 'stock' => 16],
                    ['name' => '10 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Conjunto Buzo y Jogger Basic',
                'description' => 'Conjunto combinado de buzo y jogger, práctico para todos los días.',
                'price' => 12400,
                'images' => ['images/products/conjunto_basic.jpg'],
                'is_featured' => false,
                'gender' => 'Niños',
                'categories' => ['Conjuntos', 'Casual'],
                'colors' => ['Azul', 'Gris'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 12],
                    ['name' => '6 - niño/a ', 'stock' => 15],
                    ['name' => '8 - niño/a ', 'stock' => 13],
                    ['name' => '10 - niño/a ', 'stock' => 10],
                ]
            ],
            [
                'name' => 'Enterito Plush Estrellas',
                'description' => 'Enterito entero de plush con cierre frontal y estampa de estrellas.',
                'price' => 9100,
                'images' => ['images/products/enterito_estrellas.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Enteritos', 'Pijamas'],
                'colors' => ['Celeste', 'Rosa', 'Gris'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 13],
                    ['name' => '4 - niño/a ', 'stock' => 15],
                    ['name' => '6 - niño/a ', 'stock' => 12],
                ]
            ],
            [
                'name' => 'Remera Estampada Espacio',
                'description' => 'Remera con diseño espacial y algodón peinado de alta calidad.',
                'price' => 4700,
                'images' => ['images/products/remera_espacio.jpg'],
                'is_featured' => false,
                'gender' => 'Niños',
                'categories' => ['Remeras', 'Casual'],
                'colors' => ['Azul', 'Negro'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 17],
                    ['name' => '4 - niño/a ', 'stock' => 21],
                    ['name' => '6 - niño/a ', 'stock' => 19],
                    ['name' => '8 - niño/a ', 'stock' => 13],
                ]
            ],
            [
                'name' => 'Musculosa Básica Lisa',
                'description' => 'Musculosa lisa de verano, liviana y fresca para uso diario.',
                'price' => 3200,
                'images' => ['images/products/musculosa_lisa.jpg'],
                'is_featured' => false,
                'gender' => 'Unisex',
                'categories' => ['Remeras', 'Deportiva'],
                'colors' => ['Blanco', 'Negro', 'Rojo'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 28],
                    ['name' => '4 - niño/a ', 'stock' => 32],
                    ['name' => '6 - niño/a ', 'stock' => 27],
                    ['name' => '8 - niño/a ', 'stock' => 19],
                ]
            ],
            [
                'name' => 'Campera Corderito Soft',
                'description' => 'Campera térmica con interior de corderito y cierre completo.',
                'price' => 13500,
                'images' => ['images/products/campera_corderito.jpg'],
                'is_featured' => false,
                'gender' => 'Niñas',
                'categories' => ['Camperas', 'Casual'],
                'colors' => ['Beige', 'Rosa'],
                'sizes' => [
                    ['name' => '4 - niño/a ', 'stock' => 10],
                    ['name' => '6 - niño/a ', 'stock' => 12],
                    ['name' => '8 - niño/a ', 'stock' => 11],
                    ['name' => '10 - niño/a ', 'stock' => 8],
                ]
            ],
            [
                'name' => 'Vestido Casual Lunares',
                'description' => 'Vestido casual de algodón con estampa de lunares y corte suelto.',
                'price' => 7200,
                'images' => ['images/products/vestido_lunares.jpg'],
                'is_featured' => false,
                'gender' => 'Niñas',
                'categories' => ['Vestidos', 'Casual'],
                'colors' => ['Rojo', 'Azul', 'Blanco'],
                'sizes' => [
                    ['name' => '2 - bebe/a ', 'stock' => 11],
                    ['name' => '4 - niño/a ', 'stock' => 15],
                    ['name' => '6 - niño/a ', 'stock' => 13],
                    ['name' => '8 - niño/a ', 'stock' => 9],
                ]
            ],
        ];

        // Crear los productos
        foreach ($featuredProducts as $productData) {
            // Buscar el género
            $gender = $genders->firstWhere('name', $productData['gender']);

            if (!$gender) {
                $gender = Gender::firstOrCreate(['name' => $productData['gender']]);
                $genders = Gender::all();
            }

            // Crear el producto
            $product = Product::create([
                'name' => $productData['name'],
                'description' => $productData['description'],
                'price' => $productData['price'],
                'images' => $productData['images'],
                'is_featured' => $productData['is_featured'],
            ]);

            // Asociar género
            $product->genders()->attach($gender->id);

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