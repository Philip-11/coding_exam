<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'full_name' => 'required|unique:users,full_name',
            'email_address' => 'required|unique:users,email_address|email',
            'nominated_pass' => 'required',
            'confirmed_pass' => 'required|same:nominated_pass',
            'role_id' => 'required|exists:roles,id',
        ]);

        $validated['confirmed_pass'] = Hash::make($validated['confirmed_pass']);

        $user = User::create($validated);

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $users = User::findOrFail($id);

        return response()->json($users);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user)
        {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        //If the request has password
        if ($request->nominated_pass)
        {
            $validated = $request->validate([
                'full_name' => 'required|string',
                'email_address' => 'required|email',
                'nominated_pass' => 'required',
                'confirmed_pass' => 'required|same:nominated_pass',
                'role_id' => 'required|exists:roles,id',
            ]);

            $validated['confirmed_pass'] = Hash::make($validated['confirmed_pass']);

            $user->update($validated);

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user,
            ]);
        }

        $validated = $request->validate([
            'full_name' => 'required|string',
            'email_address' => 'required|email',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user)
        {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User successfully deleted',
        ]);
    }
}
