import AppRoutes from "@/src/Routing/AppRoutes";
import { Marker, Popup } from "./DynamicMapParts";

export function addMarkers(locationArray) {
    let markersArray = [];
    if (locationArray != undefined && Array.isArray(locationArray) && locationArray.length > 0) {
        locationArray.forEach((elem, index) => {
            if (
                elem?.latitude != undefined &&
                typeof elem.latitude == "string" &&
                elem?.longitude != undefined &&
                typeof elem.longitude == "string"
            )
                //Add marker to array
                markersArray.push(addMarker(elem.latitude, elem.longitude, elem?.name, elem.slug, index));
        });
    }
    return markersArray;
}

export function addMarker(lat, lon, name, slug, index) {
    let displayName = name != undefined ? name : `Lieu à ${lat + ", " + lon}`;
    return (
        <Marker key={"map-marker-" + index} position={[lat, lon]}>
            <Popup>
                {slug ? <a href={AppRoutes.places.asPath + "/" + slug}>{displayName}</a> : <div>{displayName}</div>}
            </Popup>
        </Marker>
    );
}
