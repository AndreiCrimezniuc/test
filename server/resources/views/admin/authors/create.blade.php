@extends('layouts.admin')

@section('title', 'Добавить автора')

@section('content')
<div class="card">
    <div class="card-header">
        <h2>Добавить автора</h2>
    </div>
    
    <div class="card-body">
        <form action="{{ route('admin.authors.store') }}" 
              method="POST" 
              enctype="multipart/form-data"
              id="editForm" 
              class="needs-validation" 
              novalidate>
            @csrf
            
            <div class="form-group mb-3">
                <label>Имя</label>
                <input type="text" name="firstname" value="{{ old('firstname') }}" class="form-control @error('firstname') is-invalid @enderror" required>
                @error('firstname')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Фамилия</label>
                <input type="text" name="lastname" value="{{ old('lastname') }}" class="form-control @error('lastname') is-invalid @enderror" required>
                @error('lastname')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group mb-3">
                <label>Биография</label>
                <textarea name="biography" class="form-control @error('biography') is-invalid @enderror" required>{{ old('biography') }}</textarea>
                @error('biography')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Фото</label>
                <input type="file" name="image" class="form-control @error('image') is-invalid @enderror">
                @error('image')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <button type="submit" id="submitBtn" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</div>
@endsection 