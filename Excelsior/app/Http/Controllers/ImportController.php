<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImportController extends Controller
{
    
    public function upload(Request $request)
    {
    if (!$request->hasFile('file')) {
            return response()->json([
                'error' => 'No CSV file received' ], 400);
        }

    $file = $request->file('file');

    $handle = fopen($file->getPathname(), 'r');

    $headers = fgetcsv($handle);

    fclose($handle);

    return response()->json($headers);

    }
}