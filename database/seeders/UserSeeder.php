<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'matiarchilli@gmail.com',
            'password' => bcrypt('1234'), 
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'User',
            'email' => 'archillimatias@gmail.com',
            'password' => bcrypt('1234'), 
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
