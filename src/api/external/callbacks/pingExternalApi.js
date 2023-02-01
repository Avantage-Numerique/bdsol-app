import {externalApiRequest} from "@/src/hooks/http-hook";

export const pingExternalApi = async (params={}) => {
    try {
        const res = await externalApiRequest(
            "/ping",
            {
                body: "{}",
                ...params
            }
        );
        return res !== undefined && res.data["/ping"] === "OK";

    } catch (error) {
        return false;
    }
}