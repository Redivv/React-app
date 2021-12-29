<?php

namespace App\Services;

use App\Jobs\SendNotifications;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

class NotificationService
{
    public static function sendNotificationToAllUsers(array $notificationData)
    {
        $users = User::all();
        Queue::push(new SendNotifications($users, $notificationData));
    }
}
