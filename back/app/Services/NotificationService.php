<?php

namespace App\Services;

use App\Jobs\SendNotifications;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Queue;

class NotificationService
{
    public static function sendNotificationToAllUsers(array $notificationData, array $exceptedIds = [])
    {
        $users = User::all()->except(array_merge([Auth::id()], $exceptedIds));
        if ($users) {
            Queue::push(new SendNotifications($users, $notificationData));
        }
    }

    public static function sendNotificationToSingleUser(User $receipient, array $notificationData)
    {
        Queue::push(new SendNotifications([$receipient], $notificationData));
    }
}
