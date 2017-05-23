<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('payment_id');
            
            $table->integer('fk_user_id')->unsigned();
            $table->integer('fk_shop_id')->unsigned();
            $table->integer('fk_order_id')->unsigned();
            
            $table->foreign('fk_user_id')
                ->references('id')
                ->on('users')->onDelete('cascade')->onUpdate('cascade');;
            $table->foreign('fk_shop_id')
                ->references('shop_id')
                ->on('shops')->onDelete('cascade')->onUpdate('cascade');;
            $table->foreign('fk_order_id')
                ->references('order_id')
                ->on('orders')->onDelete('cascade')->onUpdate('cascade');;

            $table->double('price_total');
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
        Schema::drop('payments');
    }
}
