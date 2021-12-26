<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $origin = $request->header('origin');
        $origin = $origin ?? '*';

        // ALLOW OPTIONS METHOD
        $headers = [
            'Access-Control-Allow-Origin' => $origin,
            'Access-Control-Allow-Methods' => 'GET, POST, DELETE, PUT, OPTIONS, HEAD, PATCH',
            'Access-Control-Allow-Headers' => 'Authorization,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Set-Cookie',
            'Access-Control-Allow-Credentials' => 'true'
        ];

        if ($request->getMethod() == "OPTIONS") {
            // The client-side application can set only headers allowed in Access-Control-Allow-Headers
            return Response::make('OK', 200, $headers);
        }

        $response = $next($request);

        if ($response instanceof StreamedResponse) {
            foreach ($headers as $key => $value) {
                $response->headers->set($key, $value);
            }
        } else {
            foreach ($headers as $key => $value) {
                $response->header($key, $value);
            }
        }
        return $response;
    }
}
