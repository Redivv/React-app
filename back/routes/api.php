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
    Route::post('password/reset-request', 'RequestPasswordController@sendResetLinkEmail');
    Route::post('password/reset', ['as' => 'password.reset', 'uses' => 'ResetPasswordController@reset']);
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
        Route::get('/search', 'OrderController@search');
        Route::post('/', 'OrderController@create');
        Route::put('/', 'OrderController@update');
        Route::delete('/{orderId:[0-9]+}', 'OrderController@delete');
        Route::put('/{orderId:[0-9]+}', 'OrderController@archive');
        Route::patch('/{orderId:[0-9]+}', 'OrderController@unArchive');
        Route::group([
            'prefix' => '{orderId:[0-9]+}/tasks'
        ], function () {
            Route::get('/', 'TaskController@all');
            Route::post('/', 'TaskController@create');
            Route::put('/', 'TaskController@update');
            Route::put('/{taskId:[0-9]+}', 'TaskController@updateColumn');
            Route::delete('/{taskId:[0-9]+}', 'TaskController@delete');
        });
    });
    Route::group([
        'prefix' => 'users'
    ], function () {
        Route::get('/deletable', 'UserController@allDeletable');
        Route::get('/assignable', 'UserController@allAssignable');
        Route::post('/', 'UserController@create');
        Route::put('/', 'RequestPasswordController@sendResetLinkEmailForAuthenticatedUser');
        Route::delete('/{userId:[0-9]+}', 'UserController@delete');
    });
});
