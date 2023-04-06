export const appDefaultSessionOptions = {
    cookieName: process.env.APP_COOKIE_NAME,
    password: process.env.COOKIE_PRIVATE_KEY,
    cookieOptions: {
        secure: process.env.IS_PRODUCTION,//force HTTPS only in prod.
        maxAge: process.env.COOKIE_MAX_AGE,
    },
};