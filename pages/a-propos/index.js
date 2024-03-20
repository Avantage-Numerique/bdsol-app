//Context
import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import { RouteLink } from "@/src/common/Components/RouteLink";
import Link from "next/link";
import {lang} from "@/src/common/Data/GlobalConstants";
import AppRoutes from "@/src/Routing/AppRoutes";

//Styling
import styles from './aPropos.module.scss';

/**
 * Really basic page with plain text. This could be dry with an entry or some sort of markdown file.
 * @return {JSX.Element}
 * @constructor
 */
const Index = () => {
    const pClass = "";

    return (
        <div id="a-propos" className={"page-apropos"}>
            <PageMeta 
                title={lang.faq__about__title}
                description={lang.faq__about__description}
            />
            <PageHeader title={`Avnu, c’est quoi ?`}/>

            <div className={"container home-page__main content py-4"}>
                <div className={"row py-2"}>
                    <div className={"col"}>
                        <h3>Un outil d’exploration des ressources technologiques du Croissant boréal</h3>
                        <p className={pClass}>
                            Avnu est une plateforme web <strong>gratuite</strong> et <strong>collaborative</strong> qui vise à documenter les ressources technologiques du
                            &nbsp;
                            <a href="https://avantagenumerique.org/le-croissant-boreal/"
                                target="_blank">
                                Croissant boréal
                            </a>
                            &nbsp;
                            (Abitibi-Témiscamingue, nord de l’Ontario francophone et Baie-James). Dans un objectif de transmission des savoirs et d’apprentissage collectif, cette <strong>base de données ouvertes</strong> se veut être un outil pour répertorier les activités technocréatives locales.
                            <br/><br/>
                            Que vous soyez un·e professionnel·le du numérique ou simplement un·e curieux·se des nouvelles technologies, ce portail en ligne vous permettra de géolocaliser les <strong>organisations</strong>, les <strong>équipements</strong>, les <strong>projets</strong>, les <strong>ressources humaines</strong> et les <strong>événements</strong> qui vous aideront à réaliser votre projet technocréatif.
                        </p>
                    </div>
                </div>
                <div className={"row py-2"}>
                    <div className={"col"}>
                        <h3>Comment ça fonctionne ?</h3>
                        <p>
                            En tant qu’utilisateur·rice de la plateforme, vous pouvez :
                        </p>
                        <ul>
                            <li className={`${styles["page-list"]}`}>
                                <RouteLink routeName="consult" label="Consulter et trier les données"/> déjà existantes sur la plateforme (personnes, organisations, équipements, événements et projets)
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                Vous <RouteLink routeName="register" label="créer un compte"/> ou vous <RouteLink routeName="connection" label="connecter"/> pour pouvoir à votre tour ajouter ou modifier des données
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"row py-2"}>
                    <div className={"col"}>
                        <h3>À quoi ça sert ?</h3>
                        <p>
                            La plateforme Avnu est parcourable librement et gratuitement par les utilisateurs·trices qui souhaitent se renseigner sur les ressources technologiques proposées dans le Croissant Boréal. Elle permet par exemple de :
                        </p>
                        <ul>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Trouver une personne ayant les compétences</strong> dans un domaine, dans une technologie ou avec un équipement, afin de réaliser un projet technocréatif.
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Se renseigner sur les espaces et les équipements</strong> permettant de réaliser un projet précis.
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Découvrir les compétences nécessaires</strong> pour accomplir un type de projet ou pour l’utilisation d’un équipement.
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Partager des solutions</strong> et des marches à suivre pour répondre à des problèmes techniques.
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Améliorer la découvrabilité</strong> d’un projet ou d’un organisme.
                            </li>
                            <li className={`${styles["page-list"]}`}>
                                <strong>Promouvoir</strong> des œuvres, des formations, des travaux, des projets et des organisations.
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="gouvernance-des-donnees" className={"row py-2"}>
                    <div className={"col"}>
                        <h3>Utilisation et gouvernance des données</h3>
                        <p>
                            Dans un objectif de partage et de collaboration, nous faisons en sorte que les données entrées et diffusées sur la plateforme soient le plus ouvertes possible. Tout le monde a la possibilité d’ajouter de nouvelles données et de modifier celles déjà présentes sur la plateforme. La manière dont nous gérons les données est décrite en détail dans notre <RouteLink routeName={"confidentialityPolicy"}/>.
                        </p>
                    </div>
                </div>
                <div className={"row py-2"}>
                    <div className={"col"}>
                        <h3>Un projet développé avec amour par Avantage numérique</h3>
                        <p>
                            Avnu est développé par
                            &nbsp;
                            <a href="https://avantagenumerique.org/"
                                target="_blank">
                                Avantage numérique
                            </a>
                            , un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Le hub vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal. Il rassemble des organisations et des individus·es qui s’activent, autour de chantiers collaboratifs et de projets innovants, pour le développement de leurs milieux. Il est soutenu par une <RouteLink routeName={"valuesChart"}/> qui guide l’ensemble des actions réalisées dans un esprit de codéveloppement et d’innovation ouverte.
                        </p>
                    </div>
                </div>
                <div className={"row py-2"} id="equipe">
                    <div>
                        <div className={"col"}>
                            <h3>Notre belle équipe</h3>
                            <ul>
                                <li>
                                    <p className={pClass}>
                                        <strong>Simon Descôteaux –</strong> Product owner <br/>
                                        simondesc11@gmail.com<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Marc-André Martin (Mamarmite) –</strong> Production et architecture technique de
                                        l’application et de la base de données – Mamarmite <br/>
                                        marcandre@mamarmite.com<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Vincent Poirier Ruel –</strong> Développement de la base de
                                        données<br/>
                                        vincentp.ruel@gmail.com<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Frédéric Rivard –</strong> Développement de la base de données<br/>
                                        sonofapancak@protonmail.com<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Jeanne Perrin –</strong> Lien avec la communauté<br/>
                                        jeanne.perrin@petittheatre.org<br/>
                                        –
                                    </p>
                                </li>
                            </ul>

                            <p className={pClass}>
                                <strong>Nos experts conseils :</strong>
                                Viêt Cao (SynapseC), Jules Gaudin (Robic) et Christian Roy (A10s inc.)<br/>
                            </p>
                            <p className={pClass}>
                                <i>Initiative financée par le Conseil des Arts du Canada et le Ministère de la
                                    Culture et des Communications du Québec.</i>
                            </p>
                        </div>
                    </div>
                </div>{/* end row */}
            </div>{/* end container */}
        </div>
    )
}

export default Index