<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = Auth::user();

        $request->session()->regenerate();

        // Verificar si el usuario ha verificado su correo.
        // Si el middleware 'auth' guardó la URL de verificación como "intended"
        // (porque el usuario hizo clic en el link del email sin estar logueado),
        // redirect()->intended() lo llevará directo allí y la verificación se completará.
        // Si llegó al login directamente (sin pasar por el link), se lo redirige a la
        // pantalla de "verifica tu correo" para que lo haga.
        if (is_null($user->email_verified_at)) {
            return redirect()->intended(route('verification.notice'));
        }

        // Redirigir según el rol del usuario
        if ($user->role === 'admin') {
            return redirect()->intended('/admin/dashboard');
        }

        return redirect()->intended('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
