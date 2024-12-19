<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BookService
{
    /**
     * Получить список всех книг с пагинацией
     */
    public function getPaginatedBooks(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = Book::with(['author', 'genre']);

        // Применяем фильтры
        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%')
                ->orWhereHas('author', function ($q) use ($filters) {
                    $q->where('firstname', 'like', '%' . $filters['search'] . '%')
                        ->orWhere('lastname', 'like', '%' . $filters['search'] . '%');
                });
        }

        if (!empty($filters['author_id'])) {
            $query->where('author_id', $filters['author_id']);
        }

        if (!empty($filters['genre_id'])) {
            $query->where('genre_id', $filters['genre_id']);
        }

        // Применяем сортировку
        switch ($filters['sort'] ?? 'newest') {
            case 'oldest':
                $query->oldest();
                break;
            case 'title_asc':
                $query->orderBy('title', 'asc');
                break;
            case 'title_desc':
                $query->orderBy('title', 'desc');
                break;
            default:
                $query->latest();
                break;
        }

        return $query->paginate($perPage);
    }

    /**
     * Получить книгу по ID
     */
    public function getBookById(int $id): ?Book
    {
        return Book::with(['author', 'genre'])->find($id);
    }

    /**
     * Создать новую книгу
     */
    public function createBook(array $data): Book
    {
        // Генерируем slug из названия
        $data['slug'] = Str::slug($data['title']);

        // Обработка файлов перед созданием записи
        if (isset($data['cover_image']) && $data['cover_image']) {
            $data['cover_image'] = $this->uploadCoverImage($data['cover_image']);
        }

        if (isset($data['file_path']) && $data['file_path']) {
            $data['file_path'] = $this->uploadBookFile($data['file_path']);
        }

        // Создание записи в базе данных
        $book = Book::create($data);

        return $book->load(['author', 'genre']);
    }

    /**
     * Обновить существующую книгу
     */
    public function updateBook(Book $book, array $data): Book
    {
        // Обновляем slug если изменилось название
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Обработка файлов
        if (isset($data['cover_image']) && $data['cover_image']) {
            // Удаляем старую обложку
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $data['cover_image'] = $this->uploadCoverImage($data['cover_image']);
        }

        if (isset($data['file_path']) && $data['file_path']) {
            // Удаляем старый файл
            if ($book->file_path) {
                Storage::disk('public')->delete($book->file_path);
            }
            $data['file_path'] = $this->uploadBookFile($data['file_path']);
        }

        $book->update($data);
        return $book->load(['author', 'genre']);
    }

    /**
     * Удалить книгу
     */
    public function deleteBook(Book $book): bool
    {
        // Удаляем файлы
        if ($book->cover_image) {
            Storage::disk('public')->delete($book->cover_image);
        }
        if ($book->file_path) {
            Storage::disk('public')->delete($book->file_path);
        }

        return $book->delete();
    }

    /**
     * Получить последние добавленные книги
     */
    public function getLatestBooks(int $limit = 5): Collection
    {
        return Book::with(['author', 'genre'])
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Получить книги по жанру
     */
    public function getBooksByGenre(int $genreId, int $perPage = 10): LengthAwarePaginator
    {
        return Book::with(['author', 'genre'])
            ->where('genre_id', $genreId)
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Получить книги по автору
     */
    public function getBooksByAuthor(int $authorId, int $perPage = 10): LengthAwarePaginator
    {
        return Book::with(['author', 'genre'])
            ->where('author_id', $authorId)
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Загрузить обложку книги
     */
    private function uploadCoverImage($file): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        return $file->storeAs('books/images', $filename, 'public');
    }

    /**
     * Загрузить файл книги
     */
    private function uploadBookFile($file): string
    {
        $filename = Str::uuid() . '.pdf';
        return $file->storeAs('books/files', $filename, 'public');
    }
}