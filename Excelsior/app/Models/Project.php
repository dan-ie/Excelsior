<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

#[Table(key: 'id')]
#[Fillable(['name', 'description','created_at'])]
class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'email_id',
        'project_id'
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
