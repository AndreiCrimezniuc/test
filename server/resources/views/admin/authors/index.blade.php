@extends('layouts.admin')

@section('title', 'Управление авторами')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Авторы</h1>
        <a href="{{ route('admin.authors.create') }}" class="btn btn-primary">Добавить автора</a>
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
                    Вы уверены, что хотите удалить этого автора?
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
                        <th>Фото</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Количество книг</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($authors as $author)
                        <tr>
                            <td>{{ $author->id }}</td>
                            <td>
                                @if($author->image)
                                    <img src="{{ asset('storage/' . $author->image) }}" 
                                         alt="Фото автора" 
                                         style="height: 50px;">
                                @endif
                            </td>
                            <td>{{ $author->firstname }}</td>
                            <td>{{ $author->lastname }}</td>
                            <td>{{ $author->books_count }}</td>
                            <td>
                                <div class="btn-group">
                                    <a href="{{ route('admin.authors.edit', $author) }}" 
                                       class="btn btn-sm btn-outline-primary">
                                        Редактировать
                                    </a>
                                    <form action="{{ route('admin.authors.destroy', $author) }}" 
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

            {{ $authors->links() }}
        </div>
    </div>
@endsection 

@section('scripts')
<script>
    
</script>
@endsection 