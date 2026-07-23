<?php
namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectDocumentMail;

class DocumentMailer
{
    public function send(Project $project, array $document)
    {

        Mail::to($document['email'])
            ->send(
                new ProjectDocumentMail(
                    $project->emailTemplate,
                    $document['path']
                )
            );
                }
}