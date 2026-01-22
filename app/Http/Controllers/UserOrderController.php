<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserOrderController extends Controller
{
    /**
     * Muestra el historial de compras del usuario autenticado
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $orders = Order::with('items.product')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('User/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Muestra el detalle de una orden específica del usuario
     */
    public function show(Request $request, Order $order)
    {
        $user = $request->user();

        // Verificar que la orden pertenece al usuario autenticado
        if ($order->user_id !== $user->id) {
            abort(403, 'No tienes permiso para ver esta orden.');
        }

        $order->load('items.product');

        return Inertia::render('User/Orders/Show', [
            'order' => $order,
        ]);
    }
}
