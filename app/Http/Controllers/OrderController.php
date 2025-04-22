<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        
        $orders = Order::with('items.product', 'user')->latest()->get();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {

        return Inertia::render('Admin/Orders/OrdenDetails', [
            'order' => $order->load('items.product'),
        ]);
    }
}