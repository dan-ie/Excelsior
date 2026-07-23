<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $fillable = [
        'name',
        'subject',
        'message',
    ];
        public function projects()
    {
        return $this->hasMany(Project::class);
    }

}
