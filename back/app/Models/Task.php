<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        "title", "column_number", "order_id", "user_id", "description", "validation_comments", "validation_terms", "notes"
    ];
    protected $hidden = [];
    protected $with = ['user:id,email', 'files:id,original_filename'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function files()
    {
        return $this->belongsToMany(File::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
