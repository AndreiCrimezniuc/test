@extends('layouts.admin')

@section('title', isset($author) ? 'Редактирование автора' : 'Добавление автора')

@section('content')
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                {{ isset($author) ? 'Редактирование автора' : 'Добавление автора' }}
            </h1>

            <form action="{{ isset($author) ? route('admin.authors.update', $author) : route('admin.authors.store') }}"
                  method="POST"
                  enctype="multipart/form-data">
                @csrf
                @if(isset($author))
                    @method('PUT')
                @endif

                <div class="mb-3">
                    <label for="firstname" class="form-label">Имя</label>
                    <input type="text" 
                           class="form-control @error('firstname') is-invalid @enderror" 
                           id="firstname" 
                           name="firstname" 
                           value="{{ old('firstname', $author->firstname ?? '') }}"
                           required>
                    @error('firstname')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="lastname" class="form-label">Фамилия</label>
                    <input type="text" 
                           class="form-control @error('lastname') is-invalid @enderror" 
                           id="lastname" 
                           name="lastname" 
                           value="{{ old('lastname', $author->lastname ?? '') }}"
                           required>
                    @error('lastname')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="bio" class="form-label">Биография</label>
                    <textarea class="form-control @error('bio') is-invalid @enderror" 
                              id="bio" 
                              name="bio" 
                              rows="5">{{ old('bio', $author->bio ?? '') }}</textarea>
                    @error('bio')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label">Фото</label>
                    <input type="file" 
                           class="form-control @error('image') is-invalid @enderror" 
                           id="image" 
                           name="image"
                           accept="image/*">
                    @error('image')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                @if(isset($author) && $author->image)
                    <div class="mb-3">
                        <img src="{{ asset('storage/' . $author->image) }}" 
                             alt="Текущее фото"
                             style="max-height: 200px;">
                    </div>
                @endif

                <button type="submit" class="btn btn-primary">
                    {{ isset($author) ? 'Обновить' : 'Создать' }}
                </button>
            </form>
        </div>
    </div>
@endsection 