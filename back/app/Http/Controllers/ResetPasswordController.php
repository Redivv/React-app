<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use App\Traits\ResetsPasswords;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;
}
