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

    protected $casts = [
            'is_public' => 'boolean', //makes php version boolean
        ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeVisibleTo(Builder $query, ?int $userId = null): Builder
    {
        $userId = $userId ?? Auth::id();

        return $query->where('is_public', false)
                    ->orWhere(function (Builder $q) use ($userId) {
                        $q->where('is_public', true)
                        ->where('user_id', $userId);
                    });
    }
}
