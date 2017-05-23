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
            'email' => 'vanrenterghem@test.com',
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
            'email' => 'meert@test.com',
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
            'email' => 'luverco@test.com',
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
            'email' => 'renmans@test.com',
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
            'email' => 'kilm@test.com',
            'phonenumber' => '025237578',
            'street' => 'Meerstraat',
            'number' => 82,
            'postalCode' => 1840,
            'city' => 'Londerzeel',
            'password' => bcrypt('beenhouwerij_kil'),
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '1',
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '1',
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '2',
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '2',
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '3',
            'product_name' => 'Grote Witte Carré',
            'price' => 2,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '3',
            'product_name' => 'Pistolet',
            'price' => 1,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '4',
            'product_name' => 'Grote Witte Carré',
            'price' => 2,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '4',
            'product_name' => 'Pistolet',
            'price' => 1,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '5',
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '5',
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '6',
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'fk_shop_id' => '6',
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);


    }
}
