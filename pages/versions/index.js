import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";
import {appConfig} from "@/src/configs/AppConfig";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/src/common/Data/GlobalConstants";
import Version from "@/src/versions/Version";


export async function getServerSideProps() {
    let versionsList = [];
    versionsList.push(
        {
            "label": "Mise en ligne d'AVNU pour le lancement",
            "value": "0.9.9",
            "date": "2024-03-23",
            "description": "Mise en ligne le 23 mars 2024. Le lancement a eu lieux au Cabaret de la Dernière chance à la fin du Forum avantage numérique.",
            "link": "https://github.com/avantage-numerique/bdsol-api",
            "notes": [
                {
                    "value": "Structure de l'ontotologie modifiable et fonctionnalités de consultation pour pour les Personnes, Organisations, Projets, Événements, Équipements et Lieux."
                },
                {
                    "value": "Branding et intégration de la maquette web pour la version 1 d'AVNU."
                },
                {
                    "value": "Système de connexion via l'API."
                },
                {
                    "value": "Équipe",
                    "tag": "strong"
                },
                {
                    "value": "Vincent P. Ruel, Intégration et front-end"
                },
                {
                    "value": "Frédéric Rivard, Backend et front-end"
                },
                {
                    "value": "Marc-André Martin, Backend, front-end et responsable du développement"
                },
                {
                    "value": "Simon Descoteau, coordination et gestion du produits"
                },
                {
                    "value": "Jeanne Perrin web design et UX"
                }
            ]
        }
    );

    const versions = JSON.stringify({
        versions: versionsList
    })

    return {
        props: {
            versions: versions
        }
    };
}

const VersionIndex = (props) => {

    const pageSpacing = appConfig.spacing.pagesContentSpacing;
    const versions = JSON.parse(props.versions);//)

    return (
        <div className={"legal-page page-terms-of-use"}>
            <PageMeta
                title={lang.versions__title}
                description={lang.versions__descriptions}
            />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={lang.versions__title}
                subTitle={lang.versions__descriptions}
                description={lang.versions__descriptions}
                key={"VersionsPage"}
            />
            <section className={`container ${pageSpacing}`}>
                {versions.versions && Array.isArray(versions.versions) &&
                    versions.versions.map((versionRaw, index) => {
                        const version = new Version(versionRaw);
                        const isLast = index === versions.versions.length-1
                        return (
                            <div className={`row ${!isLast ? "border-bottom" : ""} pb-5`} key={`versionRow${index}`}>
                                <div className={"col"}>
                                    {version.render()}
                                </div>
                            </div>
                        );
                    })
                }
            </section>
        </div>
    )
}

export default VersionIndex;