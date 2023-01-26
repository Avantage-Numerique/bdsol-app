import { useEffect } from 'react';
import {pingExternalApi} from "@/src/api/external/callbacks/pingExternalApi";

export default function useApi(connectedSetter) {
    const pingApi = async () => {
        const isApiUp = await pingExternalApi();
        return connectedSetter(isApiUp);
    }
    useEffect( () => {
        pingApi();
        setInterval( async () => pingApi(), Number(process.env.PING_INTERVAL));
    }, []);
}