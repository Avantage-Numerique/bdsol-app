import { useEffect, useState } from "react";
import Head from "next/head";

/**
 * Used to diplay Leaflet map
 * 
 * Props :
 * - className transfer className props to map
 * - locationList : locationList needs to be an array of objects, containing each location object with "latitude" and "longitude" field.
 * - height : in pixels for the size
 * - centerAt : Centers the map on the latitude and longitude given format : [48.236,-79.015]
 * 
 * - coordinatePopUp allows the map to be clickable and show latitude and longitude of click position.
 * - coordinateMsg Add a message to the popup showing latitude and longitude on click
 * - setLatLon setter for latitude and longitude of clicked position.
 */
const MapComponent = ({locationList, coordinatePopUp, ...props}) => {

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const defaultView = [48.236,-79.015];
    const defaultZoom = 14;

    useEffect(() => {
        const mapInstance = L.map('map').setView((props.centerAt ?? defaultView), defaultZoom); // Map position and zoom   
        //Tile layer for showing the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        setMap(mapInstance);

        //Cleanup function to remove map on unmount ?
        return () => { mapInstance.remove(); }
    }, []);

    useEffect( () => { console.log(markers); }, [markers])

    useEffect( () => {
        if(map){
            //Marker for each location that has latitude and longitude
            addMarkers(locationList);
            console.log(map)
            //var marker = L.marker([48.23, -79.0]).addTo(map);
            /*var circle = L.circle([48.236, -79.023], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.09,
                radius: 5500
            }).addTo(map);
            var polygon = L.polygon([
                [48.28, -79.09],
                [48.18, -79.09],
                [48.18, -79.02]
            ]).addTo(map);
            circle.bindPopup("I am a circle.");
            polygon.bindPopup("I am a polygon.");*/
            if(coordinatePopUp){
                const popupMsg = props.coordinateMsg ? "<br/>" + props.coordinateMsg : "";
                var popup = L.popup();
                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(e.latlng.toString() + popupMsg)
                        .openOn(map);
                    //if setLatLng exist, set the value with setter
                    if(props.setLatLng){
                        props.setLatLng(e.latlng)
                    }
                }
                map.on('click', onMapClick);
            }
        }
    }, [locationList]);
  
    function addMarkers(locationArray){
        if(locationArray != undefined && Array.isArray(locationArray) && locationArray.length > 0){
            locationArray.forEach((elem) => {
                if(elem?.location?.latitude != undefined && typeof(elem.location.latitude) == "string" &&
                elem?.location?.longitude != undefined && typeof(elem.location.longitude) == "string")
                addMarker(elem.location.latitude, elem.location.longitude, elem?.name)
            });
        }
    }
    function addMarker(lat, lon, name) {
        let displayName = name != undefined ? name : `Lieu à ${lat + ", " + lon}`
        var marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${displayName}`).openPopup();
        setMarkers([...markers, marker]);
    }

    function removeAllMarkers(){

    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossorigin=""/>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                    crossorigin=""></script>
            </Head>
            <div className={props.className} id="map" style={{ height: props.height ?? '700px'}}></div>
        </>
    );
}

export default MapComponent;