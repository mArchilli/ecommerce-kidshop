<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Size;

class ProductSizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        $sizes = Size::all();

        foreach ($products as $product) {
            $product->sizes()->attach(
                $sizes->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
