<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $cart_count = 0;
        
        if ($user) {
            $cart = \App\Models\Cart::where('user_id', $user->id)->first();
            $cart_count = $cart ? $cart->items()->sum('quantity') : 0;
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'cart_count' => $cart_count,
            ],
        ];
    }
}
