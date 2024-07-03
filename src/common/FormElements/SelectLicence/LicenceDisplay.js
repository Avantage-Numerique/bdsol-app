import {useHttpClient} from "@/src/hooks/http-hook";
import React, {useEffect, useState} from "react";
import {RouteLink} from "@/common/Components/RouteLink";

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
                licences && licences[licenceKey] && licences[licenceKey].source &&
                <div className={"pt-2"}>
                    <div className="d-flex">
                        <div>
                            <RouteLink routeName={"licences"} uriSuffix={`#${licences[licenceKey].slug}`}>
                                <img src={licences[licenceKey].image} alt={licences[licenceKey].label} />
                                <span className={"ps-2"}>{licences[licenceKey].label}</span>
                            </RouteLink>
                        </div>
                        <div>
                            <p>
                                {licences[licenceKey].description}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LicenceDisplay;