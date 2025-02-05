<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'biography',
        'image',
        'slug'
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
