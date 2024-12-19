<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Api\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;

class AdminController extends Controller
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
