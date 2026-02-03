<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = [
            'Rojo',
            'Azul',
            'Verde',
            'Amarillo',
            'Negro',
            'Blanco',
            'Rosa',
            'Fucsia',
            'Violeta',
            'Púrpura',
            'Lila',
            'Naranja',
            'Marrón',
            'Beige',
            'Gris',
            'Celeste',
            'Turquesa',
            'Aqua',
            'Verde Lima',
            'Verde Oscuro',
            'Verde Oliva',
            'Azul Marino',
            'Azul Rey',
            'Azul Claro',
            'Rojo Oscuro',
            'Bordo',
            'Coral',
            'Salmón',
            'Melocotón',
            'Crema',
            'Marfil',
            'Dorado',
            'Plateado',
            'Bronce',
            'Mostaza',
            'Caqui',
            'Lavanda',
            'Magenta',
            'Cyan',
            'Índigo',
            'Menta',
            'Verde Agua',
            'Durazno',
            'Vino',
            'Granate',
            'Chocolate',
            'Caramelo',
            'Arena',
            'Gris Claro',
            'Gris Oscuro',
            'Carbón',
            'Multicolor',
            'Estampado',
        ];

        foreach ($colors as $color) {
            Color::create(['name' => $color]);
        }
    }
}