<?php

use App\Http\Controllers\Api\ApiAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;

// Главная страница
Route::get('/', function () {
    if (auth()->check() && auth()->user()->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('login');
});

// Маршруты аутентификации
Route::middleware('guest')->group(function () {
    Route::get('/login', [ApiAuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [ApiAuthController::class, 'login'])->name('login.post');
    Route::get('/register', [ApiAuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [ApiAuthController::class, 'register'])->name('register.post');
});

Route::post('/logout', [ApiAuthController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

// Админ панель и управление контентом
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Управление пользователями (только для супер-админа)
    Route::middleware(['super.admin'])->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users/{user}/toggle-admin', [UserController::class, 'toggleAdmin'])
            ->name('users.toggle-admin');
    });

    // Маршруты для книг
    Route::resource('books', BookController::class);
    Route::post('books/bulk-action', [BookController::class, 'bulkAction'])->name('books.bulk-action');
    Route::get('books/{book}/upload-files', [BookController::class, 'uploadFilesForm'])->name('books.upload-files.form');
    Route::post('books/{book}/upload-files', [BookController::class, 'uploadFiles'])->name('books.upload-files');
    Route::delete('books/files/{file}', [BookController::class, 'destroyFile'])->name('books.files.destroy');

    // Аналогичные маршруты для авторов и жанров
    Route::resource('authors', AuthorController::class);
    Route::resource('genres', GenreController::class);
});
