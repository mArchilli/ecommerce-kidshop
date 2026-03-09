<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectUnverifiedUsers
{
    /**
     * Si el usuario está autenticado pero no verificó su email,
     * lo redirige a la pantalla de verificación.
     * Los visitantes anónimos pasan normalmente.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $user = Auth::user();

        if (
            $user instanceof MustVerifyEmail &&
            ! $user->hasVerifiedEmail()
        ) {
            return redirect()->route('verification.notice');
        }

        return $next($request);
    }
}
