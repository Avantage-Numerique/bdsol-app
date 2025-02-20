import React, {useCallback, useContext, useEffect, useState} from 'react'

//components
import PageHeader from "@/src/layouts/Header/PageHeader";
import Spinner from '@/src/common/widgets/spinner/Spinner'
import PageMeta from "@/src/common/PageMeta/PageMeta";


//Costum hooks
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {useAuth} from '@/src/authentification/context/auth-context';

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import AppRoutes from "@/src/Routing/AppRoutes";
import EntitiesGrid from "@/DataTypes/Entity/layouts/EntitiesGrid";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import Head from "next/head";
import {getType, TYPE_PLACE} from "@/DataTypes/Entity/Types";



const PlacesPage = () => {

    const [ placeList, setPlaceList ] = useState([]);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    const type = getType(TYPE_PLACE);
    /* 
        Fetch data  
        
    */
    const fetchData = async () => {

        //Send the request with the specialized hook
        const placeResponse = await sendRequest(
            "/places/list",
            'POST',
            JSON.stringify({"data": {"sort": "desc"}}),
            {'Content-Type': 'application/json'}
        )

        //If positive
        if (!placeResponse.error) { 
            setPlaceList(placeResponse.data)
        } else {
            msg.addMessage({
                text: "Une erreur est survenue et nous n'arrivons pas à afficher les fiches de lieux. Veuillez réessayer.",
                positive: false
            })
        }
    }

    useEffect(() => { fetchData() }, [])

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "lieux": lang.Places,
        }[param];
    }, []);

    const MapComponent = () => {
        useEffect(() => {
            // La variable L est maintenant accessible car Leaflet est chargé par le CDN
            const map = L.map('map').setView([48.236,-79.023], 13); // Position de la carte et zoom
      
            // Ajouter un fond de carte (par exemple OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var marker = L.marker([48.23, -79.0]).addTo(map);
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
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
            circle.bindPopup("I am a circle.");
            polygon.bindPopup("I am a polygon.");
            var popup = L.popup();
            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
            }
            map.on('click', onMapClick);
        }, []);
      
        return (
          <div id="map" style={{ height: '400px'}}></div> // Div pour la carte avec une hauteur définie
        );
    };


    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossorigin=""/>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                    crossorigin=""></script>
            </Head>

            <PageMeta 
                title={getTitle([type.labelPlural])}
                description={lang.places__description}
            />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"Consulter les lieux"}
                description="Les lieux listés peuvent être liés à des événements, des organisations ou d'autre entité du milieu culturel."
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.places} getLabelGenerator={getLabelGenerator} />
            </PageHeader>
                <div className="container">
                <MapComponent/>
                    <div className="row my-4 py-4">

                        {/* Feed section */}
                        <section className="col col-12 col-md-9">

                            <div className="position-relative row row-cols-1 row-cols-sm-2 row-cols-xl-3">

                                {/* Loading state : If loading is on and there is no feed */}
                                {
                                        isLoading &&
                                        <div className={"home-page__feed-section--spinner-container"}>
                                            <div>
                                                <Spinner reverse/>
                                            </div>
                                            <p><strong>{lang.loadingData}</strong></p>
                                        </div>
                                }

                                {/* If there is no loading state and no feed, go on that by default */}
                                {
                                    placeList.length === 0 && !isLoading &&
                                    <div>
                                        <h5>{lang.noResult}</h5>
                                    </div>
                                }
                            </div>

                            {/*  Show the feed in the EntitiesGrid component. It manages an empty list in it, but it make it more readable to show it here too */}
                            {
                                placeList.length > 0 && !isLoading &&
                                <EntitiesGrid className="position-relative row row-cols-1 row-cols-sm-2 row-cols-xl-3" feed={placeList}/>
                            }
                        </section>
                    </div>
                </div>

                    
                
        </div>
    )
}

export default PlacesPage