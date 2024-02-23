function csSetCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;
    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

export default csSetCookie;

/**
 * Exemple
 *
 * setCookie('test_cookie', 'example_value', {
 *     expires: 3600, // Expires in 1 hour
 *     path: '/',     // Cookie available in all paths
 *     domain: 'example.com', // Limit cookie to a specific domain
 *     secure: true,  // Cookie will only be sent over HTTPS
 *     sameSite: 'strict' // Restricts cookie to same-site requests
 * });
 */