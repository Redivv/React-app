<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Laravel\Lumen\Routing\Controller;

class NotificationController extends Controller
{
    public function getAll()
    {
        return auth()->user()->notifications()->get();
    }

    public function delete(string $notificationId)
    {
        Notification::findOrFail($notificationId)->delete();
        return response('Deleted');
    }

    public function clearAll()
    {
        auth()->user()->notifications()->delete();
        return response('Deleted');
    }
}
