@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Профиль пользователя</h4>
                    <button class="btn btn-primary" id="editButton">Редактировать</button>
                </div>

                <div class="card-body">
                    @if(session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    @if(session('error'))
                        <div class="alert alert-danger">
                            {{ session('error') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('profile.update') }}" enctype="multipart/form-data" id="profileForm">
                        @csrf
                        @method('PUT')

                        <div class="text-center mb-4">
                            <div class="avatar-upload">
                                <div class="avatar-preview rounded-circle mx-auto" style="width: 200px; height: 200px; overflow: hidden;">
                                    <img id="imagePreview" src="{{ $user->avatar_url ?? asset('storage/public/users/images/default-avatar.png') }}"
                                         class="w-100 h-100 object-fit-cover">
                                </div>
                                <label for="avatar" class="btn btn-secondary mt-2 d-none edit-only">Изменить фото</label>
                                <input type="file"
                                       id="avatar"
                                       name="avatar"
                                       class="form-control d-none @error('avatar') is-invalid @enderror"
                                       accept="image/*"
                                       disabled>
                                @error('avatar')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="firstname" class="form-label">Имя</label>
                            <input type="text"
                                   class="form-control @error('firstname') is-invalid @enderror"
                                   name="firstname"
                                   value="{{ $user->firstname }}"
                                   disabled>
                            @error('firstname')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="lastname" class="form-label">Фамилия</label>
                            <input type="text"
                                   class="form-control @error('lastname') is-invalid @enderror"
                                   name="lastname"
                                   value="{{ $user->lastname }}"
                                   disabled>
                            @error('lastname')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email"
                                   class="form-control @error('email') is-invalid @enderror"
                                   name="email"
                                   value="{{ $user->email }}"
                                   disabled>
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="text-center d-none" id="saveButtons">
                            <button type="submit" class="btn btn-success">Сохранить изменения</button>
                            <button type="button" class="btn btn-secondary" id="cancelButton">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileForm');
    const editButton = document.getElementById('editButton');
    const cancelButton = document.getElementById('cancelButton');
    const saveButtons = document.getElementById('saveButtons');
    const inputs = form.querySelectorAll('input:not([type="hidden"])');
    const editOnlyElements = document.querySelectorAll('.edit-only');

    editButton.addEventListener('click', function() {
        inputs.forEach(input => input.disabled = false);
        editButton.style.display = 'none';
        saveButtons.classList.remove('d-none');
        editOnlyElements.forEach(el => el.classList.remove('d-none'));
    });

    cancelButton.addEventListener('click', function() {
        form.reset();
        inputs.forEach(input => input.disabled = true);
        editButton.style.display = 'block';
        saveButtons.classList.add('d-none');
        editOnlyElements.forEach(el => el.classList.add('d-none'));
        // Восстанавливаем оригинальное изображение
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = imagePreview.getAttribute('data-original-src') || '{{ asset("images/default-avatar.png") }}';
    });

    // Предпросмотр аватара
    const avatarInput = document.getElementById('avatar');
    const imagePreview = document.getElementById('imagePreview');
    // Сохраняем оригинальный src
    imagePreview.setAttribute('data-original-src', imagePreview.src);

    avatarInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append('_method', 'PUT'); // Добавляем метод PUT явно

        fetch(form.action, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            }
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Произошла ошибка при сохранении');
            }
            return data;
        })
        .then(data => {
            // Показываем сообщение об успехе
            const alert = document.createElement('div');
            alert.className = 'alert alert-success';
            alert.textContent = data.message;
            form.insertBefore(alert, form.firstChild);

            // Обновляем данные в форме
            if (data.data && data.data.user) {
                const user = data.data.user;
                form.querySelector('[name="firstname"]').value = user.firstname;
                form.querySelector('[name="lastname"]').value = user.lastname;
                form.querySelector('[name="email"]').value = user.email;

                // Обновляем аватар в шапке
                const headerAvatar = document.querySelector('.navbar img');
                if (headerAvatar && user.avatar_url) {
                    headerAvatar.src = user.avatar_url;
                }

                // Обновляем аватар в профиле
                const profileAvatar = document.getElementById('imagePreview');
                if (profileAvatar && user.avatar_url) {
                    profileAvatar.src = user.avatar_url;
                    profileAvatar.setAttribute('data-original-src', user.avatar_url);
                }
            }

            // Возвращаем форму в режим просмотра
            inputs.forEach(input => input.disabled = true);
            editButton.style.display = 'block';
            saveButtons.classList.add('d-none');
            editOnlyElements.forEach(el => el.classList.add('d-none'));

            // Удаляем сообщение через 3 секунды
            setTimeout(() => alert.remove(), 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.textContent = error.message || 'Произошла ошибка при сохранении данных';
            form.insertBefore(alert, form.firstChild);
            setTimeout(() => alert.remove(), 3000);
        });
    });
});
</script>
@endpush
@endsection
