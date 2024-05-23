import Axios from 'axios'
import Cookies from 'js-cookie'


const http = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-type': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true
})

http.interceptors.request.use(config => {
    const authToken = Cookies.get('apiToken');
    console.log(authToken, ' authToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});


http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            return error?.response
            // Handle unauthorized access
        } else if (status === 404) {
            // Handle not found errors
        } else {
            // Handle other errors
            return error?.response
        }
        return Promise.reject(error);
    }
);


export default http
