<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'images', 'gender_id', 'is_featured'
    ];

    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class)->withPivot('stock');
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function offer()
    {
        return $this->hasOne(Offer::class);
    }

    public function activeOffer()
    {
        return $this->hasOne(Offer::class)->where('is_active', true);
    }

    public function hasActiveOffer()
    {
        return $this->activeOffer()->exists();
    }

    public function getOfferPrice()
    {
        $offer = $this->activeOffer;
        
        if (!$offer || !$offer->isValid()) {
            return null;
        }

        return $offer->discount_price;
    }

    public function getCurrentPrice()
    {
        $offerPrice = $this->getOfferPrice();
        return $offerPrice ?? $this->price;
    }
}