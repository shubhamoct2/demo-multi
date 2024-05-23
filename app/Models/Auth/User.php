<?php

namespace App\Models\Auth {

    use App\Notifications\VerifyEmail;
    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;
    use Laravel\Sanctum\HasApiTokens;


    //
    use App\Models\Auth\Relation\UserProfile as ProfileRelation;
    use App\Models\Auth\Relation\UserVenue as VenueRelation;

    class User extends Authenticatable implements MustVerifyEmail
    {
        use HasApiTokens;

        use HasFactory, Notifiable;



        //relatoins
        use ProfileRelation;
        use VenueRelation;
        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'name',
            'email',
            'password',
        ];

        /**
         * The attributes that should be hidden for serialization.
         *
         * @var array<int, string>
         */
        protected $hidden = [
            'password',
            'remember_token',
        ];

        /**
         * Get the attributes that should be cast.
         *
         * @return array<string, string>
         */
        protected function casts(): array
        {
            return [
                'email_verified_at' => 'datetime',
                'password' => 'hashed',
            ];
        }

        /**
         * Send email verification link to verify the user
         */
        public function sendEmailVerificationNotification()
        {
            $this->notify(new VerifyEmail);
        }
    }
}
