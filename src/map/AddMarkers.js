import AppRoutes from "@/src/Routing/AppRoutes";
import { Marker, Popup } from "./DynamicMapParts";
import Place from "../DataTypes/Place/models/Place";

export function addMarkers(locationArray) {
    let markersArray = [];
    if (locationArray != undefined && Array.isArray(locationArray) && locationArray.length > 0) {
        locationArray.forEach((elem, index) => {
            const { latitude, longitude, name, postalAddress, slug } = elem;
            if (
                latitude != undefined &&
                typeof latitude == "string" &&
                longitude != undefined &&
                typeof longitude == "string"
            )
                //Add marker to array
                markersArray.push(addMarker({ latitude, longitude, name, slug, postalAddress, index }));
        });
    }
    return markersArray;
}

export function addMarker({ latitude, longitude, name, slug, postalAddress, index }) {
    /**
     * @param {Place['postalAddress']} postalAddress
     */
    const addressToText = (postalAddress) => `${postalAddress.address}, ${postalAddress.city}`;

    let displayName =
        name != undefined ? `${name}\n${addressToText(postalAddress)}` : `Lieu à ${latitude + ", " + longitude}`;
    return (
        <Marker key={"map-marker-" + index} position={[latitude, longitude]}>
            <Popup>
                {slug ? (
                    <a href={AppRoutes.places.asPath + "/" + slug} style={{ whiteSpace: "pre" }}>
                        {displayName}
                    </a>
                ) : (
                    <div>{displayName}</div>
                )}
            </Popup>
        </Marker>
    );
}
