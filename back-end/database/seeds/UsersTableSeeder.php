<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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