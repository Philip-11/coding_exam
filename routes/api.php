<?php

use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Auth\AuthController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Login route
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    //User route
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::get('/users/{id}', [UsersController::class, 'show']);
    Route::put('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

    //Role route
    Route::get('/roles', [RolesController::class, 'index']);
    Route::post('/users', [RolesController::class, 'store']);
    Route::get('/users/{id}', [RolesController::class, 'show']);
    Route::put('/users/{id}', [RolesController::class, 'update']);
    Route::delete('/users/{id}', [RolesController::class, 'destroy']);
});