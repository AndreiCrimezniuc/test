<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if (!$user->is_admin) {
                Auth::logout();
                return response()->json([
                    'success' => false,
                    'message' => 'This account does not have admin access.'
                ], 403);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $user->createToken('admin-token')->plainTextToken
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'The provided credentials are incorrect.'
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $request->user()
            ]
        ]);
    }
}
