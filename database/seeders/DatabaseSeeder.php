<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ColorSeeder::class,
            SizeSeeder::class,
            CategorySeeder::class,
            GenderSeeder::class,
            //OrderSeeder::class,
            //ProductSeeder::class,
            //CategoryProductSeeder::class,
            //ColorProductSeeder::class,
            //ProductSizeSeeder::class,
            
        ]);
    }
}