<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter', 'all'); // all | verified | unverified

        $query = User::query()->where('role', '!=', 'admin');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($filter === 'verified') {
            $query->whereNotNull('email_verified_at');
        } elseif ($filter === 'unverified') {
            $query->whereNull('email_verified_at');
        }

        $users = $query->orderBy('created_at', 'desc')
            ->withCount('orders')
            ->paginate(15)
            ->appends($request->query());

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
            'stats' => [
                'total'      => User::where('role', '!=', 'admin')->count(),
                'verified'   => User::where('role', '!=', 'admin')->whereNotNull('email_verified_at')->count(),
                'unverified' => User::where('role', '!=', 'admin')->whereNull('email_verified_at')->count(),
            ],
        ]);
    }

    public function verify(User $user)
    {
        if ($user->hasVerifiedEmail()) {
            return back()->with('error', 'Esta cuenta ya está verificada.');
        }

        $user->markEmailAsVerified();

        Log::info('Email verificado manualmente por admin', [
            'user_id'  => $user->id,
            'email'    => $user->email,
            'admin_id' => Auth::id(),
        ]);

        return back()->with('success', "La cuenta de {$user->name} fue verificada exitosamente.");
    }

    public function show(User $user)
    {
        $user->loadCount('orders');
        $user->load([
            'orders' => function ($q) {
                $q->with('items.product')
                  ->latest()
                  ->take(10);
            },
        ]);

        $totalSpent = $user->orders->sum('total');

        return Inertia::render('Admin/Users/Show', [
            'user'       => $user,
            'totalSpent' => $totalSpent,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        $emailChanged = $validated['email'] !== $user->email;

        $user->fill($validated);

        if ($emailChanged) {
            $user->email_verified_at = null;
        }

        $user->save();

        Log::info('Perfil de usuario actualizado por admin', [
            'user_id'  => $user->id,
            'admin_id' => Auth::id(),
            'changes'  => $user->getChanges(),
        ]);

        return back()->with('success', 'Perfil actualizado correctamente.');
    }

    public function updatePassword(Request $request, User $user)
    {
        $request->validate([
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        Log::info('Contraseña cambiada por admin', [
            'user_id'  => $user->id,
            'admin_id' => Auth::id(),
        ]);

        return back()->with('success', 'Contraseña actualizada correctamente.');
    }
}
