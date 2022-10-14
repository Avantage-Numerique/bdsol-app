import {externalApiRequest} from "@/src/hooks/http-hook";

export const verifyToken = async (token) => {
    return await externalApiRequest(
        "/verify-token",
        {
            body: JSON.stringify({token: token}),
            origin: "fromserver"
        }
    );
}