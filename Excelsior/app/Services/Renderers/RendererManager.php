<?php

namespace App\Services\Renderers;

use App\Models\Project;
use Illuminate\Http\UploadedFile;
use Exception;

class RendererManager
{
    public function __construct(
        private PdfRenderer $pdfRenderer,
        private ImageRenderer $imageRenderer,
        private DocxRenderer $docxRenderer
    ) {}

    public function render(
        Project $project,
        string $filePath,
        array $mapping,
        string $recipientColumn
    ) {
        $project->load('file', 'fields');
        return match ($project->file->type) {

            'application/pdf' =>
                $this->pdfRenderer->render(
                    $project,
                    $filePath,
                    $mapping,
                    $recipientColumn
                ),

            'image/png' =>
                $this->imageRenderer->render(
                    $project,
                    $filePath,
                    $mapping,
                    $recipientColumn
                ),

            'docx' =>
                $this->docxRenderer->render(
                    $project,
                    $filePath,
                    $mapping,
                    $recipientColumn
                ),

            default =>
                throw new Exception(
                    "Unsupported template type"
                ),
        };
    }
}