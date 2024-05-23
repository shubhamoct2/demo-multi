<?php

use App\Enums\Venue\StatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    private string $venuesTable = 'venues';
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create($this->venuesTable, function (Blueprint $table) {
            $table->id();
            $table->uuid('_key')->index()->nullable();
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->string('slug');
            $table->mediumText('description');
            $table->string('phone');
            $table->string('email');
            $table->string('logo')->nullable();
            $table->string('landing_page')->nullable();
            $table->mediumText('featured_image')->nullable();
            $table->longText('address');
            $table->enum('status', StatusEnum::values())->default(StatusEnum::Active->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->venuesTable);
    }
};
