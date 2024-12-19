<?php 
namespace App\Services;

use App\Models\Author;

class AuthorService extends BaseService {
    public function __construct(Author $model) {
        $this->model = $model;
    }
}