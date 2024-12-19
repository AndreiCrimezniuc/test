<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Controller;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    /**
     * Получить список книг
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'author_id', 'genre_id', 'sort']);
        $books = $this->bookService->getPaginatedBooks($filters);

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    }

    /**
     * Получить последние добавленные книги
     */
    public function latest(): JsonResponse
    {
        $books = $this->bookService->getLatestBooks();

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    }

    /**
     * Получить книги по жанру
     */
    public function byGenre(int $genreId): JsonResponse
    {
        $books = $this->bookService->getBooksByGenre($genreId);

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    }

    /**
     * Получить книги по автору
     */
    public function byAuthor(int $authorId): JsonResponse
    {
        $books = $this->bookService->getBooksByAuthor($authorId);

        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    }

    /**
     * Получить детальную информацию о книге
     */
    public function show(int $id): JsonResponse
    {
        $book = $this->bookService->getBookById($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Книга не найдена'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $book
        ]);
    }

    /**
     * Создать новую книгу
     */
    public function store(Request $request): JsonResponse
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

        $book = $this->bookService->createBook($validated);

        return response()->json([
            'success' => true,
            'message' => 'Книга успешно создана',
            'data' => $book
        ], 201);
    }

    /**
     * Обновить существующую книгу
     */
    public function update(Request $request, Book $book): JsonResponse
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

        $book = $this->bookService->updateBook($book, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Книга успешно обновлена',
            'data' => $book
        ]);
    }

    /**
     * Удалить книгу
     */
    public function destroy(Book $book): JsonResponse
    {
        $this->bookService->deleteBook($book);

        return response()->json([
            'success' => true,
            'message' => 'Книга успешно удалена'
        ]);
    }

    /**
     * Скачать файл книги
     */
    public function downloadFile(Book $book): StreamedResponse|JsonResponse
    {
        if (!$book->file_path || !Storage::disk('public')->exists($book->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'Файл не найден'
            ], 404);
        }

        $path = storage_path('app/public/' . $book->file_path);
        return response()->download($path, $book->title . '.pdf', [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment'
        ]);
    }

    /**
     * Получить информацию о файле книги
     */
    public function getFileInfo(Book $book): JsonResponse
    {
        if (!$book->file_path || !Storage::disk('public')->exists($book->file_path)) {
            return response()->json([
                'success' => false,
                'message' => 'Файл не найден'
            ], 404);
        }

        $path = storage_path('app/public/' . $book->file_path);
        
        return response()->json([
            'success' => true,
            'data' => [
                'file_url' => $book->file_url,
                'file_name' => $book->title . '.pdf',
                'file_size' => filesize($path),
                'mime_type' => mime_content_type($path)
            ]
        ]);
    }
}
