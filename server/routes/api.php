<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\GenreController;

// Публичные роуты API
Route::prefix('v1')->group(function () {
    // Книги
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/latest', [BookController::class, 'latest']);
    Route::get('/books/random', [BookController::class, 'random']);
    Route::get('/books/genre/{genre}', [BookController::class, 'byGenre']);
    Route::get('/books/author/{author}', [BookController::class, 'byAuthor']);
    Route::get('/books/{book}', [BookController::class, 'show']);
    Route::get('/books/{book}/download', [BookController::class, 'downloadFile']);
    
    // Авторы
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/authors/{author}', [AuthorController::class, 'show']);
    
    // Жанры
    Route::get('/genres', [GenreController::class, 'index']);
    Route::get('/genres/{genre}', [GenreController::class, 'show']);
});



