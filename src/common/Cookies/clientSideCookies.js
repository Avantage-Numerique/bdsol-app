/**
 * Save to document the cookie.
 * @param {string} name Cookie Name.
 * @param {string|object} value Already stringnify cookie value
 * @param {object} options Cookie option
 */
export const csSetCookie = (name, value, options = {}) => {
    options = options || {};

    if (typeof value === "string") {
        value = {
            value: value,
            expiresAt: 0,
        };
    }

    if (typeof value === "object") {
        value.expiresAt = 0;
    }

    let expires = options.expires;
    if (typeof expires === "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
        value.expiresAt = expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
};

/**
 * get the cookie already in the form of object.
 * @param {string} name
 * @returns {undefined|any}
 */
export const csGetCookie = (name) => {
    if (document.cookie) {
        const parsedCookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [name, value] = cookie.split("=");
            if (name) acc[name] = decodeURIComponent(value || "");
            return acc;
        }, {});
        return parsedCookies?.[name] ? JSON.parse(parsedCookies?.[name]) : undefined;
    }
    return undefined;
};

/**
 *
 * @param name
 */
export const csDeleteCookie = (name) => {
    if (document.cookie) {
        const parsedCookies = csGetCookie(name);
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
};

/**
 * Check if a cookie exists and is not expired
 * @param {string} cookieName
 * @returns {boolean}
 */
export function isCookieValid(cookieName) {
    try {
        const cookieValue = csGetCookie(cookieName);
        if (!cookieValue) return false;

        const parsedCookie = JSON.parse(cookieValue);

        // Check if cookie has expiration timestamp
        if (parsedCookie.expiresAt) {
            const now = Date.now();
            if (now > parsedCookie.expiresAt) {
                // Cookie is expired, delete it
                csDeleteCookie(cookieName);
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("Error checking cookie validity:", error);
        return false;
    }
}

/**
 * Clean up expired cookies (call this on app initialization)
 * @returns {void}
 */
export function cleanupExpiredCookies() {
    isCookieValid(process.env.APP_FUNCTIONS_COOKIE_NAME);
}
