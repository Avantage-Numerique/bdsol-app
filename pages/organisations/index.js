import React, {useCallback, useContext, useEffect, useState} from 'react'

//components
import PageHeader from "@/src/layouts/Header/PageHeader";
import Button from '@/src/common/FormElements/Button/Button'
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
import Head from "next/head";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import {getType, TYPE_ORGANISATION} from "@/DataTypes/Entity/Types";


const OrganisationsPage = () => {

    const [ orgList, setOrgList ] = useState([]);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    const type = getType(TYPE_ORGANISATION);
    /* 
        Fetch data
    */
    const fetchData = async () => {

        //Send the request with the specialized hook
        const orgResponse = await sendRequest(
            "/organisations/list",
            'POST',
            JSON.stringify({"data": {"sort": "desc"}}),
            {'Content-Type': 'application/json'}
        )

        //If positive
        if (!orgResponse.error) { 
            setOrgList(orgResponse.data)
        } else {
            msg.addMessage({
                text: "Une erreur est survenue et nous n'arrivons pas à afficher les fiches d'organisations. Veuillez réessayer.",
                positive: false
            })
        }
    }

    useEffect(() => { fetchData() }, [])


    const getLabelGenerator = useCallback((param, query) => {
        return {
            "organisations": "Organisations",
        }[param];
    }, []);

    return (
        <div>
            <Head>
                <title>{getTitle([type.labelPlural])}</title>
            </Head>
            <PageHeader
                bg={"bg-purplelighter"}
                textColor={"text-white"}
                htmlTitle={"Consulter les organisations"}
                subTitle={"Les organisations présentées ici travaillent avec les technologies numériques et se trouvent sur le territoire du Croissant boréal."}
            >
                <Breadcrumbs className={"pt-2"} route={AppRoutes.organisations} getLabelGenerator={getLabelGenerator} />
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
                                orgList.length === 0 && !isLoading &&
                                <div>
                                    <h5>{lang.noResult}</h5>
                                </div>
                            }
                        </div>

                        {/*  Show the feed in the EntitiesGrid component. It manages an empty list in it, but it make it more readable to show it here too */}
                        {
                            orgList.length > 0 && !isLoading &&
                            <EntitiesGrid className="position-relative row row-cols-1 row-cols-sm-2 row-cols-xl-3" columnClass={"col g-3"} feed={orgList}/>
                        }
                    </section>

                    {/* Aside section */}
                    <aside className="col col-12 col-md-3">
                        <div className="my-4">
                            <Button
                                disabled={!auth.user.isLoggedIn}
                                href="/contribuer/organisations"
                                size="reg-100">
                                    Ajouter une organisation
                            </Button>

                            {
                                !auth.user.isLoggedIn &&
                                <p className="mt-2">
                                    Notez que vous devez être <b className="text-primary">connecté</b> pour pouvoir ajouter des entitées à la base de données.
                                </p>
                            }
                        </div>
                        <hr />
                            {   !auth.user.isLoggedIn &&

                                <>
                                <Button
                                    size="reg-100"
                                    href="/compte/connexion"
                                >Se connecter</Button>

                                <hr />
                                </>
                            }
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default OrganisationsPage