<?php
use Modules\Owner\Venue\Providers\VenueRouteServiceProvider;
use Modules\Owner\Venue\Providers\VenueServiceProvider;


return [
    App\Providers\AppServiceProvider::class,

    // customer venues
    VenueServiceProvider::class,
    VenueRouteServiceProvider::class
];
