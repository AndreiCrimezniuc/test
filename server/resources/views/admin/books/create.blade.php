@extends('layouts.admin')

@section('title', 'Добавить книгу')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h2>Добавить книгу</h2>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.books.store') }}" method="POST" enctype="multipart/form-data" id="editForm" class="needs-validation" novalidate>
                        @csrf
                        <div class="mb-3">
                            <label for="title" class="form-label">Название</label>
                            <input type="text" 
                                   class="form-control @error('title') is-invalid @enderror" 
                                   id="title" 
                                   name="title" 
                                   value="{{ old('title') }}" 
                                   required>
                            @error('title')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="author_id" class="form-label">Автор</label>
                            <select class="form-select @error('author_id') is-invalid @enderror" 
                                    id="author_id" 
                                    name="author_id" 
                                    required>
                                <option value="">Выберите автора</option>
                                @foreach($authors as $author)
                                    <option value="{{ $author->id }}" {{ old('author_id') == $author->id ? 'selected' : '' }}>
                                        {{ $author->firstname }} {{ $author->lastname }}
                                    </option>
                                @endforeach
                            </select>
                            @error('author_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="genre_id" class="form-label">Жанр</label>
                            <select class="form-select @error('genre_id') is-invalid @enderror" 
                                    id="genre_id" 
                                    name="genre_id" 
                                    required>
                                <option value="">Выберите жанр</option>
                                @foreach($genres as $genre)
                                    <option value="{{ $genre->id }}" {{ old('genre_id') == $genre->id ? 'selected' : '' }}>
                                        {{ $genre->name }}
                                    </option>
                                @endforeach
                            </select>
                            @error('genre_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Описание</label>
                            <textarea class="form-control @error('description') is-invalid @enderror" 
                                      id="description" 
                                      name="description" 
                                      rows="3">{{ old('description') }}</textarea>
                            @error('description')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="published_year" class="form-label">Год публикации</label>
                            <input type="number" 
                                   class="form-control @error('published_year') is-invalid @enderror" 
                                   id="published_year" 
                                   name="published_year" 
                                   value="{{ old('published_year') ?? date('Y') }}"
                                   min="1800"
                                   max="{{ date('Y') }}"
                                   required>
                            @error('published_year')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="cover_image" class="form-label">Обложка</label>
                            <input type="file" 
                                   class="form-control @error('cover_image') is-invalid @enderror" 
                                   id="cover_image" 
                                   name="cover_image">
                            @error('cover_image')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <button type="submit" id="submitBtn" class="btn btn-primary">Сохранить</button>
                        <a href="{{ route('admin.books.index') }}" class="btn btn-secondary">Отмена</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 