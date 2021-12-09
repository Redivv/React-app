<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['title', 'client', 'shipping_address', 'shipping_deadline', 'notes'];
    protected $hidden = [];

    public function tasks()
    {
        return $this->hasMany(Task::class)->get();
    }
}
