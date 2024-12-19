@extends('layouts.admin')

@section('title', isset($genre) ? 'Редактирование жанра' : 'Добавление жанра')

@section('content')
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">
                {{ isset($genre) ? 'Редактирование жанра' : 'Добавление жанра' }}
            </h1>

            <form action="{{ isset($genre) ? route('admin.genres.update', $genre) : route('admin.genres.store') }}"
                  method="POST">
                @csrf
                @if(isset($genre))
                    @method('PUT')
                @endif

                <div class="form-group mb-3">
                    <label>Название</label>
                    <input type="text" 
                           name="name" 
                           value="{{ old('name', $genre->name ?? '') }}" 
                           class="form-control @error('name') is-invalid @enderror" 
                           required>
                    @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <button type="submit" id="submitBtn" class="btn btn-primary">
                    {{ isset($genre) ? 'Обновить' : 'Создать' }}
                </button>
            </form>
        </div>
    </div>
@endsection 