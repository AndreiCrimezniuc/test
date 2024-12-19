<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Author;
use Illuminate\Routing\Controller;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::withCount('books')->latest()->paginate(10);
        return view('admin.authors.index', compact('authors'));
    }

    public function create()
    {
        return view('admin.authors.create');
    }

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
        
        Author::create($validated);
        return redirect()->route('admin.authors.index')->with('success', 'Author created successfully');
    }

    public function edit(Author $author)
    {
        return view('admin.authors.edit', compact('author'));
    }

    public function update(Request $request, Author $author)
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
        
        $author->update($validated);
        return redirect()->route('admin.authors.index')->with('success', 'Author updated successfully');
    }

    public function destroy(Author $author)
    {
        if ($author->books()->exists()) {
            return back()->with('error', 'Cannot delete author with associated books');
        }

        $author->delete();
        return redirect()->route('admin.authors.index')->with('success', 'Author deleted successfully');
    }
} 