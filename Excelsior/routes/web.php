<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\TemplateFieldController;



Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
        Route::get('/dashboard', [ProjectController::class, 'index'])
        ->name('dashboard');
        Route::get('/project/{id}', [ProjectController::class, 'show'])
        ->name('project');
        Route::patch('/project/{project}', [ProjectController::class, 'update']);
        Route::post('/project', [ProjectController::class, 'store']);
        Route::post('/email', [EmailController::class, 'send']);
        Route::post('/email/create', [EmailController::class, 'store']);
        Route::post('/import-csv', [ImportController::class, 'upload']);
        Route::post('/templates/{project}/fields', [TemplateFieldController::class, 'store']);


});

require __DIR__.'/settings.php';
