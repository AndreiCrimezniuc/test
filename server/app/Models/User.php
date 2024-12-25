<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Отношения с книгами
    public function books()
    {
        return $this->hasMany(Book::class, 'created_by');
    }

    public function getNameAttribute(): string
    {
        return "{$this->firstname} {$this->lastname}";
    }

    // Метод для обратной совместимости
    public function isAdmin(): bool
    {
        return true; // Все пользователи теперь имеют права админа
    }

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return Storage::url('users/images/' . $this->avatar);
        }
        return null;
    }
}
