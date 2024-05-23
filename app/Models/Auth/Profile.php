<?php

namespace App\Models\Auth {


    use Illuminate\Foundation\Auth\User as Authenticatable;
    use App\Models\Auth\User;

    class Profile extends Authenticatable
    {
        protected $table = 'users_profile';
        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'user_id',
            'avatar',
            'first_name',
            'last_name',
            'gender',
            'address',
            'date_of_birth',
            'phone',
            'country',
            'last_ip',
            'city',
            'pin_code',
        ];

        /**
         * The attributes that should be hidden for serialization.
         *
         * @var array<int, string>
         */
        protected $hidden = [];

        /**
         * Get the attributes that should be cast.
         *
         * @return array<string, string>
         */
        protected function casts(): array
        {
            return [
                'date_of_birth' => 'datetime'
            ];
        }

        public function user()
        {
            return $this->belongsTo(User::class);
        }
    }
}