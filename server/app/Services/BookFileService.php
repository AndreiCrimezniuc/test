<?php 
namespace App\Services;

use App\Models\BookFile;

class BookFileService extends BaseService {
    public function __construct(BookFile $model) {
        $this->model = $model;
    }
}