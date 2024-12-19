@extends('layouts.admin')

@section('title', 'Загрузка файлов книги')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Загрузка файлов для книги "{{ $book->title }}"</h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.books.upload-files', $book) }}" 
                          method="POST" 
                          enctype="multipart/form-data"
                          id="editForm" 
                          class="needs-validation" 
                          novalidate>
                        @csrf
                        
                        <div class="form-group mb-3">
                            <label>Файлы книги</label>
                            <input type="file" name="files[]" multiple class="form-control" required>
                        </div>
                        
                        <button type="submit" id="submitBtn" class="btn btn-primary">Загрузить</button>
                        <a href="{{ route('admin.books.index') }}" class="btn btn-secondary">Отмена</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 