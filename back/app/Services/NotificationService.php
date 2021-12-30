<?php

namespace App\Services;

use App\Jobs\SendNotifications;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Queue;

class NotificationService
{
    public static function sendNotificationToAllUsers(array $notificationData)
    {
        $users = User::all()->except(Auth::id());
        Queue::push(new SendNotifications($users, $notificationData));
    }

    public static function sendNotificationToSingleUser(User $receipient, array $notificationData)
    {
        Queue::push(new SendNotifications([$receipient], $notificationData));
    }
}
