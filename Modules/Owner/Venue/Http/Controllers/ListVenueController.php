<?php

namespace Modules\Owner\Venue\Http\Controllers {

    use Modules\Core\Abstract\Controllers\ApiController;
    use Modules\Owner\Venue\Http\Requests\ListVenueRequest;

    class ListVenueController extends ApiController
    {
        public function __invoke(ListVenueRequest $request)
        {
            dd($request->all());
        }
    }
}
