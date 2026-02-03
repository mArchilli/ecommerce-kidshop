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
        $search = $request->input('search');
        $month = $request->input('month');
        $year = $request->input('year');

        // Query base para órdenes pendientes
        $pendingQuery = Order::with('items.product', 'user')
            ->where('shipping_status', Order::SHIPPING_STATUS_PENDING);

        // Query base para órdenes despachadas
        $dispatchedQuery = Order::with('items.product', 'user')
            ->where('shipping_status', Order::SHIPPING_STATUS_DISPATCHED);

        // Aplicar filtro de búsqueda (nombre de usuario, email, DNI, payment_id)
        if ($search) {
            $pendingQuery->where(function ($q) use ($search) {
                $q->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                })
                ->orWhere('dni', 'like', "%{$search}%")
                ->orWhere('payment_id', 'like', "%{$search}%")
                ->orWhere('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%");
            });

            $dispatchedQuery->where(function ($q) use ($search) {
                $q->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                })
                ->orWhere('dni', 'like', "%{$search}%")
                ->orWhere('payment_id', 'like', "%{$search}%")
                ->orWhere('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        // Aplicar filtro de mes
        if ($month) {
            $pendingQuery->whereMonth('created_at', $month);
            $dispatchedQuery->whereMonth('created_at', $month);
        }

        // Aplicar filtro de año
        if ($year) {
            $pendingQuery->whereYear('created_at', $year);
            $dispatchedQuery->whereYear('created_at', $year);
        }

        $pendingOrders = $pendingQuery->latest()->paginate(10, ['*'], 'pending_page')->appends($request->query());
        $dispatchedOrders = $dispatchedQuery->latest()->paginate(10, ['*'], 'dispatched_page')->appends($request->query());

        return Inertia::render('Admin/Orders/Index', [
            'pendingOrders' => $pendingOrders,
            'dispatchedOrders' => $dispatchedOrders,
            'filters' => [
                'search' => $search,
                'month' => $month,
                'year' => $year,
            ],
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
            'shipping_status' => 'required|string|in:' . Order::SHIPPING_STATUS_PENDING . ',' . Order::SHIPPING_STATUS_DISPATCHED . ',' . Order::SHIPPING_STATUS_DELIVERED,
        ]);

        $order->update([
            'shipping_status' => $validated['shipping_status'],
        ]);

        return back()->with('success', 'El estado del envío se actualizó correctamente.');
    }
}