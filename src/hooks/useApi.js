import { useEffect } from 'react';
import {externalApiRequest} from './http-hook';

export default function useApi(connectedSetter) {
    const pingApi = async () => {
        try {
            const res = await externalApiRequest(
                "/ping",
                {
                    body: "{}"
                }
            );
            if (res !== undefined && res.data["/ping"] === "OK")
                return connectedSetter(true);
            else
                return connectedSetter(false); // Set as api is not up

        } catch (error) {
            return connectedSetter(false);
        }
    }
    useEffect( () => {
        pingApi();
        setInterval( async () => pingApi(), 5000);
    }, []);
}