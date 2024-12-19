@extends('layouts.admin')

@section('title', 'Управление жанрами')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Жанры</h1>
        <a href="{{ route('admin.genres.create') }}" class="btn btn-primary">Добавить жанр</a>
    </div>

    <!-- Модальное окно подтверждения -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalLabel">Подтверждение действия</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы уверены, что хотите удалить этот жанр?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" id="confirmDelete">Удалить</button>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Slug</th>
                        <th>Количество книг</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($genres as $genre)
                        <tr>
                            <td>{{ $genre->id }}</td>
                            <td>{{ $genre->name }}</td>
                            <td>{{ $genre->slug }}</td>
                            <td>{{ $genre->books_count }}</td>
                            <td>
                                <div class="btn-group">
                                    <a href="{{ route('admin.genres.edit', $genre) }}" 
                                       class="btn btn-sm btn-outline-primary">
                                        Редактировать
                                    </a>
                                    <form action="{{ route('admin.genres.destroy', $genre) }}" 
                                          method="POST" 
                                          class="delete-form"
                                          data-bs-toggle="modal" 
                                          data-bs-target="#confirmModal">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" 
                                                class="btn btn-sm btn-outline-danger">
                                            Удалить
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            {{ $genres->links() }}
        </div>
    </div>
@endsection 