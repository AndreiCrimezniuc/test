@extends('layouts.admin')

@section('title', 'Управление книгами')

@section('content')
    <div class="card mb-4">
        <div class="card-body">
            <form action="{{ route('admin.books.index') }}" method="GET" id="filterForm">
                <div class="row">
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="search" class="form-label">Поиск</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="search" 
                                   name="search" 
                                   value="{{ request('search') }}"
                                   placeholder="Название или автор">
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="author_id" class="form-label">Автор</label>
                            <select class="form-select" id="author_id" name="author_id">
                                <option value="">Все авторы</option>
                                @foreach($authors as $author)
                                    <option value="{{ $author->id }}" 
                                            {{ request('author_id') == $author->id ? 'selected' : '' }}>
                                        {{ $author->firstname }} {{ $author->lastname }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="genre_id" class="form-label">Жанр</label>
                            <select class="form-select" id="genre_id" name="genre_id">
                                <option value="">Все жанры</option>
                                @foreach($genres as $genre)
                                    <option value="{{ $genre->id }}" 
                                            {{ request('genre_id') == $genre->id ? 'selected' : '' }}>
                                        {{ $genre->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label for="sort" class="form-label">Сортировка</label>
                            <select class="form-select" id="sort" name="sort">
                                <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>
                                    Сначала новые
                                </option>
                                <option value="oldest" {{ request('sort') == 'oldest' ? 'selected' : '' }}>
                                    Сначала старые
                                </option>
                                <option value="title_asc" {{ request('sort') == 'title_asc' ? 'selected' : '' }}>
                                    По названию (А-Я)
                                </option>
                                <option value="title_desc" {{ request('sort') == 'title_desc' ? 'selected' : '' }}>
                                    По названию (Я-А)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary">Применить фильтры</button>
                        <a href="{{ route('admin.books.index') }}" class="btn btn-outline-secondary">Сбросить</a>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <form id="booksForm" action="{{ route('admin.books.bulk-action') }}" method="POST">
                @csrf
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1>Книги</h1>
                    <div>
                        <select class="form-select d-inline-block w-auto me-2" name="action">
                            <option value="">Выберите действие</option>
                            <option value="delete">Удалить выбранные</option>
                            <option value="change_genre">Изменить жанр</option>
                        </select>
                        <button type="submit" class="btn btn-secondary" id="bulkActionBtn">
                            Применить
                        </button>
                        <a href="{{ route('admin.books.create') }}" class="btn btn-primary">
                            Добавить книгу
                        </a>
                    </div>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="selectAll">
                            </th>
                            <th>ID</th>
                            <th>Обложка</th>
                            <th>Название</th>
                            <th>Автор</th>
                            <th>Жанр</th>
                            <th>Год</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($books as $book)
                            <tr>
                                <td>
                                    <input type="checkbox" name="selected[]" value="{{ $book->id }}">
                                </td>
                                <td>{{ $book->id }}</td>
                                <td>
                                    @if($book->cover_image)
                                        <img src="{{ asset('storage/' . $book->cover_image) }}" 
                                             alt="Обложка" 
                                             style="height: 50px;">
                                    @endif
                                </td>
                                <td>{{ $book->title }}</td>
                                <td>{{ $book->author->firstname }} {{ $book->author->lastname }}</td>
                                <td>{{ $book->genre->name }}</td>
                                <td>{{ $book->published_year }}</td>
                                <td>
                                    <div class="btn-group">
                                        <a href="{{ route('admin.books.edit', $book) }}" 
                                           class="btn btn-sm btn-outline-primary">
                                            Редактировать
                                        </a>
                                        <form action="{{ route('admin.books.destroy', $book) }}" 
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
            </form>

            {{ $books->links() }}
        </div>
    </div>

    <!-- Модальное окно для изменения жанра -->
    <div class="modal fade" id="changeGenreModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Изменить жанр</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="bulk_genre_id" class="form-label">Выберите новый жанр</label>
                        <select class="form-select" id="bulk_genre_id" name="genre_id">
                            @foreach($genres as $genre)
                                <option value="{{ $genre->id }}">{{ $genre->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary" onclick="submitBulkAction()">Применить</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Модальное окно подтверждения массового удаления -->
    <div class="modal fade" id="bulkDeleteModal" tabindex="-1" aria-labelledby="bulkDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="bulkDeleteModalLabel">Подтверждение удаления</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы уверены, что хотите удалить выбранные книги?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" id="confirmBulkDelete">Удалить</button>
                </div>
            </div>
        </div>
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
                    Вы уверены, что хотите удалить эту книгу?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" id="confirmDelete">Удалить</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
<script>
document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('input[name="selected[]"]');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

// Автоматическая отправка формы при изменении фильтров
document.querySelectorAll('#filterForm select').forEach(select => {
    select.addEventListener('change', () => document.getElementById('filterForm').submit());
});

function deleteBook(id) {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/admin/books/${id}`;
        form.innerHTML = `
            @csrf
            @method('DELETE')
        `;
        document.body.appendChild(form);
        form.submit();
    }
}

// Обработка массовых действий
document.getElementById('bulkActionBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const action = document.querySelector('select[name="action"]').value;
    const selected = document.querySelectorAll('input[name="selected[]"]:checked');
    
    if (selected.length === 0) {
        alert('Выберите хотя бы одну книгу');
        return;
    }
    
    switch (action) {
        case 'delete':
            const bulkDeleteModal = new bootstrap.Modal(document.getElementById('bulkDeleteModal'));
            bulkDeleteModal.show();
            break;
            
        case 'change_genre':
            const genreModal = new bootstrap.Modal(document.getElementById('changeGenreModal'));
            genreModal.show();
            break;
            
        default:
            alert('Выберите действие');
    }
});

// Подтверждение массового удаления
document.getElementById('confirmBulkDelete').addEventListener('click', function() {
    const form = document.getElementById('booksForm');
    const actionInput = document.createElement('input');
    actionInput.type = 'hidden';
    actionInput.name = 'action';
    actionInput.value = 'delete';
    form.appendChild(actionInput);
    form.submit();
});

// Подтверждение изменения жанра
function submitBulkAction() {
    const form = document.getElementById('booksForm');
    const genreId = document.getElementById('bulk_genre_id').value;
    const actionInput = document.createElement('input');
    const genreInput = document.createElement('input');
    
    actionInput.type = 'hidden';
    actionInput.name = 'action';
    actionInput.value = 'change_genre';
    
    genreInput.type = 'hidden';
    genreInput.name = 'genre_id';
    genreInput.value = genreId;
    
    form.appendChild(actionInput);
    form.appendChild(genreInput);
    form.submit();
}

// Проверка выбранных элементов
document.querySelectorAll('input[name="selected[]"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateBulkActionButton);
});

function updateBulkActionButton() {
    const selected = document.querySelectorAll('input[name="selected[]"]:checked').length;
    const btn = document.getElementById('bulkActionBtn');
    btn.disabled = selected === 0;
    btn.textContent = `Применить (${selected})`;
}

// Обработчик для кнопки "Выбрать все"
document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('input[name="selected[]"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
    updateBulkActionButton();
});

let formToSubmit = null;

// Перехватываем отправку формы удаления
document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formToSubmit = this;
    });
});

// Обработчик подтверждения удаления
document.getElementById('confirmDelete').addEventListener('click', function() {
    if (formToSubmit) {
        formToSubmit.submit();
    }
    var modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    modal.hide();
});
</script>
@endsection 