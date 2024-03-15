import React from "react";
import Image from 'next/image'

//components
import Button from "@/src/common/FormElements/Button/Button"
import PageMeta from "@/src/common/PageMeta/PageMeta";
import Icon from "@/common/widgets/Icon/Icon";

//Context
import {useAuth} from '@/auth/context/auth-context'
import { lang } from "@/src/common/Data/GlobalConstants";

//styling
import styles from './contribution-page.module.scss'
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";

import PageHeader from "@/layouts/Header/PageHeader";

//Entities
import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";
import Event from "@/src/DataTypes/Event/models/Event";
import Equipment from "@/src/DataTypes/Equipment/models/Equipment";
import Place from "@/src/DataTypes/Place/models/Place";

//Img
import headerImg from '@/public/general_images/Fusée_Planetes_Poitilles2.svg'

const Index = () => {

    const auth = useAuth();

    //Function to return the path to the page of creation of an entity, depending on location
    const getCreateEntityPath = (type) => {
        let model;
        //@todo need DRY and verification for using "TYPE_PERSON", TYPE_ is a constant with a string value of the type.
        if(type == "TYPE_PERSON")
            model = new Person({})
        if(type == "TYPE_ORGANISATION")
            model = new Organisation({})
        if(type == "TYPE_PROJECT")
            model = new Project({})
        if(type == "TYPE_EVENT")
            model = new Event({})
        if(type == "TYPE_EQUIPMENT")
            model = new Equipment({})
        if(type == "TYPE_PLACE")
            model = new Place({})
        return model.createRoute.asPath;
    }

    const FullWidthImg = () => {
        return (
            <figure className={`d-none d-md-block ${styles["header--background-img"]}`}>
                <Image src={headerImg} alt="Trajet de la fusée d'AVNU" />
            </figure>
        )
    }

    return (
        <div className={`${styles["contribution-page"]}`}>
            <PageMeta 
                title={lang.contribute__title}
                description={lang.contribute__description}
            />
            <PageHeader
                title="Contribuer à la base de donnée"
                subtitleColor="primary"
                description="Vous pouvez ajouter une personne, une organisations, un projet, un événement, un équipement ou une catégorie."
                custom_FullWidthContent={FullWidthImg}
            />

            <div className={`${styles["contribution-page__menu"]}`}>
                <div className='container p-0'>

                    { !auth.user.isLoggedIn &&
                        <div className="row">
                            <div>
                                <span className="text-danger"><strong>Attention ! </strong></span>
                                Vous devez être connecté afin de pouvoir éditer la base de données.
                            </div>
                        </div>
                    }

                    <div className={`row pb-5 g-4 ${styles["contribution-page__article-container"]}`}>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Person.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Person}</h4>
                                </header>
                                <section>
                                    <p>Personne, professionnelle ou amatrice, ayant des compétences en technologies ou œuvrant dans le numérique et offrant des services technologiques.</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_PERSON")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter une {lang.Person}
                            </Button>
                        </article>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Organisation.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Organisation}</h4>
                                </header>
                                <section>
                                    <p>Organisation, entreprise, collectif ou regroupement œuvrant dans le numérique, ou dont les technologies numériques sont incluses, et offrant des services technologiques.</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_ORGANISATION")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter une {lang.Organisation}
                            </Button>
                        </article>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Project.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Project}</h4>
                                </header>
                                <section>
                                    <p>Projet réalisé par un ou plusieurs individus et incluant une ou plusieurs dimensions numériques.</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_PROJECT")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter un {lang.Project}
                            </Button>
                        </article>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Event.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Event}</h4>
                                </header>
                                <section>
                                    <p>Événement comprenant un aspect numérique ou lié à un projet numérique (lancement, exposition, etc.)</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_EVENT")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter un {lang.Event}
                            </Button>
                        </article>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Equipment.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Equipment}</h4>
                                </header>
                                <section>
                                    <p>Équipement numérique possédé par un individu ou une organisation et qu'il est possible d'emprunter, de louer ou d'échanger en service.</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_EQUIPMENT")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter un {lang.Equipment}
                            </Button>
                        </article>
                        <article className={`${styles["contribution-page__entity"]} col-12 col-sm-6 col-md-4`}>
                            <div className={`${styles["contribution-page__entity__content"]}`}>
                                <header>
                                    <i className={`${Place.icon} ${styles["entity-icon"]}`} />
                                    <h4>{lang.Place}</h4>
                                </header>
                                <section>
                                    <p>Lieu comprenant un aspect numérique ou offrant la possibilité d'accueillir des projets en lien avec le numérique.</p>
                                </section>
                            </div>
                            <Button 
                                size="slim" 
                                className={`px-3 py-0 ${styles["contribution-page__entity__cta"]}`} 
                                color="secondary"
                                href={getCreateEntityPath("TYPE_PLACE")} 
                                disabled={!auth.user.isLoggedIn}
                            >
                                <Icon iconName={"plus"} className="text-secondary-darker" /> Ajouter un {lang.Place}
                            </Button>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )

}
export const getServerSideProps = withSessionSsr(ssrCanAccess);

export default Index