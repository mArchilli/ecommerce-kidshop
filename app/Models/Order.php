<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const SHIPPING_STATUS_PENDING = 'Pendiente';
    const SHIPPING_STATUS_DISPATCHED = 'Despachado';
    const SHIPPING_STATUS_DELIVERED = 'Entregado';

    protected $fillable = [
        'user_id',
        'payment_id',
        'total',
        'status',
        'province',
        'city',
        'postal_code',
        'address',
        'phone',
        'shipping_method',
        'shipping_status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}