<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'user_id',
        'is_public'
    ];
        public function fields()
    {
        return $this->hasMany(TemplateField::class);
    }
    public function file(){
    return $this->belongsTo(File::class);
    }
    public function emailTemplate(){
    return $this->belongsTo(Email::class,'email_id');
    }

}
