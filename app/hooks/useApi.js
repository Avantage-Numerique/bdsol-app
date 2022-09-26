import { sendExternalApiRequest } from '../hooks/http-hook';

export default async function useApi(connectedSetter) {
    const pingApi = async () => {
        try {
            const res = await sendExternalApiRequest(
                "/ping",
                'POST',
                JSON.stringify({})
            );
            if (res !== undefined && res.data["/ping"] === "OK")
                connectedSetter(true);
            else
                connectedSetter(false); // Set as api is not up

        } catch (error) {
            connectedSetter(false);
        }
    }
    
    pingApi();
}