import { useState } from 'react';
import {useHttpClient} from './http-hook'

export default function useApi() {

    const {sendRequest} = useHttpClient();

    const [apiUp, setApiUp] = useState(false);

    const pingApi = async () => {
        try {
            const res =  await sendRequest(
                "/ping",
                'POST',
                JSON.stringify({}),
                { 'Content-Type': 'application/json' }
            );
            if (res !== undefined && res.data["/ping"] === "OK")
                setApiUp(true);
            else
                setApiUp(false); // Set as api is not up

        } catch (error) {
            setApiUp(false);
            console.error(error);
        }
        return apiUp;
    }
}