<?php

namespace App\Http\Controllers\Api;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends ApiController
{
    public function index(Request $request)
    {
        $query = Author::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('firstname', 'like', "%{$search}%")
                  ->orWhere('lastname', 'like', "%{$search}%");
            });
        }

        if ($request->has('sort')) {
            switch ($request->get('sort')) {
                case 'name_asc':
                    $query->orderBy('firstname')->orderBy('lastname');
                    break;
                case 'name_desc':
                    $query->orderByDesc('firstname')->orderByDesc('lastname');
                    break;
                case 'books_count':
                    $query->withCount('books')->orderByDesc('books_count');
                    break;
            }
        } else {
            $query->orderBy('firstname')->orderBy('lastname');
        }

        $query->with('books');

        $authors = $query->paginate(15);
        return $this->paginatedResponse($authors);
    }

    public function show(Author $author)
    {
        $author->load('books');
        return $this->successResponse($author);
    }
}
