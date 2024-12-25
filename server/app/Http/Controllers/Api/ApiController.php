<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ApiController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Получить текущего аутентифицированного пользователя
     * 
     * @return User|null
     */
    protected function user(): ?User
    {
        return Auth::user();
    }

    /**
     * Успешный ответ
     */
    protected function successResponse($data = null, string $message = '', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Ответ с ошибкой
     */
    protected function errorResponse(string $message, int $code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'error' => $message
        ], $code);
    }

    /**
     * Ответ с пагинацией
     */
    protected function paginatedResponse($items): JsonResponse
    {
        return response()->json([
            'data' => $items->items(),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total()
            ]
        ]);
    }
} 