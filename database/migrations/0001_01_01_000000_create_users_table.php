<?php

use Illuminate\Console\Application;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//
use App\Enums\Auth\User\StatusEnum;
use App\Enums\Auth\User\GenderEnum;
use App\Enums\Auth\Role\RolesEnum;

return new class extends Migration
{


    private string $usersTable = 'users';
    private string $usersProfileTable = "users_profile";
    private string $resetTokenTable = 'password_reset_tokens';
    private string $sessionsTable = "sessions";
    private string $loginActivities = "login_activities";

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->usersTable, function (Blueprint $table) {
            $table->id();
            $table->uuid('_key')->index()->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', RolesEnum::values())->default(RolesEnum::CUSTOMER->value);
            $table->enum('status', StatusEnum::values())->default(StatusEnum::Pending->value);
            $table->rememberToken();
            $table->timestamps();
        });



        Schema::create($this->usersProfileTable, function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('avatar')->nullable()->default('_avatar.png');

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->enum('gender', GenderEnum::values())->default(GenderEnum::Male->value);

            $table->mediumText('address')->nullable();
            $table->date('date_of_birth')->nullable();

            $table->string('phone')->nullable();
            $table->string('city')->nullable();
            $table->string('pin_code')->nullable();
            $table->string('country')->nullable();

            $table->timestamps();
        });


        Schema::create($this->loginActivities, function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('ip');
            $table->string('location')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });

        Schema::create($this->resetTokenTable, function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });


        Schema::create($this->sessionsTable, function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->usersProfileTable);
        Schema::dropIfExists($this->resetTokenTable);
        Schema::dropIfExists($this->sessionsTable);
        Schema::dropIfExists($this->loginActivities);
        Schema::dropIfExists($this->usersTable);

    }
};
