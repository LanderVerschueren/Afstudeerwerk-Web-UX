<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->increments('order__details_id');

            $table->integer('fk_order_id')->unsigned();
            $table->foreign('fk_order_id')
                ->references('order_id')
                ->on('orders')->onDelete('cascade')->onUpdate('cascade');
                
            $table->string('item_name');
            $table->double('amount');
            $table->double('price');
            $table->boolean('payment_method');
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
        Schema::drop('order_details');
    }
}
