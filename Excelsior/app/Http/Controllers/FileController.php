<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;

use Illuminate\Http\Request;
use Spatie\PdfToImage\Pdf;
use Illuminate\Support\Facades\Storage;


class FileController extends Controller
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
        if ($request->file('file')) {
            $file = $request->file('file');
            $extension = strtolower($file->getClientOriginalExtension());
            $path = $file->store('uploads', 'public');
            $thumbnailPath = $path;

            if ($extension === 'pdf') {
                $thumbnailFilename = 'uploads/thumb_' . uniqid() . '.jpg';

                // Use Laravel's disk path resolver for clean Windows paths
                $pdfFullPath = Storage::disk('public')->path($path);
                $thumbFullPath = Storage::disk('public')->path($thumbnailFilename);

                $pdf = new Pdf($pdfFullPath);
                $pdf->save($thumbFullPath);

                $thumbnailPath = $thumbnailFilename;
            }

            $fileArray = File::create([
                'name' => $file->getClientOriginalName(),
                'type' => $file->getClientMimeType(),
                'size' => $file->getSize(),
                'path' => $path,
                'thumbnail_path' => $thumbnailPath,
            ]);

            $project->update([
                'file_id' => $fileArray->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'upload successful',
                'file' => $fileArray, 
                'url' => asset('storage/' . $thumbnailPath)
            ], 201);
        }

        return response()->json(['error' => 'file not provided'], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
