<?php

namespace App\Enums\Venue {

    use Kongulov\Traits\InteractWithEnum;

    enum StatusEnum: int
    {
        use InteractWithEnum;

        case Active = 1;
        case Draft = 0;
    }
}
