<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\LoginController as AdminLoginController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\ResponseController as AdminResponseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::get('/register', [RegisterController::class, 'showRegistrationForm']);
Route::post('/register', [RegisterController::class, 'register']);

Route::get('/login', [LoginController::class, 'showLoginForm']);
Route::post('/login', [LoginController::class, 'login']);

Route::get('/admin/login', [AdminLoginController::class, 'showLoginForm']);
Route::post('/admin/login', [AdminLoginController::class, 'login']);

Route::get('/survey', [SurveyController::class, 'show']);
Route::post('/survey', [SurveyController::class, 'store']);

Route::get('/responses/{token}', [ResponseController::class, 'show']);

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Admin routes (protected)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index']);
    Route::get('/admin/questionnaire', [QuestionController::class, 'index']);
    Route::get('/admin/responses', [AdminResponseController::class, 'index']);
});
