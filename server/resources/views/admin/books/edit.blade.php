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
            
            <div class="form-group">
                <label>Жанр</label>
                <select name="genre_id" class="form-control">
                    @foreach($genres as $genre)
                        <option value="{{ $genre->id }}" {{ $book->genre_id == $genre->id ? 'selected' : '' }}>
                            {{ $genre->name }}
                        </option>
                    @endforeach
                </select>
            </div>
            
            <div class="form-group">
                <label>Описание</label>
                <textarea name="description" class="form-control">{{ old('description', $book->description) }}</textarea>
            </div>
            
            <div class="form-group">
                <label>Год издания</label>
                <input type="number" name="published_year" value="{{ old('published_year', $book->published_year) }}" class="form-control">
            </div>
            
            <div class="form-group">
                <label>Обложка</label>
                @if($book->cover_image)
                    <img src="{{ asset('storage/' . $book->cover_image) }}" width="100">
                @endif
                <input type="file" name="cover_image" class="form-control">
            </div>
            
            <div class="form-group mb-4">
                <label>Файлы книги</label>
                @if($book->files->count() > 0)
                    <div class="list-group mb-3">
                        @foreach($book->files as $file)
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <span>{{ $file->original_name }}</span>
                                <div>
                                    <a href="{{ asset('storage/' . $file->file_path) }}" 
                                       class="btn btn-sm btn-info" 
                                       target="_blank">
                                        Скачать
                                    </a>
                                    <form action="{{ route('admin.books.files.destroy', $file) }}" 
                                          method="POST" 
                                          class="delete-file-form" 
                                          data-bs-toggle="modal" 
                                          data-bs-target="#confirmModal">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" 
                                                class="btn btn-sm btn-danger">
                                            Удалить
                                        </button>
                                    </form>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <p class="text-muted">Нет загруженных файлов</p>
                @endif
                
                <div class="mt-3">
                    <label>Добавить новые файлы</label>
                    <input type="file" name="new_files[]" multiple class="form-control">
                    <small class="text-muted">Поддерживаемые форматы: PDF, EPUB, MOBI, FB2, TXT. Максимальный размер каждого файла: 10MB</small>
                </div>
            </div>
            
            <button type="submit" id="submitBtn" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</div>
@endsection 