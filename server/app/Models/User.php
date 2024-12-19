<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @method bool isSuperAdmin()
 * @method bool canEdit($model)
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
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
        'is_admin',
        'is_super_admin',
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
        'is_admin' => 'boolean',
        'is_super_admin' => 'boolean',
    ];

    // Отношения с книгами (книги, созданные пользователем)
    public function books()
    {
        return $this->hasMany(Book::class, 'created_by');
    }

    // Проверка является ли пользователь супер-админом
    public function isSuperAdmin(): bool
    {
        return $this->is_super_admin;
    }

    public function getNameAttribute(): string
    {
        return "{$this->firstname} {$this->lastname}";
    }
    
    // Проверка может ли пользователь редактировать запись
    public function canEdit($model): bool
    {
        return $this->is_admin || $this->is_super_admin;
    }

    public function isAdmin(): bool
    {
        return $this->is_admin || $this->is_super_admin;
    }
}
