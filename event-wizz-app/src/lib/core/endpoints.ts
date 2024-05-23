const API_ENDPOINTS = {
    BACKEND_API_URL: process?.env?.NEXT_PUBLIC_BACKEND_API_URL,
    HOME: "/",
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    VERIFY_EMAIL: "/api/auth/verify-email",
    SANCTUM_COOKIES: '/sanctum/csrf-cookie',
    FORGET_PASSWORD: "/api/auth/forget-password",
    LOGOUT: "/api/auth/logout",
    CHANGE_PASSWORD: "/api/auth/change-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    VERIFY_FORGET_PASSWORD: "/api/auth/verify-forget-password-token",

    TOKEN: "/sanctum/csrf-cookie",
    EVENT: {
        ALL_CATEGORIES: "/api/owner/event-categories"
    },
    VENUE: {
        DRAFTS: '/api/owner/venues/drafts',
        STORE: '/api/owner/venues'
    }
}

export default API_ENDPOINTS
