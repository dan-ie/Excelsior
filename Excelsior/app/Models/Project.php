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
    ];
        public function fields()
    {
        return $this->hasMany(TemplateField::class);
    }

}
