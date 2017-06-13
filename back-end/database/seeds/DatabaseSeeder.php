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
            'email' => 'verschueren@live.nl',
            'password' => bcrypt('Lander1994'),
            'role' => 'admin',
        ]);
        DB::table('customers')->insert([
            'user_id' => 1,
            'phonenumber' => '0494378589',
            'email' => 'verschueren@live.nl',
            'lastName' => 'verschueren',
            'firstName' => 'lander',
        ]);
        

        DB::table('users')->insert([
            'email' => 'test@test.com',
            'password' => bcrypt('test'),
            'role' => 'customer',
        ]);
        DB::table('customers')->insert([
            'user_id' => 2,
            'phonenumber' => '0000000000',
            'email' => 'test@test.com',
            'firstName' => 'test',
            'lastName' => 'test',
        ]);


        DB::table('users')->insert([
            'email' => 'johanmoortgat@skynet.be',
            'password' => bcrypt('beenhouwerij_moortgat'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 3,
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


        DB::table('users')->insert([
            'email' => 'vanrenterghem@test.com',
            'password' => bcrypt('beenhouwerij_van_renterghem'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 4,
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


        DB::table('users')->insert([
            'email' => 'meert@test.com',
            'password' => bcrypt('bakkerij_meert'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 5,
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


        DB::table('users')->insert([
            'email' => 'luverco@test.com',
            'password' => bcrypt('luverco'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 6,
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


        DB::table('users')->insert([
            'email' => 'renmans@test.com',
            'password' => bcrypt('renmans'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 7,
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


        DB::table('users')->insert([
            'email' => 'kilm@test.com',
            'password' => bcrypt('beenhouwerij_kil'),
            'role' => 'shop',
        ]);
        DB::table('shops')->insert([
            'user_id' => 8,
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
            'shop_id' => 1,
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 1,
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 1,
            'product_name' => 'Kippewit',
            'price' => 12.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 1,
            'product_name' => 'Salami',
            'price' => 13.50,
            'category' => 'charcuterie'
        ]);
        DB::table('products')->insert([
            'shop_id' => 1,
            'product_name' => 'Oude Kaas',
            'price' => 14.30,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 1,
            'product_name' => 'Schimmelkaas',
            'price' => 17.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Kippewit',
            'price' => 12.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Salami',
            'price' => 13.50,
            'category' => 'charcuterie'
        ]);
        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Oude Kaas',
            'price' => 14.30,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 2,
            'product_name' => 'Schimmelkaas',
            'price' => 17.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Grote Witte Carré',
            'price' => 2.15,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Kleine Witte Carré',
            'price' => 1.45,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Rozijnenbrood Groot',
            'price' => 3.95,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Pistolet Wit',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Pistolet Bruin',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 3,
            'product_name' => 'Sandwich',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Grote Witte Carré',
            'price' => 2.15,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Kleine Witte Carré',
            'price' => 1.45,
            'category' => 'brood'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Rozijnenbrood Groot',
            'price' => 3.95,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Pistolet Wit',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Pistolet Bruin',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 4,
            'product_name' => 'Sandwich',
            'price' => 0.5,
            'category' => 'pistolet'
        ]);

        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Kippewit',
            'price' => 12.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Salami',
            'price' => 13.50,
            'category' => 'charcuterie'
        ]);
        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Oude Kaas',
            'price' => 14.30,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 5,
            'product_name' => 'Schimmelkaas',
            'price' => 17.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Strasbourg',
            'price' => 15.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Jonge Kaas',
            'price' => 12.50,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Kippewit',
            'price' => 12.30,
            'category' => 'charcuterie'
        ]);

        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Salami',
            'price' => 13.50,
            'category' => 'charcuterie'
        ]);
        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Oude Kaas',
            'price' => 14.30,
            'category' => 'kaas'
        ]);

        DB::table('products')->insert([
            'shop_id' => 6,
            'product_name' => 'Schimmelkaas',
            'price' => 17.50,
            'category' => 'kaas'
        ]);
    }
}
