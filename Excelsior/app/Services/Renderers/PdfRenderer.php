<?php

namespace App\Services\Renderers;

use App\Models\Project;
use Illuminate\Http\UploadedFile;
use setasign\Fpdi\Fpdi;

class PdfRenderer
{
    private function readCsv(string $filePath)
    {

        $handle = fopen($filePath, 'r');

        $headers = fgetcsv($handle);

        $rows = [];

        while (($row = fgetcsv($handle)) !== false) {
            $rows[] = array_combine($headers, $row);
        }

        fclose($handle);

        return $rows;
    }

    public function render(
        Project $project,
        string $filePath,
        array $mapping,
        string $recipientColumn
    ) {
        $csvPath = storage_path('app/private/' . $filePath);
        $project->load('file', 'fields');
        $scaleX = 210 / 794;
        $scaleY = 297 / 1123;

        $rows = $this->readCsv($csvPath);

        $templatePath = storage_path(
            'app/public/' . $project->file->path
        );

        $outputs = [];

        foreach ($rows as $index => $row) {

            $pdf = new Fpdi();

            $pdf->setSourceFile($templatePath);

            $template = $pdf->importPage(1);

            $pdf->AddPage();

            $pdf->useTemplate($template);


            foreach ($project->fields as $field) {

                $column = $mapping[$field->id] ?? null;
                $email = $row[$recipientColumn];
                if (!$column) {
                    continue;
                }

                $value = $row[$column] ?? '';

                $pdf->SetFont('Arial', '', 14);

                $pdf->SetXY(
                        $field->x * $scaleX,
                        $field->y * $scaleY
                    );
                $pdf->Write(1, $value);
            }


            $output = storage_path(
                "app/public/generated/output_{$index}.pdf"
            );

            $pdf->Output($output, 'F');

            $outputs[] = [
                'path' => $output,
                'email' => $email,
            ];  
          }

        return $outputs;
    }
}