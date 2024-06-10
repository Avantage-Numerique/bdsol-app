import PageHeader from "@/layouts/Header/PageHeader";
import React from "react";
import {appConfig} from "@/src/configs/AppConfig";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import {lang} from "@/src/common/Data/GlobalConstants";
import Version from "@/src/versions/Version";


export async function getStaticProps() {
    let versionsList = [];
    versionsList.push(
        {
            label: "Première version",
            value: "1.0.0",
            description: "Mise en ligne le 23 mars 2024, nous avons fait X, Y et Z.",
            notes: [
                {
                    "value": "C'est pas de ma faute"
                },
                {
                    "value": "Awesome man"
                },
                {
                    "value": "This is not this"
                },
                {
                    "value": "This is a sub note with another tag than default",
                    "tag": "h4"
                },
                {
                    "value": "1- Sub note under h3 - 1"
                },
                {
                    "value": "2- Sub note under h3 - 2"
                }
            ]
        },
        {
            label: "Première version",
            value: "1.0.3",
            description: "Mise en ligne le 23 mars 2024, nous avons fait X, Y et Z.",
            notes: [
                {
                    "value": "C'est pas de ma faute"
                },
                {
                    "value": "Awesome man"
                }
            ]
        },
        {
            label: "Première version",
            value: "1.0.4",
            description: "Mise en ligne le 23 mars 2024, nous avons fait X, Y et Z.",
            notes: []
        },
        {
            label: "Première version",
            value: "1.0.5",
            description: "Mise en ligne le 23 mars 2024, nous avons fait X, Y et Z.",
            notes: [
                {
                    "value": "C'est pas de ma faute"
                },
                {
                    "value": "Awesome man"
                },
                {
                    "value": "This is not this"
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
                            <div className={`row ${!isLast ? "border-bottom" : ""} pb-5`}>
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