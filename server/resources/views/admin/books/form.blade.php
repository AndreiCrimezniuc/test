@extends('layouts.admin')

@section('title', isset($book) ? 'Редактирование книги' : 'Добавление книги')

@section('styles')
<style>
    .preview-image {
        max-width: 200px;
        max-height: 200px;
        margin-top: 10px;
    }
    .file-preview {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .file-preview img {
        width: 50px;
        margin-right: 10px;
    }
</style>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        <h1 class="card-title">{{ isset($book) ? 'Редактирование книги' : 'Добавление книги' }}</h1>

        <form action="{{ isset($book) ? route('admin.books.update', $book) : route('admin.books.store') }}"
              method="POST"
              enctype="multipart/form-data"
              id="bookForm">
            @csrf
            @if(isset($book))
                @method('PUT')
            @endif

            <div class="row">
                <div class="col-md-8">
                    <!-- Основные поля -->
                    <div class="mb-3">
                        <label for="title" class="form-label">Название</label>
                        <input type="text" 
                               class="form-control @error('title') is-invalid @enderror" 
                               id="title" 
                               name="title" 
                               value="{{ old('title', $book->title ?? '') }}"
                               required>
                        @error('title')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Описание</label>
                        <textarea class="form-control @error('description') is-invalid @enderror" 
                                  id="description" 
                                  name="description" 
                                  rows="5">{{ old('description', $book->description ?? '') }}</textarea>
                        @error('description')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="author_id" class="form-label">Автор</label>
                                <select class="form-select @error('author_id') is-invalid @enderror" 
                                        id="author_id" 
                                        name="author_id" 
                                        required>
                                    <option value="">Выберите автора</option>
                                    @foreach($authors as $author)
                                        <option value="{{ $author->id }}" 
                                                {{ old('author_id', $book->author_id ?? '') == $author->id ? 'selected' : '' }}>
                                            {{ $author->firstname }} {{ $author->lastname }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('author_id')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="genre_id" class="form-label">Жанр</label>
                                <select class="form-select @error('genre_id') is-invalid @enderror" 
                                        id="genre_id" 
                                        name="genre_id" 
                                        required>
                                    <option value="">Выберите жанр</option>
                                    @foreach($genres as $genre)
                                        <option value="{{ $genre->id }}" 
                                                {{ old('genre_id', $book->genre_id ?? '') == $genre->id ? 'selected' : '' }}>
                                            {{ $genre->name }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('genre_id')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <!-- Загрузка файлов -->
                    <div class="mb-3">
                        <label for="cover_image" class="form-label">Обложка</label>
                        <input type="file" 
                               class="form-control @error('cover_image') is-invalid @enderror" 
                               id="cover_image" 
                               name="cover_image"
                               accept="image/*"
                               onchange="previewImage(this)">
                        @error('cover_image')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <div id="imagePreview"></div>
                    </div>

                    <div class="mb-3">
                        <label for="book_files" class="form-label">Файлы книги</label>
                        <input type="file" 
                               class="form-control @error('book_files') is-invalid @enderror" 
                               id="book_files" 
                               name="book_files[]"
                               multiple
                               accept=".pdf,.epub,.mobi">
                        @error('book_files')
                            <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                        <div id="uploadProgress" class="progress mt-2" style="display: none;">
                            <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                        </div>
                        <div id="filesList" class="mt-2"></div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ isset($book) ? 'Обновить' : 'Создать' }}
            </button>
        </form>
    </div>
</div>
@endsection

@section('scripts')
<script>
function previewImage(input) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('preview-image');
            preview.appendChild(img);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('book_files').addEventListener('change', function(e) {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    Array.from(this.files).forEach(file => {
        const div = document.createElement('div');
        div.classList.add('file-preview');
        
        const icon = document.createElement('img');
        icon.src = `/images/file-icon-${file.type.split('/')[1]}.png`;
        
        const name = document.createElement('span');
        name.textContent = file.name;
        
        div.appendChild(icon);
        div.appendChild(name);
        filesList.appendChild(div);
    });
});
</script>
@endsection 