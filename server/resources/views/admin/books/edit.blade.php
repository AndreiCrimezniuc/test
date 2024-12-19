@extends('layouts.admin')

@section('title', 'Редактировать книгу')

@section('content')
<!-- Модальное окно подтверждения -->
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmModalLabel">Подтверждение действия</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Вы уверены, что хотите удалить этот файл?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                <button type="button" class="btn btn-danger" id="confirmDelete">Удалить</button>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h2>Редактировать книгу</h2>
    </div>
    
    <div class="card-body">
        <form action="{{ route('admin.books.update', $book) }}" method="POST" enctype="multipart/form-data" id="editForm" class="needs-validation" novalidate>
            @csrf
            @method('PUT')
            <input type="hidden" id="bookId" value="{{ $book->id }}">
            
            <div class="form-group mb-3">
                <label>Название</label>
                <input type="text" name="title" value="{{ old('title', $book->title) }}" class="form-control @error('title') is-invalid @enderror" required>
                @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Автор</label>
                <select name="author_id" class="form-control @error('author_id') is-invalid @enderror" required>
                    @foreach($authors as $author)
                        <option value="{{ $author->id }}" {{ $book->author_id == $author->id ? 'selected' : '' }}>
                            {{ $author->firstname }} {{ $author->lastname }}
                        </option>
                    @endforeach
                </select>
                @error('author_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Жанр</label>
                <select name="genre_id" class="form-control @error('genre_id') is-invalid @enderror" required>
                    @foreach($genres as $genre)
                        <option value="{{ $genre->id }}" {{ $book->genre_id == $genre->id ? 'selected' : '' }}>
                            {{ $genre->name }}
                        </option>
                    @endforeach
                </select>
                @error('genre_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Описание</label>
                <textarea name="description" class="form-control @error('description') is-invalid @enderror">{{ old('description', $book->description) }}</textarea>
                @error('description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Год издания</label>
                <input type="number" name="published_year" value="{{ old('published_year', $book->published_year) }}" class="form-control @error('published_year') is-invalid @enderror" required>
                @error('published_year')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Обложка</label>
                <input type="file" name="cover_image" class="form-control @error('cover_image') is-invalid @enderror">
                @error('cover_image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                @if($book->cover_image)
                    <div class="mt-2">
                        <img src="{{ asset('storage/' . $book->cover_image) }}" alt="Текущая обложка" style="max-height: 200px;">
                    </div>
                @endif
            </div>
            
            <div class="form-group mb-3">
                <label>PDF файл книги</label>
                <input type="file" name="file_path" class="form-control @error('file_path') is-invalid @enderror" accept=".pdf">
                <small class="text-muted">Максимальный размер файла: 10MB</small>
                @error('file_path')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                @if($book->file_path)
                    <div class="mt-2">
                        <p>Текущий файл: {{ basename($book->file_path) }}</p>
                        <div class="btn-group">
                            <a href="{{ asset('storage/' . $book->file_path) }}" 
                               class="btn btn-sm btn-info" 
                               target="_blank">
                                Скачать
                            </a>
                            <button type="button" 
                                    class="btn btn-sm btn-danger" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#confirmModal">
                                Удалить файл
                            </button>
                        </div>
                    </div>
                @endif
            </div>
            
            <button type="submit" id="submitBtn" class="btn btn-primary">Сохранить</button>
            <a href="{{ route('admin.books.index') }}" class="btn btn-secondary">Назад</a>
        </form>
    </div>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('js/admin/book-edit.js') }}"></script>
@endsection