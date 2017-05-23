<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fk_user_id', 'fk_shop_id', 'fk_order_id', 'price_total',
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
}
