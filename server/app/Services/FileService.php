<?php

namespace App\Services;

use Nette\Utils\Image;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function uploadImage(UploadedFile $file, string $path, array $sizes = []): string
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $fullPath = $path . '/' . $fileName;

        // Сохраняем оригинал
        Storage::disk('public')->put($fullPath, file_get_contents($file));

        // Если нужны разные размеры изображений
        if (!empty($sizes)) {
            $image = Image::make($file);
            foreach ($sizes as $size) {
                $resizedImage = clone $image;
                $resizedImage->fit($size['width'], $size['height']);
                
                $sizePath = $path . '/' . $size['width'] . 'x' . $size['height'] . '_' . $fileName;
                Storage::disk('public')->put($sizePath, $resizedImage->encode());
            }
        }

        return $fullPath;
    }

    public function uploadFile(UploadedFile $file, string $path): array
    {
        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $fullPath = $path . '/' . $fileName;

        Storage::disk('public')->put($fullPath, file_get_contents($file));

        return [
            'original_name' => $file->getClientOriginalName(),
            'path' => $fullPath,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType()
        ];
    }

    public function deleteFile(string $path): bool
    {
        return Storage::disk('public')->delete($path);
    }
} 