<?php


namespace Modules\Owner\Venue\Http\Requests {

    use Modules\Core\Abstract\Requests\Request;

    class ListVenueRequest extends Request
    {

        public function authorize()
        {
            return true;
        }


        public function rules()
        {
            return [];
        }
    }
}
