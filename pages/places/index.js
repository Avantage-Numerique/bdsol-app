import React, {useCallback, useContext, useEffect, useState} from 'react'

//components
import PageHeader from "@/src/layouts/Header/PageHeader";
import Spinner from '@/src/common/widgets/spinner/Spinner'


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
            "places": lang.Places,
        }[param];
    }, []);

    return (

        <div>
            <Head>
                <title>{getTitle([type.labelPlural])}</title>
            </Head>
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"Consulter les lieux"}
                description="Les lieux listés peuvent être liés à des événements, des organisations ou d'autre entité du milieu culturel."
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.places} getLabelGenerator={getLabelGenerator} />
            </PageHeader>

                <div className="container">
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
                                <EntitiesGrid className="position-relative row row-cols-1 row-cols-sm-2 row-cols-xl-3" columnClass={"col g-3"} feed={placeList}/>
                            }
                        </section>
                    </div>
                </div>

                    
                
        </div>
    )
}

export default PlacesPage