<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function upload(Request $request)
    {
    if (!$request->hasFile('csv_file')) {
            return response()->json([
                'error' => 'No CSV file received' ], 400);
        }

    $file = $request->file('csv_file');

    $handle = fopen($file->getPathname(), 'r');

    $headers = fgetcsv($handle);

    fclose($handle);

    return response()->json($headers);

    }
}