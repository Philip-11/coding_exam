<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'rolename' => 'required|unique:roles,rolename',
            'description' => 'required',
        ]);

        $role = Role::create($validated);

        return response()->json([
            'message' => 'Role successfully created',
            'role' => $role,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::findOrFail($id);

        return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::find($id);

        if (!$role)
        {
            return response()->json([
                'message' => 'Role not found',
            ], 404);
        }

        $validated = $request->validate([
            'rolename' => 'required|unique:roles,rolename,' . $id,
            'description' => 'required',
        ]);

        $role->update($validated);

        return response()->json([
            'message' => 'Role successfully updated',
            'role' => $role,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role)
        {
            return response()->json([
                'message' => 'Role not found',
            ], 404);
        }

        $role->delete();

        return response()->json([
            'message' => 'Role successfully deleted',
        ]);
    }
}
