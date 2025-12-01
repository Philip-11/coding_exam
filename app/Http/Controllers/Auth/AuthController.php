<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

        if (!$user || !Hash::check($validated['nominated_pass'], $user->confirmed_pass)){

            return response()->json([
                'message' => 'User failed login',
            ], 401);

            
        }

        $token = $user->createToken('login-token')->plainTextToken;

        return response()->json([
                'message' => 'User succesfully logged in',
                'token' => $token,
                'user' => $user,
            ], 200);
        
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'User logged out',
            
        ], 200);
    }
}
