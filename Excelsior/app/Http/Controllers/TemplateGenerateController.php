<?php

namespace App\Http\Controllers;

use App\Services\Renderers\RendererManager;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Jobs\RenderProjectJob;


class TemplateGenerateController extends Controller
{
    public function __construct(
        private RendererManager $rendererManager
    ) {}

    public function render(Request $request, Project $project)
    {
         $validated = $request->validate([
            'file' => ['required', 'file'],
            'mapping' => ['required'],
            'recipientColumn' => ['required']

        ]);

        $mapping = json_decode($validated['mapping'], true);
        RenderProjectJob::dispatch(
        $project,
        $request->file('file')->store('imports'),
        $mapping,
        $validated['recipientColumn']
    );

    return response()->json([
        'message' => 'Rendering started'
    ]);
    }
}
