<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'user_id', 'firstName', 'lastName', 'email', 'phonenumber',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
    ];

    public function users() {
    	return $this->belongsTo('App\User');
    }

    public function orders() {
        return $this->hasMany('App\Order');
    }

    public function payments() {
        return $this->hasMany('App\Payment');
    }
}
