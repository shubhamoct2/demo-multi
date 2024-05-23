<?php

namespace App\Http\Controllers\Auth {

    use App\Events\UserRegisteredEvent;
    use App\Http\Controllers\ApiController;
    use App\Http\Requests\Auth\RegisterRequest;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Str;
    use Illuminate\Support\Facades\Hash;
    use App\Models\Auth\User;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Auth\Events\Registered;


    class RegisterController extends ApiController
    {
        public function __invoke(RegisterRequest $request)
        {
            try {
                //create new user
                $user = User::create([
                    'name' => (isset($request->name) ? $request->name : Str::random(23)),
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                //notifiy user is created
                // event(new Registered($user));
                event(new UserRegisteredEvent($user));
                Auth::login($user);
                return response()->json([
                    'status' => 200,
                    'message' => 'User registered successfully.',
                    'data' => [
                        'user' => $user
                    ]
                ]);
            } catch (\Exception $err) {
                Log::info("RegisterController::register() =>" . $err->getMessage());
                return response()->json(["status" => 500, "message" => "Something went wrong!"], 500);
            }
        }
    }
}
