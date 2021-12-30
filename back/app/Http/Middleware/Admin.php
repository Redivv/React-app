<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Admin
{

    public function handle($request, Closure $next)
    {
        if (!Auth::user()->is_admin) {
            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}
