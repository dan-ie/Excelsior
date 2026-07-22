<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemplateField extends Model
{
        protected $fillable = [
        'name',
        'x',
        'y',
        'width',
        'height',
        'settings'
    ];
    protected $casts = [
            'settings' => 'array',
        ];
}
