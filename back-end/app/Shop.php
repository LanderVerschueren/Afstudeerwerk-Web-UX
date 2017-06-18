<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Shop extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phonenumber', 'email', 'street', 'number', 'postalCode', 'city', 'type', 'image'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

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
