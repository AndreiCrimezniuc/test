<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function uploadFile(UploadedFile $file, string $path, array $allowedMimes = []): array
    {
        if (!empty($allowedMimes) && !in_array($file->getMimeType(), $allowedMimes)) {
            throw new \Exception('Недопустимый тип файла');
        }

        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs($path, $fileName, 'public');

        return [
            'original_name' => $file->getClientOriginalName(),
            'file_name' => $fileName,
            'file_path' => $filePath,
            'file_type' => $file->getClientOriginalExtension(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize()
        ];
    }

    public function deleteFile(string $path): bool
    {
        return Storage::disk('public')->delete($path);
    }
} 