<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::with('product')->get();
        return Inertia::render('Admin/Offers/OffersView', [
            'offers' => $offers
        ]);
    }

    public function create()
    {
        $products = Product::whereDoesntHave('offer')->get();
        return Inertia::render('Admin/Offers/CreateOffer', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id|unique:offers,product_id',
            'name' => 'required|string|max:255',
            'discount_price' => 'required|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        // Validar que el precio de oferta sea menor al precio original
        $product = Product::findOrFail($validated['product_id']);
        if ($validated['discount_price'] >= $product->price) {
            return back()->withErrors([
                'discount_price' => 'El precio de oferta debe ser menor al precio original del producto ($' . $product->price . ')'
            ]);
        }

        // Calcular el porcentaje si no se proporcionó
        if (!isset($validated['discount_percentage']) || $validated['discount_percentage'] === null) {
            $validated['discount_percentage'] = round((($product->price - $validated['discount_price']) / $product->price) * 100, 2);
        }

        Offer::create($validated);

        return redirect()->route('offers.index')->with('success', 'Oferta creada exitosamente');
    }

    public function edit(Offer $offer)
    {
        $products = Product::whereDoesntHave('offer')
            ->orWhere('id', $offer->product_id)
            ->get();
        
        return Inertia::render('Admin/Offers/EditOffer', [
            'offer' => $offer->load('product'),
            'products' => $products
        ]);
    }

    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id|unique:offers,product_id,' . $offer->id,
            'name' => 'required|string|max:255',
            'discount_price' => 'required|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        // Validar que el precio de oferta sea menor al precio original
        $product = Product::findOrFail($validated['product_id']);
        if ($validated['discount_price'] >= $product->price) {
            return back()->withErrors([
                'discount_price' => 'El precio de oferta debe ser menor al precio original del producto ($' . $product->price . ')'
            ]);
        }

        // Calcular el porcentaje si no se proporcionó
        if (!isset($validated['discount_percentage']) || $validated['discount_percentage'] === null) {
            $validated['discount_percentage'] = round((($product->price - $validated['discount_price']) / $product->price) * 100, 2);
        }

        $offer->update($validated);

        return redirect()->route('offers.index')->with('success', 'Oferta actualizada exitosamente');
    }

    public function delete(Offer $offer)
    {
        return Inertia::render('Admin/Offers/DeleteOffer', [
            'offer' => $offer->load('product')
        ]);
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();
        return redirect()->route('offers.index')->with('success', 'Oferta eliminada exitosamente');
    }

    public function toggleActive(Offer $offer)
    {
        $offer->update(['is_active' => !$offer->is_active]);
        return back()->with('success', 'Estado de la oferta actualizado');
    }
}
