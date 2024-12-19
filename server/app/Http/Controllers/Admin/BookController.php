<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\Author;
use App\Models\Genre;
use Illuminate\Routing\Controller;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with(['author', 'genre'])->latest()->paginate(10);
        $authors = Author::all();
        $genres = Genre::all();
        return view('admin.books.index', compact('books', 'authors', 'genres'));
    }

    public function create()
    {
        $authors = Author::all();
        $genres = Genre::all();
        return view('admin.books.create', compact('authors', 'genres'));
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

        Book::create($validated);
        return redirect()->route('admin.books.index')->with('success', 'Book created successfully');
    }

    public function edit(Book $book)
    {
        $authors = Author::all();
        $genres = Genre::all();
        return view('admin.books.edit', compact('book', 'authors', 'genres'));
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
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
        return redirect()->route('admin.books.index')->with('success', 'Book updated successfully');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('admin.books.index')->with('success', 'Book deleted successfully');
    }
} 