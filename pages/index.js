import React, {useContext, useEffect, useState} from 'react';

import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import {lang} from "@/src/common/Data/GlobalConstants";

//components
import Button from '@/src/common/FormElements/Button/Button'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import {sortDescBy} from "@/src/common/Data/Sorting/Sort";
import PageHeader from "@/src/layouts/Header/PageHeader";
import EntitiesGrid from "@/DataTypes/Entity/layouts/EntitiesGrid";

//Entities
//Costum hooks
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {useAuth} from '@/src/authentification/context/auth-context';
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import {appUrl} from "@/src/helpers/url";
import {
    getType,
    TYPE_EQUIPMENT,
    TYPE_EVENT,
    TYPE_ORGANISATION,
    TYPE_PERSON,
    TYPE_PROJECT
} from "@/DataTypes/Entity/Types";

//Styling
//import styles from './home-page.module.scss'

const HomePage = ({}) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Holds the state the organisations
    const [feedList, setFeedList] = useState([]);

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest, setIsLoading} = useHttpClient();

    const fetchHomeFeed = async () => {


        const listQuery = {"sort": "desc"};//{"sort": {"updatedAt": -1}}; //{};//
        const defaultHeader = {'Content-Type': 'application/json'};
        const entities = [
            {
                path:"/organisations/list",
                queryParams: listQuery,
                result: {}
            },
            {
                path:"/persons/list",
                queryParams: listQuery,
                result: {}
            },
            {
                path:"/projects/list",
                queryParams: listQuery,
                result: {}
            },
            {
                path:"/events/list",
                queryParams: listQuery,
                result: {}
            }
        ];

        let haveError = false;
        let feed = [];

        const feedPromises = entities.map(async (query) => {

            const currentResult = await sendRequest(
                query.path,
                'POST',
                JSON.stringify({"data": query.queryParams}),
                defaultHeader
            );
            setIsLoading(true);//bypass the sendRequest setting of isLoading, because of all these promises here.
            query.result = currentResult;

            haveError = haveError && !currentResult.error;
            return currentResult;

        });

        Promise.all(feedPromises).then((entitiesResults) => {
            entitiesResults.map(async (result) => {

                //populate the feed if the current request return a success (!error)
                if (!result.error && result?.data?.length > 0) {
                    feed = [...feed, ...result.data];
                }

                //Show a message if the query return and error.
                if (result.error) {
                    msg.addMessage({
                        text: result.message,
                        positive: false
                    });
                }

                if (feed.length > 0 && !haveError) {
                    feed.sort(sortDescBy('createdAt'));//   Sort and mixed both collection the data to display the new elements before
                    setFeedList(feed); //   Finaly, update the state to display the result
                }

                setIsLoading(true);
            });
        }).then(() => {
            setIsLoading(false);//when all finishes, set this to false.
        });
    }

    //Fetch the data 
    useEffect(() => {
        fetchHomeFeed();
    }, [])

    //Function to return the path to the page of creation of an entity, depending on location
    const getCreateEntityPath = (type) => {

        //Get the model by type
        let targetType = getType(type);

        //type.model is undefined at init, so checking if it's set ? If not set it.
        if (typeof targetType.model === "undefined") {
            const ModelClass = targetType.modelClass;
            targetType.model = new ModelClass({});
        }
        //returning the asPath from the createRoute.
        return targetType.model.createRoute.asPath;
    }

    /****************************
     LD+Json data
     ****************************/
    const schema = {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        name: lang.appDefaultName,//"Ontologie - Avantage Numérique",
        description: lang.appDefaultDescription,//"Base de donnée ouverte et liée crée par Avantage Numérique et qui recense les techno-créatifs sur le territoire du Croissant boréal.",

        producer: {
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: lang.appDefaultProducer,//"Avantage Numérique",
            description: lang.appDefaultDescription,//"Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
            mainEntityOfPage: "https://avantagenumerique.org/"
        }
    }

    return (
        <div className={"home-page"}>

            {/* Page head element  */}
            <Head>
                <title>{lang.appDefaultName}</title>

                {/* Keywords and description to evaluate */}
                <meta name="description"
                      content={lang.appDefaultDescription}/>
                <meta name="keywords"
                      content={lang.appDefaultKeywords}/>

                {/* social media meta tag */}
                <meta property="og:title" content={lang.appDefaultName}/>
                <meta property="og:description" content={lang.appDefaultDescription}/>
                <meta property="og:url" content={appUrl()} />
                <meta property="og:site_name" content="BDSOL avantage numérique" />
                <meta property="og:locale" content="fr_CA" />

                <meta name="twitter:title" content={lang.appDefaultName}/>
                <meta name="twitter:description" content={lang.appDefaultDescription}/>

                <meta property="og:image" content={appUrl("/meta-images/show_screen_shot.jpg")} />
                <meta property="og:image:alt" content="Public assistant à une performance qui contient des nouvelles technologies." />
                <meta property="og:image:width" content="2560" />
                <meta property="og:image:height" content="1345" />
                <meta property="og:locale" content="fr_CA" />

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={appUrl("/meta-images/show_screen_shot.jpg")} />
                <meta name="twitter:image:alt" content="Public assistant à une performance qui contient des nouvelles technologies."/>
                <meta name="twitter:image:width" content="2560" />
                <meta name="twitter:image:height" content="1345" />

                {/* To add when the domain will be selected ....
                    <link rel="canonical" href="https://avantagenumerique.org/">  */}

                {/* Structured data */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(schema))}}
                />
            </Head>

            <PageHeader
                bg={"bg-primaryextratlight"}
                textColor={"text-white"}
                title={lang.homePageTitle}
                subTitle={lang.homePageDescription}
                description=""
                image={"/general_images/Croissant-Boreal@3x-1440x1440.png"}
                imgAlt={"Carte du croissant boréal"} key={"pageHeaderHomePage"} />


            <div className="container home-page__main p-0">
                <div className="row gx-5">
                    <div className="col col-12 col-md-9 position-relative">
                        <section className="home-page__feed-section">
                            <div className={"d-flex justify-content-between content-header"}>
                                <h2>{lang.allData}</h2>
                            </div>
                            <hr />
                            {
                                <>
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
                                        feedList.length === 0 && !isLoading &&
                                        <div>
                                            <h5>{lang.noResult}</h5>
                                        </div>
                                    }
                                    {/*  Show the feed in the EntitiesGrid component. It manages an empty list in it, but it make it more readable to show it here too */}
                                    {
                                        feedList.length > 0 && !isLoading &&
                                        <EntitiesGrid className={"row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3"} columnClass={"col g-3"} feed={feedList}/>
                                    }
                                </>
                            }
                        </section>
                    </div>
                    <aside className="col col-12 col-md-3">
                        <div>
                            {/* If user is not connected, offer the option to connect itself*/}

                            {auth.user.isLoggedIn ?
                                <div className={"d-flex flex-column content-header"}>
                                    <Button color="white" outline="primary" href="/contribuer">Ajouter une donnée</Button>
                                </div>
                                :
                                <section className="d-grid content-header">
                                    <Button color="primary" href="/compte/connexion">Se connecter</Button>
                                </section>
                            }
                            <hr />
                            {!auth.user.isLoggedIn &&
                            <section className={"aside__register-option py-2"}>
                                <div className="bg-primary text-white d-flex flex-column">
                                    <h4>Pas encore de compte ?</h4>
                                    <p>Vous en aurez besoin afin de vous aussi contribuer aux données</p>
                                    <Button color="light" outline="light" href="/compte/inscription">C'est par ici !</Button>
                                </div>
                                <hr />
                            </section>
                            }
                            
                            {/*Rapid options to access of edit the database*/}
                            <section className={"aside__db-edit-options"}>

                                <div className={"db-edit-options__button-set"}>
                                    <Button 
                                        href="/persons/"
                                        size="slim" 
                                        color="primary"
                                        className={"w-100"}
                                        slim>
                                        {lang.Persons}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath(TYPE_PERSON)}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button 
                                        href="/organisations/"
                                        color="primary" 
                                        size="slim"
                                        className={"w-100"}
                                    >{lang.Organisations}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath(TYPE_ORGANISATION)}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/projets" color="primary" size="slim" className={"w-100"}>{lang.Projects}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath(TYPE_PROJECT)}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/categories" color="primary" size="slim" className={"w-100"}>{lang.Taxonomies}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href="/contribuer/categorie"
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/events" color="primary" size="slim" className={"w-100"}>{lang.Events}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath(TYPE_EVENT)}
                                    >+</Button>
                                </div>
                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/equipment" color="primary" size="slim" className={"w-100"}>{lang.Equipments}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath(TYPE_EQUIPMENT)}
                                    >+</Button>
                                </div>

                                <hr/>
                                <SanitizedInnerHtml tag={"p"}>
                                    {lang.projectInDev}
                                </SanitizedInnerHtml>
                            </section>
                            <hr />

                            {/*
                                Section : More informations about the project
                            */}
                            <section className={"d-flex flex-column"}>
                                <h4>{lang.aboutUs}</h4>
                                <p>
                                    La base de données structurées, ouvertes et liées (BDSOL) est le cœur du hub virtuel d’Avantage numérique.
                                    Elle vise à recenser et géolocaliser les talents, les compétences, les ressources, les initiatives technocréatives à travers le territoire du Croissant Boréal.
                                </p>
                                <Button classes="mt-3" color="white" outline="primary" href="/faq/a-propos">{lang.knowMore}</Button>
                            </section>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
