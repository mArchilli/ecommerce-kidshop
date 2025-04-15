<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if (Auth::check()) {
            $userRole = Auth::user()->role;

            // Permitir acceso si el rol coincide
            if ($userRole === $role) {
                return $next($request);
            }
        }

        // Redirigir con un mensaje flash si no tiene permisos
        return redirect('/')->with('flash', [
            'type' => 'error',
            'message' => 'No tienes permisos para acceder a esta página.'
        ]);
    }
}