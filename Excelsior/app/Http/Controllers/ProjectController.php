<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('dashboard', [
            'Projects' => Project::query()->get()
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
            'description' => '',
        ]);

        return redirect('/dashboard');


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
