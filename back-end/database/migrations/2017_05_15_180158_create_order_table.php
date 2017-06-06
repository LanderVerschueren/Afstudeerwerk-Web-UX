<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phonenumber');

            $table->integer('user_id')->unsigned();
            $table->integer('shop_id')->unsigned();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')->onDelete('cascade')->onUpdate('cascade');
                
            $table->string('payment_method');
            $table->date('date_pickup');
            $table->string('period_pickup');
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
        Schema::drop('orders');
    }
}
