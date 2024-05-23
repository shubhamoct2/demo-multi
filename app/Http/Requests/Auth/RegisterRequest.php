<?php

namespace App\Http\Requests\Auth {


    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Validation\Rules;
    use App\Models\Auth\User;
    use Illuminate\Contracts\Validation\Validator;
    use Illuminate\Validation\ValidationException;

    class RegisterRequest extends FormRequest
    {
        /**
         * Determine if the user is authorized to make this request.
         */
        public function authorize(): bool
        {
            return true;
        }

        /**
         * Get the validation rules that apply to the request.
         *
         * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
         */
        public function rules(): array
        {
            return [
                'name' => ['required', 'min:3', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
                'password' => ['required', Rules\Password::defaults()],
            ];
        }

        protected function failedValidation(Validator $validator)
        {
            $response = new JsonResponse([
                'status' => false,
                'message' => 'The given data is invalid',
                'errors' => $validator->errors()
            ], 422);

            throw new ValidationException($validator, $response);
        }
    }
}
