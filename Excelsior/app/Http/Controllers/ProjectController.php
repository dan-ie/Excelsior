<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::where('is_public', true)
            ->orWhere('user_id', Auth::id())
            ->with(['user:id,name', 'file']) // include creator info
            ->latest()
            ->get()
            ->map(function ($project) {
                if ($project->file) {
                    $path = $project->file->thumbnail_path ?: $project->file->path;
                    $project->image_url = asset('storage/' . $path);
                } else {
                    $project->image_url = null;
                }
                return $project;
            });

        return Inertia::render('dashboard', [
            'Projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {



    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $count = Project::count() + 1;

        $project = Project::create([
            'name' => "Untitled project {$count}",
            'description' => 'Enter description here',
            'user_id' => Auth::id(),
            'is_public' => $request->input('is_public', false),
        ]);
        $project->load('fields');

        return Inertia::render('Project/index', [
                'project' => $project
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, $id)
    {
            $project = Project::with('fields')->findOrFail($id);
                return Inertia::render('Project/index', [
                'project' => $project
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'is_public' => 'boolean'
            ]);

            $project->update($validated);

            return response()->json([
                'message' => 'Project updated successfully.',
            ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
       $project -> delete ();
       return response()->json([
                'success'=> true]);
    }

}
