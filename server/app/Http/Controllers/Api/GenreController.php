<?php

namespace App\Http\Controllers\Api;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends ApiController
{
    public function index(Request $request)
    {
        $query = Genre::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('sort')) {
            switch ($request->get('sort')) {
                case 'name_asc':
                    $query->orderBy('name');
                    break;
                case 'name_desc':
                    $query->orderByDesc('name');
                    break;
                case 'books_count':
                    $query->withCount('books')->orderByDesc('books_count');
                    break;
            }
        } else {
            $query->orderBy('name');
        }

        $genres = $query->paginate(15);
        return $this->paginatedResponse($genres);
    }

    public function show(Genre $genre)
    {
        $genre->load('books');
        return $this->successResponse($genre);
    }
} 