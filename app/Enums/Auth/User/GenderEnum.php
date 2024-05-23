<?php

namespace App\Enums\Auth\User {

    use Kongulov\Traits\InteractWithEnum;

    enum GenderEnum: string
    {
        use InteractWithEnum;

        case Male = 'male';
        case Female = 'female';
        case Other = 'other';
    }
}
