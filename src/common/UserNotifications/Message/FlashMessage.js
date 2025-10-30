import { csSetCookie } from "@/common/Cookies/clientSideSaveCookie";

const flashMessagesDuration = 60;
const flashMessagesOptions = {
    expires: flashMessagesDuration, // Expires in 3 day//*1000 is done in csSetCookie.
    path: "/", // Cookie available in all paths
    domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
    secure: true, // Cookie will only be sent over HTTPS
    sameSite: "Lax", //'strict' // Restricts cookie to same-site requests
};

/**
 * Add 1 message into a temp cookie about it.
 * @param {Message} flashMessage
 * @returns {Promise<void>}
 */
export async function pushFlashMessage(flashMessage) {
    const toFunctionCookie = {
        flashMessages: [...flashMessage],
    };
    await csSetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME, JSON.stringify(toFunctionCookie), flashMessagesOptions);
}

/**
 * Remove all the message in the cookie : function.
 * @returns {Promise<void>}
 */
export async function clearFlashMessages() {
    const toFunctionCookie = {
        flashMessages: [],
    };
    await csSetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME, JSON.stringify(toFunctionCookie), flashMessagesOptions);
}
