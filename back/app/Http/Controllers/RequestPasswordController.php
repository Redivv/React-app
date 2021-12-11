<?php

namespace App\Http\Controllers;

use App\Traits\SendsPasswordResetEmails;
use Laravel\Lumen\Routing\Controller;

class RequestPasswordController extends Controller
{
    use SendsPasswordResetEmails;
    public function __construct()
    {
        $this->broker = 'users';
    }
}
