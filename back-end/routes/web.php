<?php

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

$app->get('/key', function() {
    return str_random(32);
});

$app->group(['prefix' => 'api'], function () use ($app) {
    $app->get('/shops', 'ApiController@getShops');
    $app->get('/products/{id}', 'ApiController@getProducts');
});

$app->POST('/auth/login', 'AuthController@loginPost');