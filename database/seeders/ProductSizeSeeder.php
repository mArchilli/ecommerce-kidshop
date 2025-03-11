<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Support\Facades\DB;

class ProductSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('product_size')->truncate();
        $products = Product::all();
        $sizes = Size::all();

        foreach ($products as $product) {
            $sizesToAttach = $sizes->random(rand(1, 3))->pluck('id')->toArray();
            $sizesWithStock = [];

            foreach ($sizesToAttach as $sizeId) {
                $sizesWithStock[$sizeId] = ['stock' => rand(1, 100)]; // Asignar un stock aleatorio entre 1 y 100
            }

            $product->sizes()->attach($sizesWithStock);
        }
    }
}