<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_product')->truncate();
        $products = Product::all();
        $categories = Category::all();

        foreach ($products as $product) {
            // Obtener un conjunto aleatorio de categorías sin duplicados
            $categoriesToAttach = $categories->random(rand(1, 3))->pluck('id')->toArray();

            // Adjuntar las categorías al producto
            $product->categories()->syncWithoutDetaching($categoriesToAttach);
        }
    }
}