<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('refresh', 'AuthController@refresh');
    Route::group([
        'middleware' => 'jwt',
    ], function () {
        Route::post('logout', 'AuthController@logout');
    });
});
Route::get('/', function () {
    phpinfo();
});

Route::group([
    'middleware' => 'jwt',
], function () {
    Route::group([
        'prefix' => 'orders'
    ], function () {
        Route::get('/', 'OrderController@all');
    });
});
