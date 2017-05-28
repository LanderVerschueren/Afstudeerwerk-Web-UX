<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use DB;
use Validator;
use Illuminate\Database\QueryException;

class ApiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function getShops() {
        $shops = DB::table( 'shops' )->get();

        if( $shops ) {
            return $shops;
        }
        else {
            return response()->json(['message' => 'no shops found']);
        }
    }

    public function getProducts($id) {
        $products = DB::table( 'products' )->where( 'fk_shop_id', "=", $id )->get();

        if( $products ) {
            return $products;
        }
        else {
            return response()->json(['message' => 'no products found']);
        }
    }

    public function register( Request $request) {
        $input = $request->all();

        $message = [
            'email' => 'duplicate',
        ];

        $validator = Validator::make($input, [
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'bail|required|unique:users|email',
            'phonenumber' => 'required',
            'password' => 'bail|required|min:6',
        ], $message);

        if( $validator->fails() ) {
            return response()->json(['error' => $validator]);
        }
        else {
            $user = new User;

            $user->firstName    = $input['firstName'];
            $user->lastName     = $input['lastName'];
            $user->phonenumber  = $input['phonenumber'];
            $user->email        = $input['email'];
            $user->password     = Hash::make($input['password']);

            $success = $user->save();

            if( $success ) {
                return response()->json(['message' => true]);
            }
            else {
                return response()->json(['message' => false]);
            }
        }
    }
}
