//import cookie from "@utils/cookies";
//import {serialize} from "cookie";

//  @deprevated for now.

// inspire by this : https://javascript.plainenglish.io/next-js-using-cookies-in-getserversideprops-89c03a216b0b
// l'article utilise : https://www.npmjs.com/package/next-cookie pour écrire dans le context nextjs. à voir ce que ça prend.

/*const cookieWrapper = handler =>
{
    return (req, res, next) => {
        res.cookieArray = [];
        res.cookie = (name, value, options) => {
            cookie(res, name, value, options);
        };
        res.sendCookies = () => {
            res.setHeader('set-cookie', res.cookieArray);
        };
        return handler(req, res, next);
    };
};


const cookie = (res, name, value, options={}) => {

    options.path = options.path ?? "/";
    options.maxAge = options.maxAge ?? "/";
    options.expires = options.expires ?? "/";

    const stringValue = (typeof value === "object") ? "j:" + JSON.stringify(value) : String(value);

    if ("maxAge" in options) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000;
    }

    if (!value) {
        options.expires = new Date((Date.now()-1000));
    }

    // if we do not pass an empty string as a value, it deletes the cookie
    if (value) {
        res.cookieArray.push(serialize(name, String(stringValue), options));
    } else {
        res.cookieArray.push(serialize(name, "", options));
    }
}
export default cookie;*/