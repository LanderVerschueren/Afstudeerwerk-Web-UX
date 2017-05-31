<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post(	'register', 'ApiController@register');
Route::get(		'shops', 'ApiController@getShops');
Route::get(		'shop/{id}', 'ApiController@getShop');
Route::get(		'products/{id}', 'ApiController@getProducts');

Route::get( 	'user', 'AuthenticateController@getAuthenticatedUser');
Route::post( 	'authenticate', 'AuthenticateController@authenticate' );