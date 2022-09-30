import {sendExternalApiRequest} from "@/src/hooks/http-hook";

export const verifyToken = async (token) => {
    return await sendExternalApiRequest(
        "/verify-token",
        'POST',
        JSON.stringify({
            token: token
        }),
        undefined,
        undefined,
        true,
        "fromserver"
    );
}