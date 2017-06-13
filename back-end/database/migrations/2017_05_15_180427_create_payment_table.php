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
            $table->increments('id');
            
            $table->integer('customer_id')->unsigned();
            $table->integer('shop_id')->unsigned();
            $table->integer('order_id')->unsigned();
            
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')->onDelete('cascade')->onUpdate('cascade');

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
