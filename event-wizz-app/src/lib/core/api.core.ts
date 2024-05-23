import Axios from "@/lib/core/http";

class CoreApi {
    http = Axios;

    constructor(public _base_path: string | null) {
    }

    request(url: string) {
        try {
            return this.http.request(url)
                .then(response => {
                    return response
                })
                .catch(error => {
                    return error
                })
        } catch (error) {
            return error;
        }
    }

    get(url: string) {
        try {
            return this
                .http
                .get(url)
                .then((queryResponse) => {
                    return queryResponse
                })
                .catch((error) => {
                    return error
                })
        } catch (error) {
            return error;
        }
    }

    post(url: string, data: {} | [], options?: any) {
        try {
            return this
                .http
                .post(url, data, options)
                .then((queryResponse) => {
                    return queryResponse?.data
                })
        } catch (error) {
            return error;
        }
    }
}

export default CoreApi;
