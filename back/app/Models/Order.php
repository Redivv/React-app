<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['title', 'client', 'shipping_address', 'shipping_deadline', 'notes'];
    protected $hidden = [];

    public function tasks()
    {
        return $this->hasMany(Task::class)->get();
    }

    public function archive()
    {
        $this->archived_at = Carbon::now();
        $this->save();
    }

    public function unArchive()
    {
        $this->archived_at = null;
        $this->save();
    }
}
