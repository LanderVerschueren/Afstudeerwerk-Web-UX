<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Order;
use App \OrderDetails;
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

    public function getShop( $id ) {
        $shop = DB::table( 'shops' )->where( 'id', '=', $id )->first();

        if( $shop ) {
            return response()->json( $shop );
        }
        else {
            return response()->json(['message' => 'no shop found']);
        }
    }

    public function getProducts($id) {
        $products = DB::table( 'products' )->where( 'id', "=", $id )->get();

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
            return response()->json(['error' => $validator->failed()]);
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

    public function storeOrder( Request $request ) {
        $input = $request->all();

        $validator = Validator::make( $input, [
            'user_id' => 'required',
            'shop_id' => 'required',
            'payment_method' => 'required',
            'name' => 'required',
            'email' => 'required',
            'phonenumber' => 'required',
            'products' => 'required',
        ]);

        if( $validator->fails() ) {
            return response()->json(['error' => $validator->failed()]);
        }
        else {
            $order = new Order;

            $order->user_id      = $input['user_id'];
            $order->shop_id      = $input['shop_id'];
            $order->name            = $input['name'];
            $order->email           = $input['email'];
            $order->phonenumber     = $input['phonenumber'];
            $order->payment_method  = $input['payment_method'];
            $order->date_pickup     = $input['date_pickup'];
            $order->period_pickup   = $input['period_pickup'];

            $success = $order->save();

            if( $success ) {
                $order_id = $order->id;
                foreach( json_decode($input['products'], true) as $product ) {
                    $order_details = new OrderDetails;

                    $order_details->order_id        = $order_id;
                    $order_details->item_name       = $product['product_name'];
                    $order_details->amount          = $product['amount'];
                    $order_details->price           = $product['price'];

                    $success_details = $order_details->save();

                    if( !$success_details ) {
                        return response()->json(['message' => false]);
                    }
                }

                return response()->json(['message' => true]);
            }
            else {
                return response()->json(['message' => false]);
            }
        }
    }

    public function getOrders( $id ) {
        $orders = Order::where('user_id', '=', $id)->with('order_details')->get();

        foreach( $orders as $order ) {
            $order->shop;
        }

        return $orders;
    }
}
