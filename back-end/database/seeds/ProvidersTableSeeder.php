<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ProvidersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('providers')->insert([
        	'name' => 'Beenhouwerij Moortgat',
        	'type' => 'Beenhouwerij',
        	'email' => 'johanmoortgat@skynet.be',
        	'phonenumber' => '037754636',
        	'street' => 'Kloosterstraat',
        	'number' => 72,
        	'postalCode' => 9120,
        	'city' => 'Beveren',
        	'password' => bcrypt('johanmoortgat'),
        ]);
    }
}
