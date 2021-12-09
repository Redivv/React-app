<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        "title", "column_number", "order_id", "description", "validation_comments", "validation_terms", "notes"
    ];
    protected $hidden = [];

    public function order()
    {
        return $this->belongsTo(Order::class)->get();
    }
}
