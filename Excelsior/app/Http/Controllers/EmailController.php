<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectEmail;

class EmailController extends Controller
{
        public function send(Request $request)
    {
            $validated = $request->validate([
                'to' => 'required|email',
                'subject'=> 'required|string|max:20',
                'message' => 'required|string',
            ]);
            Mail::to($validated['to'])
            ->send(new ProjectEmail($validated));

           return response()->json([
            'message' => 'Email sent successfully.',
            ]);

    }
}
