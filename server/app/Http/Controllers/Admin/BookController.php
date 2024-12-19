<?php

namespace App\Http\Controllers\Admin;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookController extends BaseAdminController
{
    public function index()
    {
        $books = Book::with(['author', 'genre'])->latest()->paginate(10);
        return $this->successResponse($books);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'image' => 'nullable|image|max:2048',
            'file' => 'nullable|mimes:pdf,epub|max:10240'
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('books/images', 'public');
        }
        
        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('books/files', 'public');
        }

        $book = Book::create($validated);
        return $this->successResponse($book, 'Book created successfully', 201);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'author_id' => 'sometimes|required|exists:authors,id',
            'genre_id' => 'sometimes|required|exists:genres,id',
            'image' => 'nullable|image|max:2048',
            'file' => 'nullable|mimes:pdf,epub|max:10240'
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('books/images', 'public');
        }
        
        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('books/files', 'public');
        }

        $book->update($validated);
        return $this->successResponse($book, 'Book updated successfully');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return $this->successResponse(null, 'Book deleted successfully');
    }
} 