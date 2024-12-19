@extends('layouts.admin')

@section('title', 'Редактировать жанр')

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
        <h2>Редактировать жанр</h2>
    </div>
    
    <div class="card-body">
        <form action="{{ route('admin.genres.update', $genre) }}" method="POST" id="editForm" class="needs-validation" novalidate>
            @csrf
            @method('PUT')
            
            <div class="form-group mb-3">
                <label>Название</label>
                <input type="text" name="name" value="{{ old('name', $genre->name) }}" class="form-control @error('name') is-invalid @enderror" required>
                @error('name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <button type="submit" id="submitBtn" class="btn btn-primary">Обновить</button>
        </form>
    </div>
</div>
@endsection 