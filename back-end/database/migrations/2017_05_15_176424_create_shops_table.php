<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::create('shops', function (Blueprint $table) {
            $table->increments('shop_id');
            $table->string('name');
            $table->string('type');
            $table->string('email')->unique();
            $table->string('phonenumber');
            $table->string('street');
            $table->integer('number');
            $table->integer('postalCode');
            $table->string('city');
            $table->string('password');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('shops');
    }
}