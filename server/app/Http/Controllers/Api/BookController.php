<?php
namespace App\Http\Controllers\Api;

use App\Helpers\BookFileUpload;
use App\Http\Requests\BookStoreRequest;
use App\Models\Book;
use App\Models\BookFile;
use App\Services\BookService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BookController extends Controller
{
    private $bookService;

    public function __construct(BookService $bookService) {
        $this->bookService = $bookService;
    }

    public function index()
    {
        $books = Book::with(['author', 'genre'])
            ->select(['id', 'title', 'description', 'published_year', 'cover_image', 'slug'])
            ->paginate(12);

        return response()->json([
            'data' => $books->items(),
            'meta' => [
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
                'per_page' => $books->perPage(),
                'total' => $books->total()
            ]
        ]);
    }

    public function getBySlug($slug)
    {
        $book = Book::with(['author', 'genre', 'files'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => $book
        ]);
    }

    public function store(BookStoreRequest $request) {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            // путь к изображению
            $imagePath = null;
            if (request()->hasFile('cover_image')) {
                $image = $data['cover_image'];
                $newName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('images/covers', $newName, 'public');
            }

            // создание книги
            $book = $this->bookService->create([
                'title' => $data['title'],
                'author_id' => $data['author_id'],
                'genre_id' => $data['genre_id'],
                'description' => $data['description'] ?? null,
                'published_year' => $data['published_year'],
                'file_path' => $data['file_path'],
                'cover_image' => $imagePath,
            ]);

            // Загрузка файлов
            if (!empty($data['files'])) {
                $uploadedFiles = BookFileUpload::uploadFiles($data['files']);
                foreach ($uploadedFiles as $file) {
                    BookFile::create([
                        'filename' => $file,
                        'book_id' => $book->id,
                    ]);
                }
            }
        });

        return response()->json(['message' => 'Book created successfully']);
    }

    public function update(BookStoreRequest $request, $id) {
        $book = $this->bookService->get($id, false, []);
        $data = $request->validated();

        DB::transaction(function () use ($data, $book) {
            if (request()->hasFile('cover_image')) {
                // Удаление старого изображения
                if ($book->cover_image) {
                    Storage::disk('public')->delete($book->cover_image);
                }

                $image = $data['cover_image'];
                $newName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('images/covers', $newName, 'public');
                $data['cover_image'] = $imagePath;
            }

            $book->update($data);

            if (!empty($data['files'])) {
                $uploadedFiles = BookFileUpload::uploadFiles($data['files']);
                foreach ($uploadedFiles as $file) {
                    BookFile::create([
                        'book_id' => $book->id,
                        'file_path' => $file['path'],
                        'file_type' => $file['type']
                    ]);
                }
            }
        });

        return response()->json(['message' => 'Book updated successfully']);
    }

    public function destroy($id) {
        $book = $this->bookService->get($id, false, []);

        DB::transaction(function () use ($book) {
            // Удаление файлов книги
            foreach ($book->files as $file) {
                Storage::disk('public')->delete($file->file_path);
                $file->delete();
            }

            // Удаление обложки
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }

            $book->delete();
        });

        return response()->json(['message' => 'Book deleted successfully']);
    }

    public function downloadFile($id) {
        $bookFile = BookFile::findOrFail($id);
        $filePath = storage_path('app/public/' . $bookFile->file_path);

        if (!file_exists($filePath)) {
            abort(404);
        }

        return response()->download($filePath);
    }
}
