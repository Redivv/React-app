<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = ['filename', 'original_filename'];
    protected $hidden = [];

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
