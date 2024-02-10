import {appConfig} from "@/src/configs/AppConfig";
import PageHeader from "@/layouts/Header/PageHeader";
import { RouteLink } from "@/src/common/Components/RouteLink";
import React from "react";


const ValuesChart = () => {

    const pageSpacing = appConfig.spacing.pagesContentSpacing;

    //Style setup in layouts/static

    /**
     * idée :
     * - Ajouter des tips sur les mots clés avec définitions défini en haut.
     * - Ajouter un Table des matière navigable.
     */
    return (
        <div className={"legal-page page-terms-of-use"}>
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={"Chartes de valeurs"}
                subTitle={"Dernière mise à jour : 2024-02-10 (version 2.0)"}
                description=""
                key={"confidentialPolicyPage"}
            />
            <section className={`container ${pageSpacing}`}>
                <div className="row">
                    <div className={"col"}>
                        <p>Plus qu’une simple formalité, cette Charte de valeurs (la « Charte »), en complément des Conditions d’utilisation et de la <RouteLink routeName={"confidentialityPolicy"} />, propose un cadre commun pour favoriser le bon fonctionnement de la Plateforme. Cette Charte est appelée à évoluer ; la Troupe vous invite à fournir vos commentaires, suggestions et idées pour l’améliorer et l’adapter aux situations qui pourraient apparaître.</p>
                        <p>Tous les mots en majuscules ont le sens qui leur est donné dans la Charte ou qui leur est autrement donné dans les Conditions. En cas de doute, la Troupe vous invite à vous référer aux Conditions qui viennent établir les règles principales applicables.</p>
                        <p>Dans la mesure permise par la loi, nous nous réservons le droit, à notre seule et entière discrétion, de modifier la Charte, ou toute partie de celles-ci, à tout moment. Dans ce cas, la Troupe vous fournira un préavis raisonnable avant l’entrée en vigueur de la Charte modifiée et pourra vous en informer à travers un courriel. La Charte modifiée prendra effet lors de sa publication (ou tout autre délai autrement indiqué par écrit par la Troupe) et votre utilisation de la Plateforme après l’entrée en vigueur de la Charte modifiée équivaut à une acceptation tacite de celle-ci.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>1. Valeurs</h2>
                        <h3>1.1. Général.</h3>
                        <p>La Troupe développe et gère la Plateforme selon plusieurs grands principes qui viennent animer et alimenter sa réflexion et les actions entreprises. Dans un souci de transparence et afin de vous inviter à adapter votre utilisation de la Plateforme, la Troupe vous fait part des principes pertinents ci-dessous.</p>
                        <h3>1.2. Principe 1</h3>
                        <p>Partage, ouverture et collaboration. Dans un monde de plus en plus numérisé, l'accès à l'information est essentiel pour stimuler l'innovation, favoriser la transparence et renforcer la confiance au sein des communautés. Ce principe, centré sur le partage, l'ouverture et la collaboration, repose sur la conviction que les données doivent être accessibles à tous. L'ouverture garantit que les données sont non seulement disponibles, mais également compréhensibles, pertinentes et exploitées par tous ceux qui en ont besoin. Le partage renforce ce postulat en veillant à ce que l'information circule librement, sans barrières inutiles, permettant ainsi une utilisation maximale de la donnée. La collaboration est au cœur de ce principe. Elle reconnaît que la véritable valeur des données ouvertes ne peut être pleinement réalisée que lorsque différentes parties prenantes - qu'il s'agisse de gouvernements, d'entreprises, d'organisations non gouvernementales ou d'individus - travaillent ensemble. En collaborant, il est alors possible d’identifier les défis, co-créer des solutions et partager des connaissances qui bénéficient à tous. L’objectif est donc de favoriser une culture où l'ouverture, le partage et la collaboration ne sont pas de simples mots, mais des actions concrètes qui guident la manière de fonctionner au jour le jour.</p>
                        <h3>1.3. Principe 2</h3>
                        <p>Action comme principal levier. Dans le domaine de la gestion des données ouvertes, il ne suffit pas de reconnaître ou de promouvoir l'importance des bonnes intentions. Il est impératif que ces intentions se traduisent par des actions tangibles et significatives. C'est dans l'acte que réside le véritable potentiel de changement. Le second principe vise à mettre l'emphase sur ce postulat. Une plateforme ou une initiative qui prône l'ouverture des données ne doit pas simplement se contenter d'en discuter ou de planifier; elle doit concrétiser ces intentions par des démarches pratiques, des mises en œuvre et des déploiements réels. Cela signifie que chaque décision, chaque stratégie et chaque interaction doit être soutenue par des mesures concrètes pour garantir que l'ouverture des données ne demeure pas une simple idée, mais devienne une réalité palpable. L'action comme levier principal rappelle également que le temps est précieux. Dans un monde en constante évolution, attendre trop longtemps pour agir peut nous faire passer à côté d'opportunités cruciales. En privilégiant l'action, il ne faut pas se contenter de suivre le rythme, mais de chercher à le définir, en positionnant les données ouvertes comme un élément central de la transformation digitale et sociale. En embrassant ce principe, il convient de se consacrer à une approche proactive, où l'action guide la pensée, assurant que la mission de partage et d'ouverture des données se traduise par un impact réel et durable dans la société.</p>
                        <h3>1.4. Principe 3</h3>
                        <p>Créativité et innovation. La puissance des données ouvertes ne réside pas uniquement dans leur existence, mais également dans les façons innovantes et créatives dont elles sont utilisées pour générer de la valeur et résoudre des défis complexes. Les données ouvertes offrent, par essence, d'innombrables possibilités d'exploration, d'interprétation et de transformation. Avec ce principe, il s’agit de non seulement valoriser et promouvoir la créativité et l'innovation au sein de la Plateforme, mais aussi à créer un environnement où ces qualités sont encouragées, célébrées et intégrées à chaque étape du travail accompli.</p>
                        <h3>1.5. Principe 4</h3>
                        <p>L’humain avant tout. Dans une ère pleinement numérique, entourés de technologies avancées et d'une multitude de données, il est crucial de se souvenir de l'élément central de toute initiative : l'humain. Derrière chaque donnée, chaque algorithme, chaque décision, il y a des individus, des communautés et des sociétés qui sont affectés. Il faut donc considérer et à prioriser les besoins, les aspirations et les préoccupations des individus à chaque étape du processus de gestion des données. Cela signifie qu'au-delà de l'efficacité, de la précision ou de l'innovation, l'impact humain des actions entreprises doit toujours être au cœur de nos préoccupations. Prioriser l'humain, c'est aussi reconnaître l'importance de la diversité, de l'inclusion et de l'équité. Chaque individu, quelle que soit sa provenance, son genre, son âge, sa culture ou son éducation, doit avoir la possibilité d'accéder, de comprendre et de bénéficier des données ouvertes. Chaque action, chaque décision et chaque innovation doit être guidée par une profonde compréhension et une profonde compassion envers les utilisateurs de la Plateforme.</p>
                        <h3>1.6. Principe 5</h3>
                        <p>Écoresponsabilité comme clé de la pérennité. Ce principe s'ancre dans la reconnaissance que l’approche de la gestion des données ouvertes doit être conduite avec une conscience aiguë de son impact environnemental. Il faut être conscient des répercussions sur l'environnement, que ce soit en termes de consommation d'énergie, d'utilisation des ressources ou de gestion des déchets électroniques. Ce principe impose la mise en place d’une réflexion critique sur les impacts de la Plateforme et à chercher des moyens d'opérer de manière plus écologique et durable. Cela signifie optimiser les infrastructures pour réduire la consommation d'énergie, promouvoir le recyclage et la réutilisation des équipements, et intégrer des normes écologiques dans le cadre de la Plateforme. Au-delà de ces actions tangibles, il s'agit aussi d'adopter une mentalité écologique, en comprenant que le bien-être collectif est intrinsèquement lié à la santé de notre planète.</p>
                    </div>
                </div>

                <div className="row">
                    <div className={"col"}>
                        <h2>2. Code de conduite</h2>
                        <h3>2.1. La Troupe rappelle que la Plateforme s’appuie sur</h3>
                        <ul>
                            <li>des valeurs de respect, d’ouverture, d’inclusion et de convivialité dans le cadre de votre utilisation de celle-ci</li>
                            <li>du contenu présent ou</li>
                            <li>de vos interactions avec les autres utilisateurs.</li>
                        </ul>
                        
                        <h3>2.2. La Troupe ne tolèrera aucun contenu :</h3>
                        <ul>
                            <li>faux</li>
                            <li>inexact</li>
                            <li>trompeur</li>
                            <li>diffamatoire</li>
                            <li>nuisible</li>
                            <li>abusif</li>
                            <li>menaçant</li>
                            <li>harcelant</li>
                            <li>délictuel</li>
                            <li>violent</li>
                            <li>vulgaire</li>
                            <li>obscène</li>
                            <li>entrant en violation avec le droit à la vie privée ou à la confidentialité des tiers</li>
                            <li>haineux</li>
                            <li>raciste</li>
                            <li>xénophobe</li>
                            <li>homophobe</li>
                            <li>sexiste</li>
                            <li>ou autrement inapproprié.</li>
                        </ul>
                        <h3>2.3. L’utilisation, le partage et l’accès au Contenu est encouragé dans le respect des règles entourant la propriété intellectuelle et les droits d’autrui.</h3>
                        <p>Il est attendu que les utilisateurs respecteront les lois applicables.</p>
                        <h3>2.4. La Troupe s’attend à ce que :</h3>
                        <ul>
                            <li>Vous ne partagiez pas de renseignements personnels d’un individu sans son consentement exprès, éclairé et complet.</li>
                            <li>Concernant les conséquences d’un tel partage, l’utilisation qui en sera faite et la portée de la Plateforme.</li>
                        </ul>
                        <h3>2.5. Si vous décidez d’endosser une Entité ou une information à propos d’une Entité</h3>
                        <p>Vous comprenez que vous ne devez endosser un élément ou une Entité que si vous considérez que celui-ci est d’une haute qualité. Vous comprenez que vous ne devez pas endosser un élément ou une Entité simplement parce qu’elle vous concerne, pour votre promotion personnelle ou l’une de vos connaissances ou pour toute autre raison.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ValuesChart;