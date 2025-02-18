<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use App\Models\Color;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Obtener categorías, talles y colores
        $categories = Category::whereIn('name', ['Camisetas', 'Pantalones', 'Chaquetas'])->get();
        $sizes = Size::whereIn('name', ['S', 'M', 'L'])->get();
        $colors = Color::whereIn('name', ['Azul', 'Negro', 'Rojo'])->get();

        // Crear productos y asociarlos con categorías, talles y colores
        $product1 = Product::create([
            'name' => 'Camiseta de Niño',
            'description' => 'Camiseta de algodón para niño, color azul.',
            'price' => 15.99,
            'stock' => 50,
        ]);
        $product1->categories()->attach($categories->where('name', 'Camisetas')->pluck('id'));
        $product1->sizes()->attach($sizes->where('name', 'M')->pluck('id'));
        $product1->colors()->attach($colors->where('name', 'Azul')->pluck('id'));

        $product2 = Product::create([
            'name' => 'Pantalones de Niño',
            'description' => 'Pantalones de mezclilla para niño, color negro.',
            'price' => 25.99,
            'stock' => 30,
        ]);
        $product2->categories()->attach($categories->where('name', 'Pantalones')->pluck('id'));
        $product2->sizes()->attach($sizes->where('name', 'L')->pluck('id'));
        $product2->colors()->attach($colors->where('name', 'Negro')->pluck('id'));

        $product3 = Product::create([
            'name' => 'Chaqueta de Niño',
            'description' => 'Chaqueta de invierno para niño, color rojo.',
            'price' => 45.99,
            'stock' => 20,
        ]);
        $product3->categories()->attach($categories->where('name', 'Chaquetas')->pluck('id'));
        $product3->sizes()->attach($sizes->where('name', 'S')->pluck('id'));
        $product3->colors()->attach($colors->where('name', 'Rojo')->pluck('id'));
    }
}