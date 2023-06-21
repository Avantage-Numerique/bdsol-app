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
import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";

//Costum hooks
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {useAuth} from '@/src/authentification/context/auth-context';
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";

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
    const {isLoading, sendRequest} = useHttpClient();

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
            }
        ];

        let haveError = false;
        let feed = [];

        const feedPromises = entities.map(async (query) => {

            const currentResult = sendRequest(
                query.path,
                'POST',
                JSON.stringify({"data": query.queryParams}),
                defaultHeader
            );
            query.result = currentResult;

            haveError = !haveError && !currentResult.error;
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

                if (feed.length > 0 && haveError) {
                    feed.sort(sortDescBy('createdAt'));//   Sort and mixed both collection the data to display the new elements before
                    setFeedList(feed); //   Finaly, update the state to display the result
                }

            });
        });
    }

    //Fetch the data 
    useEffect(() => {
        fetchHomeFeed();
    }, [])

    //Function to return the path to the page of creation of an entity, depending on location
    const getCreateEntityPath = (type) => {
        //@todo need DRY and verification for using "TYPE_PERSON", TYPE_ is a constant with a string value of the type.
        let model;// = getModelFromType(type, {});
        if(type == "TYPE_PERSON")
            model = new Person({})
        if(type == "TYPE_ORGANISATION")
            model = new Organisation({})
        if(type == "TYPE_PROJECT")
            model = new Project({})
        return model.createRoute.asPath;
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

                <meta name="twitter:title" content={lang.appDefaultName}/>
                <meta name="twitter:description" content={lang.appDefaultDescription}/>

                {/* To add when the domain will be selected ....
                    <link rel="canonical" href="https://avantagenumerique.org/">  */}

                {/* Structured data */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(schema))}}
                />
            </Head>

            <PageHeader
                bg={"bg-purplelight"}
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
                            <h2>{lang.actualities}</h2>
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
                                            <p><strong>Chargement des données</strong></p>
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

                            <h2>{lang.menu}</h2>
                            <hr />
                            {/* If user is not connected, offer the option to connect itself*/}
                            {!auth.user.isLoggedIn &&
                            <>
                                <section className="d-grid">
                                    <Button color="primary" href="/compte/connexion">Se connecter</Button>
                                </section>

                                <section className={"aside__register-option py-2"}>
                                    <div className="bg-primary text-white d-flex flex-column">
                                        <h4>Pas encore de compte ?</h4>
                                        <p>Vous en aurez besoin afin de vous aussi contribuer aux données</p>
                                        <Button color="light" outline="light" href="/compte/inscription">C'est par ici !</Button>
                                    </div>
                                    <hr />
                                </section>
                            </>
                            }
                            

                            {/*Rapid options to access of edit the database*/}
                            <section className={"aside__db-edit-options"}>

                                <div className={"db-edit-options__button-set"}>
                                    <Button 
                                        disabled 
                                        size="slim" 
                                    >{lang.Events}</Button>
                                    <Button 
                                        disabled     
                                        size="slim" 
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button 
                                        href="/persons/"
                                        size="slim" 
                                        color="primary"
                                        slim>
                                        {lang.Persons}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath("TYPE_PERSON")}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button 
                                        href="/organisations/"
                                        color="primary" 
                                        size="slim" 
                                    >{lang.Organisations}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath("TYPE_ORGANISATION")}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/projets" color="primary" size="slim">{lang.Projects}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href={getCreateEntityPath("TYPE_PROJECT")}
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button href="/categories" color="primary" size="slim">{lang.Taxonomies}</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href="/contribuer/categorie"
                                    >+</Button>
                                </div>
                                {auth.user.isLoggedIn &&
                                    <div className={"d-flex flex-column mt-3"}>
                                        <Button color="white" outline="primary" href="/contribuer">Ajouter une donnée</Button>
                                    </div>
                                }

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
                                <h4>À propos</h4>
                                <p>
                                    La Base de données structurées, ouvertes et liées (BDSOL) est le cœur du hub virtuel
                                    d’Avantage numérique. Elle vise à recenser et géolocaliser les talents, les
                                    compétences, les ressources, les initiatives techno-créatives à travers le territoire du Croissant Boréal.
                                </p>
                                <Button classes="mt-3" color="white" outline="primary" href="/a-propos">En savoir plus</Button>
                            </section>

                        </div>
                    </aside>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
