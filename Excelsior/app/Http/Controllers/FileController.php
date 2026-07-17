<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {   
        if ($request->file('file')) {
            $file = $request->file('file');
            $path = $file -> store('uploads', 'public');
            $fileArray = File::create([
                'name' => $file -> getClientOriginalName(),
                'type' => $file -> getClientMimeType(),
                'size' => $file -> getSize(),
                'path' => $path,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'upload successful',
                'file' => $fileArray, 
                'url' => asset('storage/' . $path)
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
