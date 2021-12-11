<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;

class AccountCreated extends Mailable
{

    public function build()
    {
        return $this->subject('Account Created')
            ->html((new MailMessage)
                    ->line('Welcome to The Order Managment Application')
                    ->line('First you must use your email address to setup a password via forgot password page')
                    ->action('Set up a new password', env('FRONT_URL') . '/forgot')
                    ->line('Then you can log in using your new password')
                    ->action('Login Page', env('FRONT_URL') . '/login')
                    ->line('Thank you for using our application!')
                    ->render()
            );
    }
}
