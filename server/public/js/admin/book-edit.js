// Обработка удаления файла
document.getElementById('confirmDelete')?.addEventListener('click', function() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const bookId = document.getElementById('bookId').value;
    
    // Отправляем запрос на удаление файла
    fetch(`/admin/books/${bookId}/remove-file`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Перезагружаем страницу после успешного удаления
            window.location.reload();
        } else {
            alert('Произошла ошибка при удалении файла');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при удалении файла');
    });
    
    // Закрываем модальное окно
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    modal.hide();
}); 