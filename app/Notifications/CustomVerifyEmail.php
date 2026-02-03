<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class CustomVerifyEmail extends BaseVerifyEmail
{
    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        Log::info('Preparando email de verificación', [
            'user_id' => $notifiable->id,
            'email' => $notifiable->email,
            'verification_url' => $verificationUrl,
        ]);

        return (new MailMessage)
            ->subject('Verifica tu correo electrónico - La Tienda de los Niños')
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line('Gracias por registrarte en La Tienda de los Niños.')
            ->line('Por favor, verifica tu correo electrónico haciendo clic en el botón de abajo para activar tu cuenta.')
            ->action('Verificar Correo Electrónico', $verificationUrl)
            ->line('Este enlace expirará en 60 minutos.')
            ->line('Si no creaste una cuenta, no es necesario realizar ninguna acción.')
            ->salutation('Saludos, El equipo de La Tienda de los Niños');
    }
}