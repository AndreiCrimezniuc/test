<?php 
namespace App\Services;

use App\Models\Genre;

class GenreService extends BaseService {
    public function __construct(Genre $model) {
        $this->model = $model;
    }
}