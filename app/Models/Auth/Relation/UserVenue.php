<?php

namespace App\Models\Auth\Relation{

use App\Models\Venue\Venue as VenueModel;

trait UserVenue{

      public function venues()
        {
            return $this->hasMany(VenueModel::class);
        }
}
}
