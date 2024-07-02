import {useHttpClient} from "@/src/hooks/http-hook";
import React, {useEffect, useState} from "react";
import {lang} from "@/common/Data/GlobalConstants";
import Button from "../Button/Button";
import Link from "next/link";

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
                            <a href={licences[licenceKey].source} target="_blank">
                                <img src={licences[licenceKey].image} alt={licences[licenceKey].label} />
                                <span className={"ps-2"}>{licences[licenceKey].label}</span>
                            </a>
                        </div>
                        <div>
                            <p>
                                {licences[licenceKey].description}
                            </p>
                        </div>
                    </div>
                    <div className={"pt-2"}>
                        <Link href={"/faq/licences"} title={lang.licenceDetails}>
                            <Button className="btn btn-sm">
                                {lang.licenceDetails}
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default LicenceDisplay;