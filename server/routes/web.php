<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\DashboardController;

// Главная страница
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('login');
});

// Маршруты аутентификации
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

Route::post('/logout', [AuthController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

// Управление контентом (доступно всем авторизованным пользователям)
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Маршруты для книг
    Route::resource('books', BookController::class);
    Route::post('books/bulk-action', [BookController::class, 'bulkAction'])->name('books.bulk-action');
    Route::get('books/{book}/upload-files', [BookController::class, 'uploadFilesForm'])->name('books.upload-files.form');
    Route::post('books/{book}/upload-files', [BookController::class, 'uploadFiles'])->name('books.upload-files');
    Route::delete('books/files/{file}', [BookController::class, 'destroyFile'])->name('books.files.destroy');

    // Маршруты для авторов и жанров
    Route::resource('authors', AuthorController::class);
    Route::resource('genres', GenreController::class);
});
