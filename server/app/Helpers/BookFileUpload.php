<?php
namespace App\Helpers;

use Illuminate\Support\Str;

class BookFileUpload {
    public static function uploadFiles($files) { //не создавая объекты вызывать метоd
        if (empty($files)) {
            return [];
        }
        
        $uploadedFiles = [];

        foreach ($files as $file) {
            $newName = Str::uuid() . "." . $file->getClientOriginalExtension();
            $path = $file->storeAs('files/books', $newName, 'public');
            $uploadedFiles[] = [
                'path' => $path,
                'type' => $file->getClientOriginalExtension()
            ];
        }

        return $uploadedFiles;
    }
}