<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\CustomVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart()
    {
        return $this->hasOne(\App\Models\Cart::class);
    }

    /**
     * Enviar la notificación de verificación de correo electrónico.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        try {
            $this->notify(new CustomVerifyEmail());
        } catch (\Exception $e) {
            Log::error('Error al enviar notificación de verificación', [
                'user_id' => $this->id,
                'error' => $e->getMessage()
            ]);
            // No lanzar la excepción, permitir que continúe el flujo
        }
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
