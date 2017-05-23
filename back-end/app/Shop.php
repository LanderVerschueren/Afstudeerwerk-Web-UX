<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'zaaknaam', 'gsm', 'email', 'straat', 'nummer', 'postcode', 'gemeente', 'type',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function products() {
        return $this->hasMany('App\Product');
    }

    public function orders() {
        return $this->hasMany('App\Order');
    }

    public function payments() {
        return $this->hasMany('App\Payment');
    }
}
