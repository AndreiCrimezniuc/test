<?php

namespace App\Http\Controllers\Admin;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthorController extends BaseAdminController
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'biography' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('authors/images', 'public');
        }

        $validated['slug'] = Str::slug($validated['firstname'] . ' ' . $validated['lastname']);
        
        $author = Author::create($validated);
        return $this->successResponse($author, 'Author created successfully', 201);
    }

    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'firstname' => 'sometimes|required|string|max:255',
            'lastname' => 'sometimes|required|string|max:255',
            'biography' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('authors/images', 'public');
        }

        if (isset($validated['firstname']) || isset($validated['lastname'])) {
            $firstname = $validated['firstname'] ?? $author->firstname;
            $lastname = $validated['lastname'] ?? $author->lastname;
            $validated['slug'] = Str::slug($firstname . ' ' . $lastname);
        }
        
        $author->update($validated);
        return $this->successResponse($author, 'Author updated successfully');
    }

    public function destroy(Author $author)
    {
        if ($author->books()->exists()) {
            return $this->errorResponse('Cannot delete author with associated books', 422);
        }

        $author->delete();
        return $this->successResponse(null, 'Author deleted successfully');
    }
} 