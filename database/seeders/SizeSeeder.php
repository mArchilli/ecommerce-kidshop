<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Size;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sizes = ['0 - bebe/a ', '1 - bebe/a ', '2 - bebe/a ', '3 - bebe/a ', '4 - bebe/a ', '5 - bebe/a ', '6 - bebe/a', '4 - niño/a ', '6 - niño/a ', '8 - niño/a ', '10 - niño/a ', '12 - niño/a ', '14 - niño/a ', '16 - niño/a ', '18 - niño/a '];

        foreach ($sizes as $size) {
            Size::create(['name' => $size]);
        }
    }
}