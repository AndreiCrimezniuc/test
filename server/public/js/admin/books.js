// Обработка выбора всех элементов
document.getElementById('selectAll')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('input[name="selected[]"]');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    updateBulkActionButton();
});

// Автоматическая отправка формы при изменении фильтров
document.querySelectorAll('#filterForm select').forEach(select => {
    select.addEventListener('change', () => document.getElementById('filterForm').submit());
});

// Обработка массовых действий
document.getElementById('bulkActionBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('booksForm');
    const action = document.getElementById('bulkAction').value;
    const selected = document.querySelectorAll('input[name="selected[]"]:checked');
    
    if (selected.length === 0) {
        alert('Выберите хотя бы одну книгу');
        return;
    }

    if (!action) {
        alert('Выберите дейс��вие');
        return;
    }

    // Устанавливаем выбранное действие
    document.getElementById('selectedAction').value = action;
    
    switch (action) {
        case 'delete':
            if (confirm('Вы уверены, что хотите удалить выбранные книги?')) {
                form.submit();
            }
            break;
            
        case 'change_genre':
            const genreModal = new bootstrap.Modal(document.getElementById('changeGenreModal'));
            genreModal.show();
            break;
    }
});

// Подтверждение изменения жанра
document.getElementById('confirmGenreChange')?.addEventListener('click', function() {
    const genreId = document.getElementById('bulk_genre_id').value;
    if (!genreId) {
        alert('Выберите жанр');
        return;
    }
    document.getElementById('selectedGenreId').value = genreId;
    document.getElementById('booksForm').submit();
});

// Обновление кнопки массовых действий
function updateBulkActionButton() {
    const selected = document.querySelectorAll('input[name="selected[]"]:checked').length;
    const btn = document.getElementById('bulkActionBtn');
    if (btn) {
        btn.disabled = selected === 0;
        btn.textContent = selected === 0 ? 'Выберите книги' : `Применить (${selected})`;
    }
}

// Обработчики для отдельных чекбоксов
document.querySelectorAll('input[name="selected[]"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateBulkActionButton);
});

// Обработка удаления отдельной книги
document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
            this.submit();
        }
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateBulkActionButton();
}); 