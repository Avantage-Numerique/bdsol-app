import {externalApiRequest} from "@/src/hooks/http-hook";

export const getLicencesData = async (params={}) => {
    try {
        const res = await externalApiRequest(
            "/static/licences",
            {
                method: "GET",
                origin: "browser",
                isBodyJson: false,
                ...params
            }
        );
        return res ? res.data : {};

    } catch (error) {
        throw error;
    }
}