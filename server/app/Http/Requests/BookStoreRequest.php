<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "required|string|max:255",
            "author_id" => "required|exists:authors,id",
            "genre_id" => "required|exists:genres,id",
            "description" => "nullable|string",
            "published_year" => "required|integer|min:1800|max:" . date('Y'),
            "cover_image" => "nullable|image|max:10240",
        ];
    }
}
