<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectEmail;
use App\Models\Email;
use App\Models\Project;



class EmailController extends Controller
{
        public function send(Request $request)
    {
            $validated = $request->validate([
                'to' => 'required|email',
                'subject'=> 'required|string|max:20',
                'message' => 'required|string',
            ]);

             Email::create([
             'name' => $validated['to'],
             'subject' => $validated['subject'],
              'message' => $validated['message'],
             ]);
            Mail::to($validated['to'])
            ->send(new ProjectEmail($validated));

           return response()->json([
            'message' => 'Email sent successfully.',
            ]);

    }
            public function store(Request $request,Project $project)
    {
            $validated = $request->validate([
                'subject'=> 'required|string|max:20',
                'message' => 'required|string',
            ]);

             $emailTemplate = Email::create([
             'subject' => $validated['subject'],
              'message' => $validated['message'],
             ]);
                $project->update([
                        'email_id' => $emailTemplate->id,
                ]);

           return response()->json([
            'message' => 'Email saved successfully.',
            ]);

    }

}
