<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
        Route::get('/dashboard', [ProjectController::class, 'index'])
        ->name('dashboard');
        Route::get('/project/{id}', [ProjectController::class, 'show'])
        ->name('project');


});

require __DIR__.'/settings.php';
