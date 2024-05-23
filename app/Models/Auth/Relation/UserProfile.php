<?php

namespace App\Models\Auth\Relation {

    use App\Models\Auth\Profile as ProfileModel;

    trait UserProfile
    {


        public function profile()
        {
            return $this->hasOne(ProfileModel::class);
        }
    }
}
