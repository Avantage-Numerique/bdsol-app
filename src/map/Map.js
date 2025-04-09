'use client'

import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from "react";
import cities from "@/common/Data/cities";

/**
 * React leaflet Client only cmponent to use leaflet with React leaflet package.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Map = (props) => {

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
                    iconSize:     [51,69],
                    shadowSize:   [50, 64],
                    iconAnchor:   [5, 74],
                    shadowAnchor: [4, 62],
                    popupAnchor:  [22, -74]
                });

                // Indiquer que la carte est prête à être rendue
                setMapReady(true);
            });
        } catch (error) {
            console.error('Erreur lors du chargement de Leaflet:', error);
        }
    }, []);


    const mapStyle = { height: props.height ?? '700px', width: props.width ?? '100%'}

    // Retourner null si la carte n'est pas encore prête
    if (!mapReady) {
        return <div style={mapStyle} className="loading-map">Chargement de la carte...</div>;
    }

    return (
        <div className={props.className} id="map" style={mapStyle}>
            <MapContainer center={defaultCity.coords} zoom={defaultCity.zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={defaultCity.coords}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
export default Map;