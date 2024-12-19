@extends('layouts.admin')

@section('title', 'Панель управления')

@section('content')
<div class="container">
    <h1>Панель управления</h1>
    <div class="row mt-4">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Книги</h5>
                    <p class="card-text">Всего: {{ $stats['books_count'] }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Авторы</h5>
                    <p class="card-text">Всего: {{ $stats['authors_count'] }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Жанры</h5>
                    <p class="card-text">Всего: {{ $stats['genres_count'] }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 