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
    protected $with = ['order:id,archived_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
