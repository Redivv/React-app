<?php

namespace App\Http\Middleware;

use Closure;

class ConvertEmptyStringToNull
{
    public function handle($request, Closure $next)
    {
        foreach ($request->input() as $key => $value) {
            if (empty($value) && ($value !== 0)) {
                $request->request->set($key, null);
            }
        }

        return $next($request);
    }
}
