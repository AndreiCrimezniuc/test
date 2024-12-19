<?php

namespace App\Http\Controllers\Admin;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GenreController extends BaseAdminController
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
            'description' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $genre = Genre::create($validated);
        return $this->successResponse($genre, 'Genre created successfully', 201);
    }

    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $genre->update($validated);
        return $this->successResponse($genre, 'Genre updated successfully');
    }

    public function destroy(Genre $genre)
    {
        if ($genre->books()->exists()) {
            return $this->errorResponse('Cannot delete genre with associated books', 422);
        }

        $genre->delete();
        return $this->successResponse(null, 'Genre deleted successfully');
    }
} 