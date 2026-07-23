<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Project;
use Illuminate\Http\UploadedFile;
use App\Services\Renderers\RendererManager;
use App\Services\Renderers\PdfRenderer;
use App\Services\DocumentMailer;

class RenderProjectJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    public function __construct(
        public Project $project,
        public string $filePath,
        public array $mapping,
        public string $recipientColumn
    ) {}

    public function handle(
        RendererManager $rendererManager,
        PdfRenderer $renderer,
        DocumentMailer $mailer
    ) {

        $documents = $rendererManager->render(
            $this->project,
            $this->filePath,
            $this->mapping,
            $this->recipientColumn
        );


        foreach ($documents as $document) {

            $mailer->send(
                $this->project,
                $document
            );

        }
    }
}