import { useEffect, useState } from "react";

//Map related
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import MapPOI from "@/src/common/Data/MapPOI";

import { MapContainer, TileLayer } from "./DynamicMapParts";
import { addMarkers } from "./AddMarkers";
import { LocationMarker } from "./LocationMarker";

/**
 * Used to diplay Leaflet map
 *
 * Props :
 * - className transfer className props to map
 * - locationList : locationList needs to be an array of objects, containing each location object with "latitude" and "longitude" field.
 * - height : in pixels for the size
 * - width : in pixels for the size
 * - centerAt : Centers the map on the latitude and longitude given format : [48.236,-79.015]
 *
 * - coordinatePopUp allows the map to be clickable and show latitude and longitude of click position.
 * - coordinateMsg Add a message to the popup showing latitude and longitude on click
 * - setLatLng setter for latitude and longitude of clicked position.
 */

/**
 * React leaflet Client only component to use leaflet with React leaflet package.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Map = ({ coordinatePopUp, ...props }) => {
    const [mapReady, setMapReady] = useState(false);

    const defaultCity = MapPOI.rouyn;

    // UseEffect pour charger Leaflet CSS et personnaliser l'icône du marqueur
    useEffect(() => {
        // On définit le marqueur personnalisé uniquement côté client
        try {
            // Résoudre l'import de leaflet
            import("leaflet").then((L) => {
                // Personnaliser l'icône du marqueur
                delete L.Icon.Default.prototype._getIconUrl;

                L.Icon.Default.mergeOptions({
                    iconUrl: "/marker-icon.png",
                    iconRetinaUrl: "/marker-icon.png",
                    shadowUrl: "/marker-icon-ombra.png",
                    iconSize: [25, 34], //[51,69],
                    shadowSize: [30, 40], //[50, 64],
                    iconAnchor: [12, 34], //[5, 74],
                    shadowAnchor: [12, 40], //[4, 62],
                    popupAnchor: [0, -34], //[22, -74]
                });

                //Add markers to the map
                addMarkers(props?.locationList);

                // Indiquer que la carte est prête à être rendue
                setMapReady(true);
            });
        } catch (error) {
            console.error("Erreur lors du chargement de Leaflet:", error);
        }
    });

    const mapStyle = { height: props.height ?? "700px", width: props.width ?? "100%" };

    // Retourner null si la carte n'est pas encore prête
    if (!mapReady) {
        return (
            <div style={{ ...mapStyle, placeItems: "center" }} className="loading-map d-grid">
                Chargement de la carte...
            </div>
        );
    }

    /**
     * expected format : [lat, lon]
     */
    function isCoordinateValid(value) {
        value = value?.map(String);

        return (
            Array.isArray(value) &&
            value.length == 2 &&
            value[0] !== undefined &&
            value[0].match(/^-?\d*(\.\d+)?$/) &&
            value[0] >= -90 &&
            value[0] <= 90 &&
            value[1] !== undefined &&
            value[1].match(/^-?\d*(\.\d+)?$/) &&
            value[1] >= -180 &&
            value[0] <= 180
        );
    }

    /**
     * number between 0 and 18
     */
    function isZoomValid(value) {
        return !Number.isNaN(value) && value >= 0 && value <= 18;
    }

    return (
        <div className={props.className} id="map" style={mapStyle}>
            <MapContainer
                center={isCoordinateValid(props?.centerAt) ? props.centerAt : defaultCity.coords}
                zoom={isZoomValid(props?.zoom) ? props.zoom : defaultCity.zoom}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                {...props}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {coordinatePopUp ? <LocationMarker props={props} /> : <></>}

                {addMarkers(props?.locationList)}
            </MapContainer>
        </div>
    );
};

export default Map;
