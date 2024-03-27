<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    function findAllUsers()
    {
        try {
            $users = User::all(["id", "name", "email"]);
            if ($users->count() > 0) {
                return response()->json([
                    "message" => "Users found successfully",
                    "data" => $users
                ], 200);
            } else {
                return response()->json([
                    "message" => "No users found"
                ], 400);
            }

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
