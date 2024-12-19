<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\AuthorController as AdminAuthorController;
use App\Http\Controllers\Admin\GenreController as AdminGenreController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\GenreController;

// Публичные роуты API
Route::prefix('v1')->group(function () {
    // Книги
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/latest', [BookController::class, 'latest']);
    Route::get('/books/genre/{slug}', [BookController::class, 'byGenre']);
    Route::get('/books/author/{slug}', [BookController::class, 'byAuthor']);
    Route::get('/books/{slug}', [BookController::class, 'show']);

    // Авторы
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/authors/{slug}', [AuthorController::class, 'show']);

    // Жанры
    Route::get('/genres', [GenreController::class, 'index']);
    Route::get('/genres/{slug}', [GenreController::class, 'show']);
});

// Роуты аутентификации
Route::middleware('api')->group(function () {
    Route::post('/admin/login', [AuthController::class, 'login']);
    Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/admin/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
});

// Защищенные роуты админки
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Книги
    Route::apiResource('books', AdminBookController::class)->except(['index']);
    
    // Авторы
    Route::apiResource('authors', AdminAuthorController::class)->except(['index']);
    
    // Жанры
    Route::apiResource('genres', AdminGenreController::class)->except(['index']);
});



