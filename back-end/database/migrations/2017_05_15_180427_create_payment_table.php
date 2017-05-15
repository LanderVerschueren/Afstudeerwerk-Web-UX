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
            $table->integer('fk_provider_id')->unsigned();
            $table->integer('fk_order_id')->unsigned();
            
            $table->foreign('fk_user_id')
                ->references('id')
                ->on('users');
            $table->foreign('fk_provider_id')
                ->references('provider_id')
                ->on('providers');
            $table->foreign('fk_order_id')
                ->references('order_id')
                ->on('orders');

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
