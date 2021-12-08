<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Laravel\Lumen\Routing\Controller;

class OrderController extends Controller
{
    public function all()
    {
        return response()->json(Order::all());
    }
}
