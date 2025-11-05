import { csSetCookie, csGetCookie, isCookieValid } from "@/common/Cookies/clientSideCookies";
import { isProd } from "@/src/helpers/configHelper";

const flashMessagesDuration = 60;
const flashMessagesOptions = {
    expires: flashMessagesDuration, // Expires in 3 day//*1000 is done in csSetCookie.
    path: "/", // Cookie available in all paths
    domain: process.env.APP_BASE_URL, // Limit cookie to a specific domain
    secure: isProd, // Cookie will only be sent over HTTPS
    sameSite: "Lax", //'strict' // Restricts cookie to same-site requests
};

/**
 * Get flash messages if cookie is valid, otherwise return empty array
 * @returns {Array}
 */
export function getFlashMessages() {
    console.log("Getting flash messages", isCookieValid(process.env.APP_FUNCTIONS_COOKIE_NAME));
    if (!isCookieValid(process.env.APP_FUNCTIONS_COOKIE_NAME)) {
        return [];
    }

    try {
        const cookieValue = csGetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME);
        const parsedCookie = JSON.parse(cookieValue);
        return parsedCookie.flashMessages || [];
    } catch (error) {
        console.error("Error getting flash messages:", error);
        return [];
    }
}

/**
 * Add 1 message into a temp cookie about it.
 * @param {Message} flashMessage
 * @returns {Promise<void>}
 */
export async function pushFlashMessage(flashMessage) {
    const existingMessages = getFlashMessages();

    const toFunctionCookie = {
        flashMessages: [...existingMessages, flashMessage],
    };

    await csSetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME, toFunctionCookie, flashMessagesOptions);
}

/**
 * Remove all the message in the cookie : function.
 * @returns {Promise<void>}
 */
export async function clearFlashMessages() {
    const toFunctionCookie = {
        flashMessages: [],
    };
    await csSetCookie(process.env.APP_FUNCTIONS_COOKIE_NAME, toFunctionCookie, flashMessagesOptions);
}
