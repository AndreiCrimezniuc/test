<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use App\Http\Controllers\Api\ApiController;

class ProfileController extends ApiController
{
    protected $avatarPath = 'public/users/images';

    public function show()
    {
        return view('profile.show', ['user' => $this->user()]);
    }

    public function update(Request $request)
    {
        try {
            $user = $this->user();

            $validated = $request->validate([
                'firstname' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'avatar' => 'nullable|image|max:2048'
            ]);

            if ($request->hasFile('avatar')) {
                try {
                    if ($user->avatar) {
                        Storage::delete($this->avatarPath . '/' . $user->avatar);
                    }

                    // Проверяем существование директории
                    if (!Storage::exists($this->avatarPath)) {
                        Storage::makeDirectory($this->avatarPath);
                    }


                    $manager = new ImageManager(new Driver());

                    $image = $manager->read($request->file('avatar'))
                        ->cover(400, 400)
                        ->toJpeg();


                    $filename = time() . '.jpg';
                    Storage::put($this->avatarPath . '/' . $filename, $image->toString());

                    \Illuminate\Log\log($this->avatarPath . '/' . $filename);

                    $validated['avatar'] = $filename;
                } catch (\Exception $e) {
                    Log::error('Avatar upload error: ' . $e->getMessage());
                    return $this->errorResponse('Ошибка при загрузке изображения: ' . $e->getMessage(), 422);
                }
            }

            $user->update($validated);
            $user->refresh();

            return $this->successResponse(
                ['user' => $user],
                'Профиль успешно обновлен'
            );
        } catch (\Exception $e) {
            Log::error('Profile update error: ' . $e->getMessage());
            return $this->errorResponse($e->getMessage(), 422);
        }
    }
}
