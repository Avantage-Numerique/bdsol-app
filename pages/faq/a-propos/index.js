//Context
import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";

/**
 * Really basic page with plain text. This could be dry with an entry or some sort of markdown file.
 * @return {JSX.Element}
 * @constructor
 */
const Index = () => {
    const pClass = "";

    return (
        <div id="a-propos" className={"page-apropos"}>
            <PageHeader title={`Qu'est-ce que la BDSOL ?`}/>

            <div className={"container home-page__main content"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3>Un projet en développement</h3>
                        <p className={pClass}>
                            Avantage Numérique travaille actuellement sur l’intégration d’une base de données à son hub virtuel. Elle a pour objectif de recenser et de géolocaliser les talents, les compétences, les équipements et les initiatives technocréatives dans le <a href="https://avantagenumerique.org/le-croissant-boreal/" target="_blank">Croissant Boréal</a> (Abitibi-Témiscamingue, nord de l’Ontario francophone, Nord-du-Québec). La mise en ligne de cet outil augmentera la découvrabilité, la visibilité, ainsi que la transmission des savoirs relatifs aux technologies sur le territoire.
                        </p>
                    </div>
                </div>
                <div id="caracteristique" className={"row"}>
                    <div className={"col"}>
                        <h3>Quelles sont les caractéristiques de cette base de données ?</h3>
                        <ul>
                            <li>
                                Les données sont <strong>structurées :</strong> elles sont prédéfinies et formatées
                                selon une structure précise, et ce dans le but d’être compréhensible par les
                                ordinateurs.
                            </li>
                            <li>
                                Les données sont <strong>ouvertes :</strong> elles sont accessibles et, suivant la
                                politique de gestion de données établie, elles peuvent être utilisées librement par
                                les usager·ères.
                            </li>
                            <li>
                                Les données sont <strong>liées :</strong> la base de données est consultable par
                                d’autres bases de données qui partagent la même structure et les mêmes règles
                                d’écriture afin d’être en mesure d’échanger librement de l’information.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"row"}>
                    <div id="a-quoi-va-servir-la-base-de-donnees" className={"col"}>
                        <h3>À quoi va servir la base de données ?</h3>
                        <p className={pClass}>
                            Une fois mise en place, la base de données pourra être parcourue librement par les
                            utilisateur·trices souhaitant se renseigner sur les ressources technologiques proposées dans
                            le Croissant Boréal. Elle permettra par exemple de :
                        </p>
                        <ul>
                            <li>
                                <strong>Trouver une personne ayant les compétences</strong> dans un domaine, dans
                                une technologie ou avec un équipement, afin de réaliser un projet technocréatif.
                            </li>
                            <li>
                                <strong>Se renseigner sur les espaces et les équipements</strong> permettant de
                                réaliser un projet précis.
                            </li>
                            <li>
                                <strong>Découvrir les compétences nécessaires</strong> pour accomplir un type de
                                projet ou pour l’utilisation d’un équipement.
                            </li>
                            <li>
                                <strong>Partager des solutions</strong> et des marches à suivre pour répondre à des
                                problèmes techniques.
                            </li>
                            <li>
                                <strong>Améliorer la
                                    &nbsp;
                                        <a href="https://avantagenumerique.org/2020/07/quest-ce-que-la-decouvrabilite/"
                                           target="_blank">
                                            découvrabilité
                                        </a>
                                    &nbsp;
                                </strong>
                                d’un projet ou d’un organisme.
                            </li>
                            <li>
                                <strong>Promouvoir</strong> des œuvres, des formations, des travaux, des projets et
                                des organisations.
                            </li>
                        </ul>
                    </div>
                    <div id="qui-pourra-utiliser-la-base-de-donnees" className={"row"}>
                        <div className={"col"}>
                            <h3>Qui pourra utiliser la base de données ?</h3>
                            <p className={pClass}>La base de données est destinée à un public large comprenant autant
                                les professionnel·les du numérique que les personnes en quête d’apprentissage. Elle
                                sera libre d’accès pour tous·tes les usager·ères souhaitant en apprendre davantage
                                sur les ressources technologiques du Croissant Boréal.</p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h3>Formulaire d’intégration de données à la version bêta de la base
                                de données</h3>
                            <p className={pClass}>Bien que la base de données soit pour l’instant inaccessible
                                publiquement, il sera bientôt possible d’intégrer à sa version bêta des informations
                                grâce à un formulaire. Les renseignements collectés seront ainsi ajoutés à la base
                                de données et directement exploitables lorsque cette dernière sera mise en ligne. Il
                                sera possible par la suite de les modifier et de les compléter.</p>
                            <h3 id="gouvernance-des-donnees">Utilisation et gouvernance des données</h3>
                            <p className={pClass}>L’équipe travaille actuellement sur l’établissement d’une
                                gouvernance des données. Toute information entrée dans le formulaire sera sous la
                                licence CC0
                                
                                    (<a href="https://creativecommons.org/share-your-work/public-domain/cc0/"
                                       target="_blank">
                                        Creative Commons 0
                                    </a>)
                                de manière temporaire. Cette licence affirme que les informations sont entièrement
                                libres de droit et appartiennent au domaine public. Éventuellement, lorsqu’une
                                politique de gouvernance sera établie, une licence plus restrictive sera choisie.
                            </p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h3>Équipe</h3>
                            <ul>
                                <li>
                                    <p className={pClass}>
                                        <strong>Simon Descôteaux –</strong> Product owner <br/>
                                        simon.descoteaux@avantagenumerique.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Marc-André Martin –</strong> Production et architecture technique de
                                        l’application et de la base de données ouvertes et liées – Mamarmite <br/>
                                        marc.andre.martin@avantagenumerique.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Vincent Poirier Ruel –</strong> Développement de la base de
                                        donnée<br/>
                                        vincentpruel@avantagenumerique.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Frédéric Rivard –</strong> Développement de la base de donnée<br/>
                                        sonofapancak@protonmail.com<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Olivier Ross –</strong> Développement de la base de donnée<br/>
                                        olivier@hub01.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Rémi Barbalat –</strong> Développement de la base de donnée<br/>
                                        remi@hub01.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Nicolas Trudeau –</strong> Développement de la base de donnée<br/>
                                        nicolas@hub01.org<br/>
                                        –
                                    </p>
                                </li>
                                <li>
                                    <p className={pClass}>
                                        <strong>Jeanne Lebigre –</strong> Lien avec la communauté<br/>
                                        jeanne.perrin@petittheatre.org<br/>
                                        –
                                    </p>
                                </li>
                            </ul>

                            <p className={pClass}>
                                <strong>Nos experts conseils :</strong>
                                Viêt Cao et Christian Roy<br/>
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