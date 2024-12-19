<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Author;
use App\Models\Genre;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'books_count' => Book::count(),
            'authors_count' => Author::count(),
            'genres_count' => Genre::count(),
        ];
        
        return view('admin.dashboard', compact('stats'));
    }
} 