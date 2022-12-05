import React, {useContext, useEffect, useState} from 'react';

import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';

//Components
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import PresentationCard from '@/src/common/Containers/cards/presentationCard'
import Spinner from '@/src/common/widgets/spinner/Spinner'


import {sortDescBy} from "@/src/common/Data/Sorting/Sort";

//Costum hooks 
import {useHttpClient} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {useAuth} from '@/src/authentification/context/auth-context';

//Styling
//import styles from './home-page.module.scss'
import {lang} from "@/src/common/Data/GlobalConstants";
import PageHeader from "@/src/layouts/Header/PageHeader";


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

        //Send the request with the specialized hook
        const orgResponse = await sendRequest(
            "/organisations/list",
            'POST',
            JSON.stringify({"data": listQuery}),
            {'Content-Type': 'application/json'}
        )

        //Send the request with the specialized hook
        const persResponse = await sendRequest(
            "/persons/list",
            'POST',
            JSON.stringify({"data": listQuery}),
            {'Content-Type': 'application/json'}
        )

        /*
            Display the proper message relative to the api response
        */

        //If positive
        if (!orgResponse.error && !persResponse.error) {

            orgResponse.data.forEach(element => element.dataType = "organisation")
            persResponse.data.forEach(element => element.dataType = "person")

            const feed = [...orgResponse.data, ...persResponse.data];

            //Sort and mixed both collection the data to display the new elements before
            feed.sort(sortDescBy('createdAt'));

            //Finaly, update the state to display the result
            setFeedList(feed);

            //If negative
        } else {

            if (orgResponse.error)
                msg.addMessage({
                    text: orgResponse.message,
                    positive: false
                })

            if (persResponse.error)
                msg.addMessage({
                    text: persResponse.message,
                    positive: false
                })
        }
    }

    //Fetch the data 
    useEffect(() => {
        fetchHomeFeed();
    }, [])


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

                {/*
                To add when the domain will be selected ....
                <link rel="canonical" href="https://avantagenumerique.org/">
                */}

                {/* Structured data */}
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(schema))}}
                />
            </Head>

            <PageHeader
                bg={"bg-pink"}
                textColor={"text-white"}
                title={lang.homePageTitle}
                subTitle={lang.homePageDescription}
                description="test pour la description"
                image={"/general_images/Croissant-Boreal@3x-1440x1440.png"}
                imgAlt={"Carte du croissant boréal"} />


            <div className="container home-page__main p-0">
                <div className="row gx-5">
                    <div className="col col-12 col-md-9">
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
                                            <h5>Aucune donnée ¯\_(ツ)_/¯ pour l'instant. On a peut-être un problème en
                                                arrière
                                                plan.</h5>
                                        </div>
                                    }
                                    <div className="row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3">

                                            {/* Display feed if there is one */}
                                            {
                                                feedList.length > 0 && !isLoading &&
                                                feedList.map(elem => (
                                                    <div className="col g-3" key={elem._id + "-" + elem.slug}>
                                                        <PresentationCard
                                                            key={elem._id}
                                                            header={elem.type}
                                                            data={elem}
                                                        />
                                                    </div>
                                                ))
                                            }
                                    </div>
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
                            <section className="d-grid">
                                <Button color="primary" href="/compte/connexion">Se connecter</Button>
                            </section>
                            }
                            {!auth.user.isLoggedIn &&
                            <hr />
                            }

                            {/*Rapid options to access of edit the database*/}
                            <section className={"aside__db-edit-options"}>

                                <div className={"db-edit-options__button-set"}>
                                    <Button disabled slim>Événement</Button>
                                    <Button disabled slim>+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button disabled slim>Personne</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href="/contribuer/person"
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button color="primary" size="slim" disabled>Organisation</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href="/contribuer/organisation"
                                    >+</Button>
                                </div>

                                <div className={"db-edit-options__button-set"}>
                                    <Button color="primary" size="slim" disabled>Taxonomie</Button>
                                    <Button
                                        color="primary"
                                        size="slim"
                                        disabled={!auth.user.isLoggedIn}
                                        href="/contribuer/taxonomy"
                                    >+</Button>
                                </div>
                                {auth.user.isLoggedIn &&
                                    <div className={"d-flex flex-column mt-3"}>
                                        <Button color="white" outline="primary" href="/contribuer">Ajouter une donnée</Button>
                                    </div>
                                }

                                <hr/>
                                <p>
                                    <strong className="text-danger">DÉVELOPPEMENT EN COURS.</strong> Vous pourrez
                                    bientôt lancer des recherches et consulter toutes les données.
                                </p>
                            </section>
                            <hr />

                            {/* Section : If user is not connected, propose to create an account if he doesn't have one */}
                            {!auth.user.isLoggedIn &&
                            <section className={"aside__register-option"}>
                                <div className="bg-primary text-white d-flex flex-column">
                                    <h4>Pas encore de compte ?</h4>
                                    <p>Vous en aurez besoin afin de vous aussi contribuer aux données</p>
                                    <Button color="primary" outline="white" href="/compte/inscription">C'est par ici !</Button>
                                </div>
                                <hr />
                            </section>
                            }

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
