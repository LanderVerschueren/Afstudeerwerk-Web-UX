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
            $table->increments('order_id');

            $table->integer('fk_user_id')->unsigned();
            $table->integer('fk_provider_id')->unsigned();

            $table->foreign('fk_user_id')
                ->references('id')
                ->on('users');
            $table->foreign('fk_provider_id')
                ->references('provider_id')
                ->on('providers');
                
            $table->boolean('status_payed');
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
