class AdminUtils {
    constructor() {
        this.formToSubmit = null;
        this.initializeDeleteForms();
        this.initializeEditForms();
        this.initializeBulkActions();
    }

    initializeDeleteForms() {
        // Для обычных форм удаления
        document.querySelectorAll('.delete-form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleDeleteSubmit(e));
        });

        // Для форм удаления файлов
        document.querySelectorAll('.delete-file-form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleDeleteSubmit(e));
        });

        // Обработчик подтверждения удаления
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => this.handleConfirmDelete());
        }
    }

    initializeEditForms() {
        const editForm = document.getElementById('editForm');
        if (editForm) {
            editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
        }
    }

    initializeBulkActions() {
        const bulkActionBtn = document.getElementById('bulkActionBtn');
        if (bulkActionBtn) {
            bulkActionBtn.addEventListener('click', (e) => this.handleBulkAction(e));
        }

        const confirmBulkDelete = document.getElementById('confirmBulkDelete');
        if (confirmBulkDelete) {
            confirmBulkDelete.addEventListener('click', () => this.submitBulkForm('delete'));
        }
    }

    handleDeleteSubmit(e) {
        e.preventDefault();
        this.formToSubmit = e.target;
        // Модальное окно откроется автоматически благодаря data-атрибутам
    }

    handleConfirmDelete() {
        if (this.formToSubmit) {
            this.formToSubmit.submit();
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
        if (modal) {
            modal.hide();
        }
    }

    handleEditSubmit(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        e.target.submit();
    }

    handleBulkAction(e) {
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
    }

    submitBulkForm(action) {
        const form = document.getElementById('booksForm');
        const actionInput = document.createElement('input');
        actionInput.type = 'hidden';
        actionInput.name = 'action';
        actionInput.value = action;
        form.appendChild(actionInput);
        form.submit();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new AdminUtils();
}); 