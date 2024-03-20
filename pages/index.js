import React, {useContext, useEffect, useState} from 'react';
import Image from 'next/image'

import {lang} from "@/src/common/Data/GlobalConstants";

//components
import Button from '@/src/common/FormElements/Button/Button'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import PageHeader from "@/src/layouts/Header/PageHeader";
import EntitiesGrid from "@/DataTypes/Entity/layouts/EntitiesGrid";
import PageMeta from "@/src/common/PageMeta/PageMeta";

//Entities
//Costum hooks
import {
    externalApiRequest,
    clientSideExternalApiRequest,
    useHttpClient
} from '@/src/hooks/http-hook';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import {getType} from "@/DataTypes/Entity/Types";

//Images
import backgroundImg from '@/public/general_images/Fusee_Pointilles1.svg'
import AvantageNumeriqueLogo from '@/public/logos/logo_Avantage_Numérique.svg';
import organizationPresentationImg from '@/public/general_images/shutterstock_514412107.jpg'
import shipAndPlanetsImg from '@/public/general_images/Fusée_Planetes_Poitilles2.svg'
import AppRoutes from '@/src/Routing/AppRoutes';

//Background image for the page header
const HomePageHeaderBgImg = () => {

    const localFigureStyling = {
        bottom: "-5vh",
        zIndex: "1",
        minWidth: "30rem"
    }

    const localImgStyling = {
        objectFit: "contain",
        objectPosition: "15% bottom",
        minWidth: "80rem",
    }
    return (
        <figure style={localFigureStyling} className="position-absolute start-0 w-100 h-100 overflow-hidden">
            <Image src={backgroundImg} style={localImgStyling} className="w-100 h-auto position-absolute start-0 bottom-0" alt="Trajet de la fusée d'Avantage Numérique" />
        </figure>
    )
}

const HomePage = ({}) => {

    //Holds the state the organisations
    const [feedList, setFeedList] = useState([]);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest, setIsLoading} = useHttpClient();

    const fetchHomeFeed = async () => {

        setIsLoading(true);//bypass the sendRequest setting of isLoading, because of all these promises here.
        const homePageEntities = await clientSideExternalApiRequest(
            `/search/homepage`,
            { method: 'GET' }
        );
        setFeedList(homePageEntities.data)

        setIsLoading(false);//when all finishes, set this to false.
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
            mainEntityOfPage: "https://avnu.ca/"
        }
    }

    return (
        <div className={"home-page"}>

            {/* Page head element  */}
            <PageMeta 
                title={lang.index__title}
                //No description because we are using the default value
                keywords={lang.appDefaultKeywords}
                structuredData={schema}
            />

            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={lang.homePageTitle}
                subTitle={lang.homePageDescription}
                description=""
                image={"/general_images/CroissantBoreal.png"}
                imgAlt={"Carte du croissant boréal"} 
                leftColClassName="py-4"
                key={"pageHeaderHomePage"} 
                custom_FullWidthContent={HomePageHeaderBgImg}
                reverseWrap
            />
            <section className="container home-page__main p-0">
                {/* Display of 6 latest entities*/}
                <div className="row gx-5">
                    <div className="d-flex flex-column align-items-center">
                        <h2 className="mt-4 text-center">Ajouts récents à la base de données</h2>
                        <p className="mb-4 text-center">Cliquez sur les différentes fiches afin d'obtenir plus d'informations sur ces ressources.</p>
                        <div className="home-page__feed-section container py-4 position-relative">
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
                                    <h5 className="text-center">{lang.noResult}</h5>
                                </div>
                            }
                            {/*  Show the feed in the EntitiesGrid component. It manages an empty list in it, but it make it more readable to show it here too */}
                            {
                                feedList.length > 0 && !isLoading &&
                                <EntitiesGrid className={"row home-page__feed-section--container row-cols-1 row-cols-sm-2 row-cols-xl-3"} columnClass={"col g-3"} feed={feedList}/>
                            }
                        </div>
                        <div className="py-4 my-4">
                            <Button className="px-4" href="/consulter"> Voir toutes les données </Button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Organization presentation*/}
            <section className="home-page__full-width-section bg-secondary-lighter mt-4">
                <div className="container">
                    <div className='row justify-content-around align-items-center home-page__section-inner-y-padding'>
                        <div style={{aspectRatio: "1 / 1", maxHeight: "50vw"}} className="col-12 col-md-6 col-lg-4 order-2 order-md-1 p-2">
                            <Image className="w-100 h-100 object-fit-cover" priority={false} src={organizationPresentationImg} alt="Présentation de l'organisation"/>
                        </div>
                        <div style={{maxWidth: "60ch"}} className="col-12 order-1 order-md-2 col-md-6 col-lg-8 p-4 flex-column align-items-start">
                            <h2 className="mb-4">AVNU, c'est quoi?</h2>
                            <p className="mt-4">    
                                AVNU est une base de données qui a pour objectif de recenser et de
                                géolocaliser les talents, les ressources et les initiatives numériques en
                                lien avec le territoire du Croissant boréal. En naviguant sur son interface,
                                vous pourrez découvrir les personnes, les organismes, les projets, les
                                équipements et les événements qui répondent à vos besoins
                                technologiques.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p>Le projet AVNU est développé par le hub &nbsp;</p>
                                <a href="https://avantagenumerique.org/">
                                    <Image alt="Logo avantage numérique" className="w-auto" style={{height: "1.25rem"}} src={AvantageNumeriqueLogo} />
                                </a> 
                            </div>
                            <div className="d-flex flex-column align-items-start mt-3">
                                <Button className="px-4 mt-2" href={AppRoutes.about.asPath}>En savoir plus sur l'initiative</Button>
                                {//<Button className="mt-3" href="https://avantagenumerique.org/" external={true} text_color="dark">Découvrir Avantage Numérique</Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account section */}
            <section className="home-page__full-width-section position-relative">
                <figure className="position-absolute top-0 bottom-0 start-0 end-0">
                    <Image className="h-75 d-none d-md-block w-auto position-absolute end-0 top-0" src={shipAndPlanetsImg} alt="Fusée d'AVNU se déplaçant entre les planètes dans l'espace." />
                </figure>
                <div className="container position-relative">
                    <div className='row home-page__section-inner-y-padding'>
                            <h2 className="text-center">Envie d’ajouter des données ?</h2>
                            <p className="text-center my-2">Vous aussi, contribuez à la plateforme en vous créant un compte utilisateur·rice. C’est simple et gratuit !<br/>Vous pourrez alors ajouter ou modifier des fiches à propos des ressources technologiques de votre territoire. </p>
                            <div className="d-flex justify-content-center my-4">
                                <Button className="px-4" color="primary" href="/compte/inscription">C'est par ici !</Button>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;

