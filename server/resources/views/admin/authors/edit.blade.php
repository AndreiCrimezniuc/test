@extends('layouts.admin')

@section('title', 'Редактировать автора')

@section('content')
<div class="card">
    <div class="card-header">
        <h2>Редактировать автора</h2>
    </div>
    
    <div class="card-body">
        <form action="{{ route('admin.authors.update', $author) }}" 
              method="POST" 
              enctype="multipart/form-data"
              id="editForm" 
              class="needs-validation" 
              novalidate>
            @csrf
            @method('PUT')
            
            <div class="form-group mb-3">
                <label>Имя</label>
                <input type="text" name="firstname" value="{{ old('firstname', $author->firstname) }}" class="form-control @error('firstname') is-invalid @enderror" required>
                @error('firstname')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Фамилия</label>
                <input type="text" name="lastname" value="{{ old('lastname', $author->lastname) }}" class="form-control @error('lastname') is-invalid @enderror" required>
                @error('lastname')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group mb-3">
                <label>Биография</label>
                <textarea name="biography" class="form-control @error('biography') is-invalid @enderror" required>{{ old('biography', $author->biography) }}</textarea>
                @error('biography')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="form-group mb-3">
                <label>Фото</label>
                @if($author->image)
                    <div class="mb-2">
                        <img src="{{ asset('storage/' . $author->image) }}" alt="Текущее фото" style="height: 100px;">
                    </div>
                @endif
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