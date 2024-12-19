<?php 
namespace App\Services;

use App\Models\Book;

class BookService extends BaseService {
    public function __construct(Book $model) {
        $this->model = $model;
    }
}