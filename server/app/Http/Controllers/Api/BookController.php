<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Author;
use Illuminate\Http\Request;

class BookController extends ApiController
{
    public function index(Request $request)
    {
        $query = Book::with(['author', 'genre']);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->has('author_id')) {
            $query->where('author_id', $request->get('author_id'));
        }

        if ($request->has('genre_id')) {
            $query->where('genre_id', $request->get('genre_id'));
        }

        if ($request->has('sort')) {
            switch ($request->get('sort')) {
                case 'newest':
                    $query->latest();
                    break;
                case 'oldest':
                    $query->oldest();
                    break;
                case 'title_asc':
                    $query->orderBy('title');
                    break;
                case 'title_desc':
                    $query->orderByDesc('title');
                    break;
                case 'random':
                    $query->inRandomOrder();
                    break;
            }
        } else {
            $query->latest();
        }

        if ($request->has('limit')) {
            $query->limit($request->get('limit'));
        }

        $books = $query->get();
        return $this->successResponse($books);
    }

    public function latest()
    {
        $books = Book::with(['author', 'genre'])
            ->latest()
            ->take(10)
            ->get();
            
        return $this->successResponse($books);
    }

    public function random(Request $request)
    {
        $limit = $request->get('limit', 10);
        $books = Book::with(['author', 'genre'])
            ->inRandomOrder()
            ->limit($limit)
            ->get();
            
        return $this->successResponse($books);
    }

    public function byGenre(Genre $genre)
    {
        $books = Book::with(['author', 'genre'])
            ->where('genre_id', $genre->id)
            ->latest()
            ->paginate(12);
            
        return $this->paginatedResponse($books);
    }

    public function byAuthor(Author $author)
    {
        $books = Book::with(['author', 'genre'])
            ->where('author_id', $author->id)
            ->latest()
            ->paginate(12);
            
        return $this->paginatedResponse($books);
    }

    public function show(Book $book)
    {
        $book->load(['author', 'genre']);
        return $this->successResponse($book);
    }

    public function downloadFile(Book $book)
    {
        if (!$book->file_path || !Storage::disk('public')->exists($book->file_path)) {
            return $this->errorResponse('Файл не найден', 404);
        }

        $path = storage_path('app/public/' . $book->file_path);
        return response()->download($path, basename($book->file_path));
    }
}
