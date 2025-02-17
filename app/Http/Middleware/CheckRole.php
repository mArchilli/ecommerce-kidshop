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

            if ($userRole === 'admin' && $role === 'admin') {
                return $next($request);
            } elseif ($userRole === 'user' && $role === 'user') {
                return redirect('/');
            }
        }

        return redirect('/')->with('flash', [
            'type' => 'error',
            'message' => 'Se requieren permisos de administrador para acceder a esta página.'
        ]);
    }
}