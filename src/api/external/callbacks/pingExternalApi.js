import {externalApiRequest} from "@/src/hooks/http-hook";

export const pingExternalApi = async () => {
    try {
        const res = await externalApiRequest(
            "/ping",
            {
                body: "{}"
            }
        );
        return res !== undefined && res.data["/ping"] === "OK";

    } catch (error) {
        return false;
    }
}