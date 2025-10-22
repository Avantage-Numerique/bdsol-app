import { cookies } from "next/headers";

export const FLASHMESSAGE_COOKIE_NAME = "app-toast";

/**
 * Add 1 message into a temp cookie about it.
 * @param {Message} flashMessage
 * @returns {Promise<void>}
 */
export async function addFlashMessage(flashMessage) {
    const cookieStore = await cookies();
    cookieStore.set(FLASHMESSAGE_COOKIE_NAME, JSON.stringify(flashMessage), {
        path: "/",
        maxAge: 10, // Short-lived: 5 seconds
        httpOnly: false, // Must be readable by client
    });
}
