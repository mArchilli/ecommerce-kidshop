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
        
        $shippingStatus = $request->get('shipping_status', null);

        $ordersQuery = Order::with('items.product', 'user')->latest();

        if ($shippingStatus) {
            $ordersQuery->where('shipping_status', $shippingStatus);
        }

        $orders = $ordersQuery->get();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => [
                'shipping_status' => $shippingStatus,
            ],
        ]);
    }

    public function show(Order $order)
    {

        return Inertia::render('Admin/Orders/OrdenDetails', [
            'order' => $order->load('user', 'items.product'), 
        ]);
    }

    public function updateShippingStatus(Request $request, Order $order)
    {
    
        
        $validated = $request->validate([
            'shipping_status' => 'required|string|in:pending,dispatched,delivered',
        ]);

        $order->update([
            'shipping_status' => $validated['shipping_status'],
        ]);

        return back()->with('success', 'El estado del envío se actualizó correctamente.');
    }
}