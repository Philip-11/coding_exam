<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        DB::table('roles')->insert([
            'rolename' => 'Admin',
            'description' => 'Has access to all of the features',
        ]);
        
        DB::table('users')->insert([
            'full_name' => 'Admin User',
            'email_address' => 'admin@example.com',
            'nominated_pass' => 'admin123',
            'confirmed_pass' => Hash::make('admin123'),
            'role_id' => 1,
        ]);

        
    }
}
