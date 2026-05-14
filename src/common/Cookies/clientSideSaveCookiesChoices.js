import csSetCookie from "@/common/Cookies/clientSideSaveCookie";
import { COOKIES_CHOICE } from "@/common/Cookies/cookiesChoices";

const csSaveCookieChoices = async (choices) => {
    await csSetCookie(`${COOKIES_CHOICE}`, JSON.stringify(choices), {
        expires: 72 * 60 * 60, // Expires in 3 day//*1000 is done in csSetCookie.
        path: "/", // Cookie available in all paths
        domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
        secure: true, // Cookie will only be sent over HTTPS
        sameSite: "Lax", //'strict' // Restricts cookie to same-site requests
    });
};
export { csSaveCookieChoices };
