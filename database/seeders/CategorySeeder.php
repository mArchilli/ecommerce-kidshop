<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Camisetas',
            'Remeras',
            'Pantalones',
            'Jeans',
            'Chaquetas',
            'Camperas',
            'Abrigos',
            'Vestidos',
            'Faldas',
            'Shorts',
            'Bermudas',
            'Buzos',
            'Sudaderas',
            'Sweaters',
            'Joggers',
            'Conjuntos',
            'Pijamas',
            'Ropa Interior',
            'Medias',
            'Calcetines',
            'Bodies',
            'Enteritos',
            'Mallas',
            'Trajes de Baño',
            'Gorros',
            'Gorras',
            'Bufandas',
            'Guantes',
            'Accesorios',
            'Zapatillas',
            'Zapatos',
            'Sandalias',
            'Botas',
            'Deportiva',
            'Formal',
            'Casual',
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}