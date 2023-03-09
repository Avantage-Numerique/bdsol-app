
import { useHttpClient } from "@/src/hooks/http-hook";
import { useEffect, useState } from "react";

const LicenceDisplay = ({licenceKey, ...props}) => {

    const [licences, setLicences] = useState(undefined);
    const { sendRequest } = useHttpClient();

    useEffect( () => {
        const fetchLicences = async () =>
        {
            //Send the request with the specialized hook
            const response = await sendRequest(
                '/static/licences/',
                'GET',
                null
            );
            //If response is positive, update the state
            if (!response.error) {
                setLicences(response.data)
            }
        }
        fetchLicences();
    }, [])

    return (
        <>
            {
                licences &&
                <div>
                    <div className="d-flex">
                        <a href={licences[licenceKey].source} target="_blank">
                            <img src={licences[licenceKey].image}/>
                            <>{licences[licenceKey].label}</>
                        </a>
                        <div>{licences[licenceKey].description}</div>
                    </div>
                    <div>
                        <a href="/faq/licences" target="_blank">Plus de détails sur les licences</a>
                    </div>
                </div>
            }
        </>
    )
}

export default LicenceDisplay;