<?php

namespace App\Listeners;

use App\Events\UserRegisteredEvent;
use App\Models\Auth\Profile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UserRegisteredEventListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegisteredEvent $event): void
    {
        if (!env('VERIFY_EMAIL_BEFORE_LOGIN')) {
            $event->user->markEmailAsVerified();
        } else {
            if ($event->user instanceof MustVerifyEmail && !$event->user->hasVerifiedEmail()) {
                $event->user->sendEmailVerificationNotification();
            }
        }
        if ($event->user) :
            Profile::create([
                'user_id' => $event->user->id,
            ]);
        endif;
    }
}
