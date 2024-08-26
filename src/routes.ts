/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/events",
    "/about",
    "/contact",
    "/terms",
]

/**
 * An array of routes that are using for the authentication.
 * These routes will redirect logged users to settings page.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
]

/**
 * The prefix of api routes authentication.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default login redirect path.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"

/**
 * An array of protected routes of the application.
 * @type {string[]}
 */
export const protectedRoutes = [
    "/dashboard",
    "/settings",
    "/profile",
]

/**
 * An array of admin route of the application.
 * @type {string[]}
 */
export const adminRoute = [
    "/dashboard/admin",
    "/dashboard/actions/deposit"
]