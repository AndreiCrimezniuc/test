@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Регистрация') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register.post') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="mb-3 text-center">
                            <div class="avatar-upload">
                                <div class="avatar-preview rounded-circle mx-auto" style="width: 150px; height: 150px; overflow: hidden;">
                                    <img id="imagePreview" src="{{ asset('images/default-avatar.png') }}" class="w-100 h-100 object-fit-cover">
                                </div>
                                <label for="avatar" class="btn btn-secondary mt-2">Выберите фото</label>
                                <input type="file" 
                                       id="avatar"
                                       name="avatar" 
                                       class="form-control d-none @error('avatar') is-invalid @enderror" 
                                       accept="image/*">
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
                                   value="{{ old('firstname') }}" 
                                   required>
                            @error('firstname')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="lastname" class="form-label">Фамилия</label>
                            <input type="text" 
                                   class="form-control @error('lastname') is-invalid @enderror" 
                                   name="lastname" 
                                   value="{{ old('lastname') }}" 
                                   required>
                            @error('lastname')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" 
                                   class="form-control @error('email') is-invalid @enderror" 
                                   name="email" 
                                   value="{{ old('email') }}" 
                                   required>
                            @error('email')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Пароль</label>
                            <input type="password" 
                                   class="form-control @error('password') is-invalid @enderror" 
                                   name="password" 
                                   required>
                            @error('password')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="password_confirmation" class="form-label">Подтверждение пароля</label>
                            <input type="password" 
                                   class="form-control"
                                   name="password_confirmation" 
                                   required>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            {{ __('Зарегистрироваться') }}
                        </button>
                    </form>
                </div>
                <div class="card-footer text-center">
                    <p class="mb-0">
                        Уже есть аккаунт? <a href="{{ route('login') }}">Войти</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 