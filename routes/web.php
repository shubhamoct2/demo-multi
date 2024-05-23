<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {

    return response()->json([
        'message' =>'Hey I am using API'
    ]);
    // return view('welcome');
});
