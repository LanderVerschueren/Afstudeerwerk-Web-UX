<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customer_id', 'shop_id', 'status_payed', 'name', 'email', 'phonenumber', 'date_pickup', 'period_pickup', 'customer_ip',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function shop(){
        return $this->belongsTo('App\Shop');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function order_details() {
        return $this->hasMany('App\OrderDetails');
    }
}
