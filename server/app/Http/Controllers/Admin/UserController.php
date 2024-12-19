<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('super.admin');
    }

    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->paginate(10);
        return view('admin.users.index', compact('users'));
    }

    public function toggleAdmin(User $user)
    {
        if (auth()->user()->isSuperAdmin()) {
            $user->is_admin = !$user->is_admin;
            $user->save();
            
            return back()->with('success', 
                $user->is_admin ? 'Права администратора предоставлены' : 'Права администратора отозваны'
            );
        }
        
        return back()->with('error', 'Недостаточно прав');
    }
} 