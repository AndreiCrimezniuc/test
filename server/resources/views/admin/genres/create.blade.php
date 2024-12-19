@extends('layouts.admin')

@section('title', 'Добавить жанр')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Добавить жанр</h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.genres.store') }}" 
                          method="POST"
                          id="editForm" 
                          class="needs-validation" 
                          novalidate>
                        @csrf
                        <div class="mb-3">
                            <label for="name" class="form-label">Название</label>
                            <input type="text" 
                                   class="form-control @error('name') is-invalid @enderror" 
                                   id="name" 
                                   name="name" 
                                   value="{{ old('name') }}" 
                                   required>
                            @error('name')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <button type="submit" id="submitBtn" class="btn btn-primary">Создать</button>
                        <a href="{{ route('admin.genres.index') }}" class="btn btn-secondary">Отмена</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 