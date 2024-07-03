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
            "label": "Badge du CB et informations de contact",
            "value": "1.0.0",
            "date": "2024-06-28",
            "description": "Mise en ligne le 28 juin 2024. La version 1 ajoute plusieurs amélioration et ajustement du visuel, des textes. On a réglé plusieurs bogues.",
            "notes": [
                {
                    "value": "Ajout des informations de contact pour les entités Personnes et Organisations avec plus de détails (courriel, téléphones, site web)"
                },
                {
                    "value": "Ajout du système de badge, et on commence avec le badge : croissant Boréal (CB) et le champ de la région de l'entité."
                },
                {
                    "value": "Ajout des backups et du partage des versions dans l'API."
                },
                {
                    "value": "Ajout d'une fonctionnalité de type contenu statique (appelé Page) dans L'API."
                },
                {
                    "value": "<strong>Équipe</strong>",
                    "additionnalClasses": "pt-3 pb-2"
                },
                {
                    "value": "<strong>Frédéric Rivard</strong>, Backend et front-end"
                },
                {
                    "value": "<strong>Marc-André Martin</strong>, Backend, front-end et responsable du développement"
                },
                {
                    "value": "<strong>Jeanne Perrin</strong> web design et UX"
                }
            ]
        },
        {
            "label": "Mise en ligne d'AVNU pour le lancement",
            "value": "0.9.9",
            "date": "2024-03-23",
            "description": "Mise en ligne le 23 mars 2024. Le lancement a eu lieu au Cabaret de la dernière chance à la fin du Forum Avantage numérique.",
            "notes": [
                {
                    "value": "Structure de l'ontologie modifiable et fonctionnalités de consultation pour  les Personnes, Organisations, Projets, Événements, Équipements et Lieux."
                },
                {
                    "value": "Branding et intégration de la maquette web pour la version 1 d'AVNU."
                },
                {
                    "value": "Système de connexion via l'API."
                },
                {
                    "value": "<strong>Équipe</strong>",
                    "additionnalClasses": "pt-3 pb-2"
                },
                {
                    "value": "<strong>Vincent P. Ruel</strong>, Intégration et front-end"
                },
                {
                    "value": "<strong>Frédéric Rivard</strong>, Backend et front-end"
                },
                {
                    "value": "<strong>Marc-André Martin</strong>, Backend, front-end et responsable du développement"
                },
                {
                    "value": "<strong>Simon Descoteau</strong>, coordination et gestion du produits"
                },
                {
                    "value": "<strong>Jeanne Perrin</strong> web design et UX"
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