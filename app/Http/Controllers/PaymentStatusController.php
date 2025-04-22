<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentStatusController extends Controller
{
    public function success(Request $request)
    {
        return Inertia::render('Cart/PaymentSuccess', [
            'message' => '¡Pago realizado con éxito!',
            'payment_id' => $request->get('payment_id'),
        ]);
    }

    public function failure(Request $request)
    {
        return Inertia::render('Cart/PaymentFailure', [
            'message' => 'El pago ha fallado o fue cancelado.',
        ]);
    }

    public function pending(Request $request)
    {
        return Inertia::render('Cart/PaymentPending', [
            'message' => 'Tu pago está pendiente de aprobación.',
        ]);
    }
}
