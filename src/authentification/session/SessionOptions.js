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

export const choicesSessionOptions = {
    cookieName: "avnuCookies",
    password: process.env.COOKIE_PRIVATE_KEY,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",//force HTTPS only in prod.
        maxAge: process.env.COOKIE_MAX_AGE,
        sameSite: "Strict",//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#strict
        //domain: process.env.APP_BASE_URL//removed after reading that could be a problem if we add some CNAME in the future.
    },
};

export const visitorSessionDefault = {
    ip: "",
    browser: ""
};

export const canSaveAuthCookie = (rawCookie) => {
    if (typeof rawCookie === "object") {
        return rawCookie.auth;
    }
    if (typeof rawCookie === "string") {
        return canSaveTargetCookie("auth", rawCookie);
    }
    return false;
}

export const canSaveTargetCookie = (permission, rawCookie) => {
    if (rawCookie) {
        const parsedCookie = JSON.parse(rawCookie);
        return parsedCookie && parsedCookie[permission];
    }
}