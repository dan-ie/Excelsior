<?php

namespace App\Http\Controllers;

use App\Models\templateField;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TemplateFieldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {

    //     $data = $request->all();

    //    $project->fields()->createMany($data);
foreach ($request->all() as $field) {
    $project->fields()->updateOrCreate(
            [
                'id' => $field['id'],
            ],
            [
                'name' => $field['name'],
                'x' => $field['x'],
                'y' => $field['y'],
                'width' => $field['width'],
                'height' => $field['height'],
                'settings' => $field['settings'] ?? null,
            ]
        );
    }
        $project->load('fields');

        return response()->json([
            'fields' => $project->fields,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(templateField $templateField)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(templateField $templateField)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, templateField $templateField)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(templateField $templateField)
    {
        //
    }
}
