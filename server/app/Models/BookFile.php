<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookFile extends Model
{
    protected $fillable = [
        'book_id',
        'file_path',
        'file_type',
        'original_name',
        'size'
    ];

    public function book() {
        return $this->belongsTo(Book::class); //у одного класса модель есть родитель
    }
}
