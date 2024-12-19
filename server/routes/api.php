<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\GenreController;

// Публичные роуты API
Route::prefix('v1')->group(function () {
    // Роуты аутентификации
    Route::post('/login', [AuthController::class, 'apiLogin']);
    Route::post('/register', [AuthController::class, 'apiRegister']);
    
    // Публичные роуты для просмотра
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/latest', [BookController::class, 'latest']);
    Route::get('/books/genre/{slug}', [BookController::class, 'byGenre']);
    Route::get('/books/author/{slug}', [BookController::class, 'byAuthor']);
    Route::get('/books/{slug}', [BookController::class, 'show']);
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/authors/{slug}', [AuthorController::class, 'show']);
    Route::get('/genres', [GenreController::class, 'index']);
    Route::get('/genres/{slug}', [GenreController::class, 'show']);

    // Защищенные роуты (требуют авторизации)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);

        // Управление контентом
        Route::apiResource('books', BookController::class)->except(['index', 'show']);
        Route::apiResource('authors', AuthorController::class)->except(['index', 'show']);
        Route::apiResource('genres', GenreController::class)->except(['index', 'show']);
    });
});



