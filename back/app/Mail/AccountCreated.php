<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;

class AccountCreated extends Mailable
{
    private string $password;
    public function __construct(string $password)
    {
        $this->password = $password;
    }

    public function build()
    {
        return $this->subject('Account Created')
            ->html((new MailMessage)
                    ->line('Welcome to The Order Managment Application')
                    ->line('Use your email address and the following password:' . $this->password . ' to log in')
                    ->action('Go To Login Page', env('FRONT_URL') . '/login')
                    ->line('The password can be changed in the application')
                    ->line('Thank you for using our application!')
                    ->render()
            );
    }
}
