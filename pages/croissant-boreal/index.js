import { lang } from "@/src/common/Data/GlobalConstants";

import PageHeader from "@/src/layouts/Header/PageHeader";
import PageMeta from "@/src/common/PageMeta/PageMeta";

import { getBadgesInfo } from "@/src/DataTypes/Badges/BadgesSection";
import { ExternalLink } from "@/common/Components/ExternalLink";
import React from "react";

const HomePage = (props) => {
    //  LD+Json data
    const schema = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        name: lang.appDefaultName, //"Ontologie - Avantage Numérique",
        description: lang.appDefaultDescription, //"Base de donnée ouverte et liée crée par Avantage Numérique et qui recense les techno-créatifs sur le territoire du Croissant boréal.",

        producer: {
            "@context": "http://schema.org",
            "@type": "Organization",
            name: lang.appDefaultProducer, //"Avantage Numérique",
            description: lang.appDefaultDescription, //"Avantage numérique est un hub virtuel, physique et mobile qui dessert les secteurs de la culture, des affaires et du savoir. Il vise le développement de l’écosystème créatif, entrepreneurial et technologique du Croissant boréal.",
            mainEntityOfPage: "https://avnu.ca/",
        },
    };

    const headerDescription = () => {
        return (
            <div>
                <ExternalLink href={"https://fr.wikipedia.org/wiki/Projet:Croissant_bor%C3%A9al"}>
                    Le projet du croissant boraél sur Wikipédia
                </ExternalLink>
                <ExternalLink href={"https://avantagenumerique.org/le-croissant-boreal/"}>
                    La page dédier au territoire sur le site web d'Avantage Numérique
                </ExternalLink>
            </div>
        );
    };

    const badgeCroissantBoreal = props.badgesInfo && props.badgesInfo.CB ? props.badgesInfo.CB : null;

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
                title={lang.croissantBorealTitle}
                subTitle={lang.croissantBorealDescription}
                description=""
                image={"/general_images/CroissantBoreal.png"}
                imgAlt={"Carte du Croissant boréal"}
                leftColClassName=""
                key={"pageHeaderHomePage"}
                reverseWrap
            >
                <ExternalLink href={"https://fr.wikipedia.org/wiki/Projet:Croissant_bor%C3%A9al"}>
                    Le projet du croissant boraél sur Wikipédia
                </ExternalLink>
                <ExternalLink href={"https://avantagenumerique.org/le-croissant-boreal/"}>
                    La page dédier au territoire sur le site web d'Avantage Numérique
                </ExternalLink>
            </PageHeader>
            <section className="container py-4">
                {/* Display of 6 latest entities*/}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Le territoire du Croissant Boréal</h2>
                        <p>
                            Le Nord de l’Ontario francophone, l’Abitibi-Témiscamingue et le Nord-du-Québec ont de
                            nombreux points communs en matière de territoire, d’économie, d’identité et de culture. En
                            nous unissant, nous augmentons notre pouvoir d’action et favorisons notre déploiement à
                            l’échelle nationale et internationale et au sein de la francophonie.
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>
                            Le projet d'AVNU est né <br />
                            dans le croissant boréal
                        </h2>
                        <p>
                            Nous avons commencé à ajouter des badges pour identifier chacun des technocréatifs dans les
                            territoires d'AVNU. Le premier est pour le croissant Boréal.
                        </p>
                        <ul>
                            {badgeCroissantBoreal && (
                                <li key={`badge-CB`} className={"list-group-item p-0 position-relative"}>
                                    <img
                                        className=""
                                        width="40px"
                                        height="40px"
                                        src={badgeCroissantBoreal.iconPath}
                                        alt={badgeCroissantBoreal.iconAlt}
                                    />
                                    <span>{badgeCroissantBoreal?.label ?? "Badge"}</span>
                                    <span className={"badge bg-secondary ms-2"}>
                                        {badgeCroissantBoreal.description}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

//Load badges Info
export async function getServerSideProps() {
    const badgeInfo = await getBadgesInfo(true);
    return {
        props: {
            badgesInfo: badgeInfo,
        },
    };
}
