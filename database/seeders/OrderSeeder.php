<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();

        if ($users->count() === 0 || $products->count() === 0) {
            // Puedes usar info() para debug si corres con --verbose
            info('No hay usuarios o productos para crear órdenes.');
            return;
        }

        // Orden pendiente - Retirar en el local
        $user1 = $users->random();
        $order1 = Order::create([
            'user_id' => $user1->id,
            'total' => 0,
            'status' => 'pending',
            'province' => null,
            'city' => null,
            'postal_code' => null,
            'address' => null,
            'phone' => '1122334455',
            'shipping_method' => 'Retirar en el local',
            'shipping_status' => Order::SHIPPING_STATUS_PENDING,
        ]);
        $total1 = 0;
        $items1 = $products->count() > 1 ? $products->random(rand(1, 2))->all() : [$products->first()];
        foreach ($items1 as $product) {
            $quantity = rand(1, 2);
            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
            $total1 += $product->price * $quantity;
        }
        $order1->update(['total' => $total1]);

        // Orden pendiente - Envio a Domicilio
        $user2 = $users->random();
        $order2 = Order::create([
            'user_id' => $user2->id,
            'total' => 0,
            'status' => 'pending',
            'province' => 'Buenos Aires',
            'city' => 'Mariano Acosta',
            'postal_code' => '1722',
            'address' => 'Calle Falsa 123',
            'phone' => '1199887766',
            'shipping_method' => 'Envio a Domicilio',
            'shipping_status' => Order::SHIPPING_STATUS_PENDING,
        ]);
        $total2 = 0;
        $items2 = $products->count() > 1 ? $products->random(rand(1, 2))->all() : [$products->first()];
        foreach ($items2 as $product) {
            $quantity = rand(1, 2);
            OrderItem::create([
                'order_id' => $order2->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
            $total2 += $product->price * $quantity;
        }
        $order2->update(['total' => $total2]);
    }
}
