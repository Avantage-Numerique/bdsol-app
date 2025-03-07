import { useEffect, useState } from "react";
import Head from "next/head";

/**
 * Used to diplay Leaflet map
 * markersCoordinate needs to be an array of objects, containing each location object with "latitude" and "longitude" field.
 */
const MapComponent = ({locationList, ...props}) => {

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const mapInstance = L.map('map').setView([48.236,-79.015], 14); // Map position and zoom   
        //Tile layer for showing the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);
        setMap(mapInstance);

        //Cleanup function to remove map on unmount ?
        return () => {
            mapInstance.remove();
        }

    }, []);

    useEffect( () => {
        //Marker for each location that has latitude and longitude
        addMarkers(locationList);
                
    /*  var marker = L.marker([48.23, -79.0]).addTo(map);
        var circle = L.circle([48.236, -79.023], {
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
        
        /* var popup = L.popup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }
        map.on('click', onMapClick); */
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
        setMarkers()
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
            <div id="map" style={{ height: '700px'}}></div>
        </>
    );
}

export default MapComponent;