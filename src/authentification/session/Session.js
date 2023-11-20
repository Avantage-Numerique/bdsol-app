export const appDefaultSessionOptions = {
    cookieName: process.env.APP_COOKIE_NAME,
    password: process.env.COOKIE_PRIVATE_KEY,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",//force HTTPS only in prod.
        maxAge: process.env.COOKIE_MAX_AGE,
        sameSite: "Strict",//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#strict
        //domain: process.env.APP_BASE_URL//removed after reading that could be a problem if we add some CNAME in the future.
    },
};