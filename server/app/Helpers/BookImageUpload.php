<?php
namespace App\Helpers;

use Illuminate\Support\Str;

class BookImageUpload {
    // public static function uploadImages($files) {
    //     if (empty($files)) {
    //         return [];
    //     }

    //     $uploadedImages = [];

    //     foreach ($files as $file) {
    //         $newName = Str::uuid() . "." . $file->getClientOriginalExtension();
    //         $path = $file->storeAs('images', $newName, 'public');
    //         $uploadedImages[] = $path;
    //     }

    //     return $uploadedImages;
    // }
}