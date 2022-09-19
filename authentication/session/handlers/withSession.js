import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const appDefaultSessionOptions = {
    cookieName: process.env.APP_COOKIE_NAME,
    password: process.env.COOKIE_PRIVATE_KEY,
    cookieOptions: {
        secure: false,//process.env.IS_PRODUCTION,//force HTTPS only in prod.
    },
};

export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, appDefaultSessionOptions);
}

export function withSessionSsr(handler) {
    return withIronSessionSsr(handler, appDefaultSessionOptions);
}