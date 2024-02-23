import csSetCookie from "@/common/Cookies/clientSideSaveCookie";

const csSaveCookieChoices = async (choices) => {
    await csSetCookie('avnuCookies', JSON.stringify(choices), {
        expires: 24*60*60*1000, // Expires in 1 day
        path: '/',     // Cookie available in all paths
        domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
        secure: true,  // Cookie will only be sent over HTTPS
        sameSite: 'strict' // Restricts cookie to same-site requests
    });
};
export {csSaveCookieChoices};