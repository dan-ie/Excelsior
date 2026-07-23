<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = ['name', 'type', 'size', 'path', 'thumbnail_path'];

    public function project(){
        return $this->hasOne(Project::class);
    }

}
