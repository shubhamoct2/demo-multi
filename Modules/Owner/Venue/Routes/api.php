<?php

use App\Http\Middleware\RoleCustomerMiddleware;
use Illuminate\Support\Facades\Route;
use Modules\Owner\Venue\Http\Controllers\ListVenueController;

// Route::prefix('venues')
//     // ->middleware(RoleCustomerMiddleware::class)
//     ->group(function () {
//         Route::get('/', [ListVenueController::class])->name('venues.list');
//     });



Route::prefix('venues')
    ->middleware(['auth:sanctum', 'verified'])
    ->group(function () {
        Route::get('/', ListVenueController::class)->name('owner.venues.list');
    });
