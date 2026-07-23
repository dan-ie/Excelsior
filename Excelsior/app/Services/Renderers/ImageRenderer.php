<?php

namespace App\Services\Renderers;

use App\Models\Project;
use Illuminate\Http\UploadedFile;

class ImageRenderer
{
    public function render(
        Project $project,
        UploadedFile $file,
        array $mapping
    ) {
        /*
            Later:

            - Open image
            - Draw text
            - Apply styles
            - Save image
        */


        return $file->getPathname();
    }
}