import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";

export const getLicencesData = async (params={}) => {
    try {
        const res = await clientSideExternalApiRequest(
            "/static/licences",
            {
                method: "GET",
                isBodyJson: false,
                ...params
            }
        );
        return res ? res.data : {};

    } catch (error) {
        throw error;
    }
}