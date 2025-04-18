'use client'

import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from "react";
import cities from "@/common/Data/cities";
import { useMapEvents } from "react-leaflet";

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
const Map = ({coordinatePopUp, ...props}) => {

    const [mapReady, setMapReady] = useState(false);

    if(typeof window === 'undefined'){
        return <></>
    }

    const [clientSide, setClientSide] = useState(false);

    const defaultCity = cities.rouyn;


    const MapContainer = dynamic(
        () => import('react-leaflet').then((mod) => mod.MapContainer),
        { ssr: false }
    );

    const TileLayer = dynamic(
        () => import('react-leaflet').then((mod) => mod.TileLayer),
        { ssr: false }
    );

    const Marker = dynamic(
        () => import('react-leaflet').then((mod) => mod.Marker),
        { ssr: false }
    );

    const Popup = dynamic(
        () => import('react-leaflet').then((mod) => mod.Popup),
        { ssr: false }
    );

    // UseEffect pour charger Leaflet CSS et personnaliser l'icône du marqueur
    useEffect(() => {
        // On définit le marqueur personnalisé uniquement côté client
        try {
            // Résoudre l'import de leaflet
            import('leaflet').then(L => {
                // Personnaliser l'icône du marqueur
                delete L.Icon.Default.prototype._getIconUrl;

                L.Icon.Default.mergeOptions({
                    iconUrl: '/marker-icon.png',
                    iconRetinaUrl: '/marker-icon.png',
                    shadowUrl: '/marker-icon-ombra.png',
                    iconSize:     [25,34],//[51,69],
                    shadowSize:   [30, 40],//[50, 64],
                    iconAnchor:   [12, 34],//[5, 74],
                    shadowAnchor: [12, 40],//[4, 62],
                    popupAnchor:  [0, -34]//[22, -74]
                });

                //Add markers to the map
                addMarkers(props?.locationList);

                // Indiquer que la carte est prête à être rendue
                setMapReady(true);
            });
        } catch (error) {
            console.error('Erreur lors du chargement de Leaflet:', error);
        }
    }, []);

    //Popup latitude and longitude onClick
    function LocationMarker() {
        if(coordinatePopUp){
            const [position, setPosition] = useState(null);
            useMapEvents({
                click(e) {
                    setPosition(e.latlng)
                    if(props.setLatLng)
                        props.setLatLng(e.latlng)
            }})
        
            return position === null ? null : (
                <Popup position={position} onClose={() => setPosition(null)}>
                    <div>
                        {props.coordinateMsg ?? "Vous avez cliquer à"} <br />
                        <strong>Latitude:</strong> {position.lat.toFixed(5)} <br />
                        <strong>Longitude:</strong> {position.lng.toFixed(5)}
                    </div>
                </Popup>
            )
        }
    }


    const mapStyle = { height: props.height ?? '700px', width: props.width ?? '100%'}

    // Retourner null si la carte n'est pas encore prête
    if (!mapReady) {
        return <div style={mapStyle} className="loading-map">Chargement de la carte...</div>;
    }

    function addMarkers(locationArray){
        let markersArray = [];
        if(locationArray != undefined && Array.isArray(locationArray) && locationArray.length > 0){
            locationArray.forEach((elem) => {
                if(elem?.location?.latitude != undefined && typeof(elem.location.latitude) == "string" &&
                elem?.location?.longitude != undefined && typeof(elem.location.longitude) == "string")
                //Add marker to array
                markersArray.push(addMarker(elem.location.latitude, elem.location.longitude, elem?.name))
            });
        }
        return markersArray;
    }
    function addMarker(lat, lon, name) {
        let displayName = name != undefined ? name : `Lieu à ${lat + ", " + lon}`
        return (
            <Marker position={[lat,lon]}>
                <Popup>
                    {displayName}
                </Popup>
            </Marker>
        );
    }

    return (
        <div className={props.className} id="map" style={mapStyle}>
            <MapContainer center={props?.centerAt ?? defaultCity.coords} zoom={defaultCity.zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                {addMarkers(props?.locationList)}
                {/*  <Marker position={defaultCity.coords}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    )
}
export default Map;