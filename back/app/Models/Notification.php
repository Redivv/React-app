<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['content', 'order_id', 'user_id'];
    protected $hidden = [];
    protected $casts = [
        'created_at' => "datetime:Y-m-d",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
