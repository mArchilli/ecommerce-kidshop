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
}