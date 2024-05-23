<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\NewPasswordController;

Route::prefix("auth")->group(function () {
    Route::post("register", RegisterController::class)->name("auth.register");
    Route::post("login", LoginController::class)->name("auth.login");
    Route::get("/verify-email/{id}/{hash}", VerifyEmailController::class)
        ->middleware(["auth", "throttle:6,1"])
        ->name("auth.verification.verify");
    Route::post('reset-password', [NewPasswordController::class, 'store'])->middleware('guest')->name('password.store');
});

Route::get("login", function () {
    return response()->json([
        'status' => 413,
        'message' => 'Please login to access the api.'
    ]);
})->name("login");
