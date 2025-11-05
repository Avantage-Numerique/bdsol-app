import { csSetCookie } from "@/common/Cookies/clientSideCookies";
import { isProd } from "@/src/helpers/configHelper";

const csSaveCookieChoices = async (choices) => {
    await csSetCookie(process.env.APP_CHOICES_COOKIE_NAME, choices, {
        expires: 72 * 60 * 60, // Expires in 3 day//*1000 is done in csSetCookie.
        path: "/", // Cookie available in all paths
        domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
        secure: isProd, // Cookie will only be sent over HTTPS
        sameSite: "Lax", //'strict' // Restricts cookie to same-site requests
    });
};
export { csSaveCookieChoices };
