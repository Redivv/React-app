<?php

namespace App\Jobs;

use Illuminate\Database\Eloquent\Collection;

class SendNotifications extends Job
{
    private Collection $users;
    private array $notificationData;

    public function __construct(Collection $users, array $notificationData)
    {
        $this->users = $users;
        $this->notificationData = $notificationData;
    }

    public function handle()
    {
        foreach ($this->users as $user) {
            $user->notifications()->create($this->notificationData);
        }
    }
}
