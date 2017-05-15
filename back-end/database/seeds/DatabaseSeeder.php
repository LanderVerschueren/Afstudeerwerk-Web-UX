<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*$this->call('UsersTableSeeder');
        $this->call('ProvidersTableSeeder');*/

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

        DB::table('users')->insert([
        	'firstName' => 'Lander',
        	'lastName' => 'Verschueren',
        	'email' => 'verschueren@live.nl',
        	'phonenumber' => '0494378589',
        	'password' => bcrypt('Lander1994'),
        ]);
        
        DB::table('users')->insert([
        	'firstName' => 'test',
        	'lastName' => 'test',
        	'email' => 'test@test.com',
        	'phonenumber' => '0000000000',
        	'password' => bcrypt('test'),
        ]);
    }
}
