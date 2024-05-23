<?php

namespace App\Enums\Auth\Role {

    use Kongulov\Traits\InteractWithEnum;

    enum RolesEnum: string
    {
        use InteractWithEnum;

            // case NAMEINAPP = 'name-in-database';
        case ADMIN = 'admin';
        case OWNER = 'owner';
        case CUSTOMER = 'customer';

        // extra helper to allow for greater customization of displayed values, without disclosing the name/value data directly
        public function label(): string
        {
            return match ($this) {
                static::ADMIN => 'Admin',
                static::OWNER => 'Owner',
                static::CUSTOMER => 'Customer',
            };
        }
    }
}
