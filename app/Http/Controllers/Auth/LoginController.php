<?php


namespace App\Http\Controllers\Auth {

    use App\Http\Controllers\ApiController;
    use App\Http\Requests\Auth\LoginRequest;
    use App\Models\Auth\User;
    use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Hash;

    class LoginController extends ApiController
    {

        public function __invoke(LoginRequest $request)
        {
            try {
                $user = User::where("email", $request->email)->first();
                Log::info("$user" . $user);
                if ($user) {
                    //check if email is verified
                    if ($user instanceof MustVerifyEmail && !$user->hasVerifiedEmail()) {
                        return response()->json(
                            [
                                'status' => 409,
                                'data' => null,
                                'errors' => [
                                    "email" => [
                                        "Your email address is not verified."
                                    ]
                                ],
                                'message' => 'Your email address is not verified.'
                            ],
                            409
                        );
                    }
                    // * Match password
                    if (!Hash::check($request->password, $user->password)) {
                        return response()->json([
                            'status' => 401,
                            'data' => null,
                            'errors' => null,
                            "message" => "Invalid credentials.",
                        ]);
                    }
                    $token = $user->createToken("web")->plainTextToken;
                    return response()->json([
                        "status" => 200,
                        "message" => "Logged in successfully!",
                        "data" => [
                            "user" => $user->toArray(),
                            "token" => $token
                        ],
                        "errors" => null
                    ]);
                }
                return response()->json([
                    "status" => 401,
                    "message" => "No account found with these credentials."
                ]);
            } catch (\Exception $err) {
                Log::info("LoginController::login =>" . $err->getMessage());
                return response()->json(["status" => 500, "message" => "Something went wrong!"], 500);
            }
        }
    }
}
