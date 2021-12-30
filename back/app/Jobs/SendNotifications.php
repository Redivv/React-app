<?php

namespace App\Jobs;

class SendNotifications extends Job
{
    private iterable $users;
    private array $notificationData;

    public function __construct(iterable $users, array $notificationData)
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
