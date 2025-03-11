<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Color;
use Illuminate\Support\Facades\DB;

class ColorProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('color_product')->truncate();
        $products = Product::all();
        $colors = Color::all();

        foreach ($products as $product) {
            $product->colors()->attach(
                $colors->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
