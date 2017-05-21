<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shops')->insert([
        	'name' => 'Beenhouwerij Moortgat',
        	'type' => 'Beenhouwerij',
        	'email' => 'johanmoortgat@skynet.be',
        	'phonenumber' => '037754636',
        	'street' => 'Kloosterstraat',
        	'number' => 72,
        	'postalCode' => 9120,
        	'city' => 'Beveren',
        	'password' => bcrypt('beenhouwerij_moortgat'),
        ]);

        DB::table('shops')->insert([
            'name' => 'Beenhouwerij Van Renterghem',
            'type' => 'Beenhouwerij',
            'email' => '',
            'phonenumber' => '',
            'street' => 'Stationstraat',
            'number' => 56,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('beenhouwerij_van_renterghem'),
        ]);

        DB::table('shops')->insert([
            'name' => 'Bakkerij Meert',
            'type' => 'Bakkerij',
            'email' => '',
            'phonenumber' => '052301362',
            'street' => 'Sint-Jozefstraat',
            'number' => 110,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('bakkerij_meert'),
        ]);

        DB::table('shops')->insert([
            'name' => 'Luverco',
            'type' => 'Bakkerij',
            'email' => '',
            'phonenumber' => '052305304',
            'street' => 'Stationsstraat',
            'number' => 71,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('luverco'),
        ]);

        DB::table('shops')->insert([
            'name' => 'Renmans',
            'type' => 'Beenhouwerij',
            'email' => '',
            'phonenumber' => '052303546',
            'street' => ' Molenstraat 21',
            'number' => 21,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('renmans'),
        ]);

        DB::table('shops')->insert([
            'name' => 'Beenhouwerij Kil',
            'type' => 'Beenhouwerij',
            'email' => '',
            'phonenumber' => '025237578',
            'street' => 'Meerstraat',
            'number' => 82,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('beenhouwerij_kil'),
        ]);
    }
}
