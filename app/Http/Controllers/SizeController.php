<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::all();
        return Inertia::render('Admin/Sizes/SizesView', ['sizes' => $sizes]);
    }

    public function create()
    {
        return Inertia::render('Admin/Sizes/CreateSize');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Size::create($request->only('name'));

        return redirect()->route('sizes.index');
    }

    public function edit(Size $size)
    {
        return Inertia::render('Admin/Sizes/EditSize', ['size' => $size]);
    }

    public function update(Request $request, Size $size)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $size->update($request->only('name'));

        return redirect()->route('sizes.index');
    }

    public function delete(Size $size)
    {
        return Inertia::render('Admin/Sizes/DeleteSize', ['size' => $size]);
    }

    public function destroy(Size $size)
    {
        $size->delete();
        return redirect()->route('sizes.index');
    }
}