<?php

namespace App\Services\Renderers;

use App\Models\Project;
use Illuminate\Http\UploadedFile;

class DocxRenderer
{
    public function render(
        Project $project,
        UploadedFile $file,
        array $mapping
    ) {
        /*
            Later:

            - Open DOCX
            - Replace placeholders
            - Save DOCX/PDF
        */


        return $file->getPathname();
    }
}