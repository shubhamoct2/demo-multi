<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    private string $eventsTable = 'events';
    private string $eventCategoriesTable = 'event_categories';
    private string $eventPackagesTable = 'event_packages';
    private string $eventMenusTable = 'event_menus';
    private string $eventAcceptPayment = 'event_accepted_payments';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //Events Table
        Schema::create($this->eventsTable, function (Blueprint $table) {
            $table->id();
            $table->uuid('_key')->index()->nullable();
            $table->foreignId('venue_id')->constrained();
            $table->string('title');
            $table->string('slug');
            $table->string('sub_title');
            $table->longText('description')->nullable();

            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->dateTime('date')->nullable();

            $table->longText('brochure')->nullable();
            $table->text('featured_image')->nullable();
            $table->dateTime('email_reminder')->nullable();
            $table->tinyInteger('status')->default(1);

            $table->timestamps();
        });

        //Event Categories Table
        Schema::create($this->eventCategoriesTable, function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id');
            $table->string('title');
            $table->string('slug');
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->integer('parent_id')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });


        //Event Packages Table
        Schema::create($this->eventPackagesTable, function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->string('heading');
            $table->string('sub_heading')->nullable();
            $table->longText('flyer_image')->nullable();
            $table->longText('description')->nullable();
            $table->longtext('items')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });



        //Event Menus Table
        Schema::create($this->eventMenusTable, function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->longText('image')->nullable();
            $table->longtext('items')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });



        //Event Accept Payments Table
        Schema::create($this->eventAcceptPayment, function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->string('title')->nullable();
            $table->string('payment_type')->nullable();
            $table->longText('payment_credentials')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->eventCategoriesTable);
        Schema::dropIfExists($this->eventPackagesTable);
        Schema::dropIfExists($this->eventMenusTable);
        Schema::dropIfExists($this->eventAcceptPayment);
        Schema::dropIfExists($this->eventsTable);
    }
};
