<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::all();
        return Inertia::render('Admin/Colors/ColorsView', ['colors' => $colors]);
    }

    public function create()
    {
        return Inertia::render('Admin/Colors/CreateColor');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Color::create($request->only('name'));

        return redirect()->route('colors.index');
    }

    public function edit(Color $color)
    {
        return Inertia::render('Admin/Colors/EditColor', ['color' => $color]);
    }

    public function update(Request $request, Color $color)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $color->update($request->only('name'));

        return redirect()->route('colors.index');
    }

    public function delete(Color $color)
    {
        return Inertia::render('Admin/Colors/DeleteColor', ['color' => $color]);
    }

    public function destroy(Color $color)
    {
        $color->delete();
        return redirect()->route('colors.index');
    }
}