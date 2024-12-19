<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Genre;
use Illuminate\Routing\Controller;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::withCount('books')->latest()->paginate(10);
        return view('admin.genres.index', compact('genres'));
    }

    public function create()
    {
        return view('admin.genres.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
            'description' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        Genre::create($validated);
        return redirect()->route('admin.genres.index')->with('success', 'Genre created successfully');
    }

    public function edit(Genre $genre)
    {
        return view('admin.genres.edit', compact('genre'));
    }

    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $genre->update($validated);
        return redirect()->route('admin.genres.index')->with('success', 'Genre updated successfully');
    }

    public function destroy(Genre $genre)
    {
        if ($genre->books()->exists()) {
            return back()->with('error', 'Cannot delete genre with associated books');
        }

        $genre->delete();
        return redirect()->route('admin.genres.index')->with('success', 'Genre deleted successfully');
    }
} 