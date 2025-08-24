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
        // Nueva paginación independiente por estado (10 c/u)
        $pendingOrders = Order::with('items.product', 'user')
            ->where('shipping_status', 'pending')
            ->latest()
            ->paginate(10, ['*'], 'pending_page');

        $dispatchedOrders = Order::with('items.product', 'user')
            ->where('shipping_status', 'dispatched')
            ->latest()
            ->paginate(10, ['*'], 'dispatched_page');

        return Inertia::render('Admin/Orders/Index', [
            'pendingOrders' => $pendingOrders,
            'dispatchedOrders' => $dispatchedOrders,
        ]);
    }

    public function show(Order $order)
    {

        return Inertia::render('Admin/Orders/OrdenDetails', [
            'order' => $order->load('user', 'items.product'),
            'csrf_token' => csrf_token(), // <-- Agregado
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