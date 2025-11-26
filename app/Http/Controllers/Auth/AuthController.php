<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email_address' => 'required|email',
            'nominated_pass' => 'required',
        ]);

        $user = User::where('email_address', $validated['email_address'])->first();

        if (!$user || Hash::check($validated['nominated_pass'], $user->confirmed_pass)){
            Auth::login($user);

            return response()->json([
                'message' => 'User succesfully logged in',
                'user' => $user,
            ], 200);
        }

        return response()->json([
            'message' => 'User failed login',
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'User logged out',
            
        ], 200);
    }
}
