<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Book;
use App\Models\Author;
use App\Models\Genre;
use App\Services\BookService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'author_id', 'genre_id', 'sort']);
        $books = $this->bookService->getPaginatedBooks($filters);
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
            'description' => 'nullable|string',
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'published_year' => 'required|integer|min:1800|max:' . date('Y'),
            'cover_image' => 'nullable|image|max:2048',
            'file_path' => 'nullable|mimes:pdf|max:10240'
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        $this->bookService->createBook($validated);
        
        return redirect()->route('admin.books.index')->with('success', 'Книга успешно создана');
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
            'description' => 'nullable|string',
            'author_id' => 'required|exists:authors,id',
            'genre_id' => 'required|exists:genres,id',
            'published_year' => 'required|integer|min:1800|max:' . date('Y'),
            'cover_image' => 'nullable|image|max:2048',
            'file_path' => 'nullable|mimes:pdf|max:10240'
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $this->bookService->updateBook($book, $validated);
        
        return redirect()->route('admin.books.index')->with('success', 'Книга успешно обновлена');
    }

    public function destroy(Book $book)
    {
        $this->bookService->deleteBook($book);
        return redirect()->route('admin.books.index')->with('success', 'Книга успешно удалена');
    }

    /**
     * Удаление файла книги
     */
    public function removeFile(Book $book)
    {
        try {
            // Удаляем файл из хранилища
            if ($book->file_path && Storage::disk('public')->exists($book->file_path)) {
                Storage::disk('public')->delete($book->file_path);
            }
            
            // Очищаем путь к файлу в базе данных
            $book->file_path = null;
            $book->save();
            
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    /**
     * Массовые действия с книгами
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:delete,change_genre',
            'selected' => 'required|array',
            'selected.*' => 'exists:books,id',
            'genre_id' => 'required_if:action,change_genre|exists:genres,id'
        ]);

        try {
            $selectedBooks = Book::whereIn('id', $request->selected)->get();

            switch ($request->action) {
                case 'delete':
                    foreach ($selectedBooks as $book) {
                        $this->bookService->deleteBook($book);
                    }
                    $message = 'Выбранные книги успешно удалены';
                    break;

                case 'change_genre':
                    foreach ($selectedBooks as $book) {
                        $book->genre_id = $request->genre_id;
                        $book->save();
                    }
                    $message = 'Жанр успешно изменен для выбранных книг';
                    break;
            }

            return redirect()->route('admin.books.index')->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->route('admin.books.index')->with('error', 'Произошла ошибка: ' . $e->getMessage());
        }
    }
} 