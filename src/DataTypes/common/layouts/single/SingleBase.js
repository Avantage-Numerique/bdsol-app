//Styles
import styles from './SingleBase.module.scss';

//Component
import SingleBaseHeader from './defaultSections/SingleBaseHeader';
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import Head from "next/head";
import React from "react";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import {removeTagsFromString} from "@/src/helpers/html";


/**
 * 
 * @param {React.Component} header
 * @param {React.Component} mainImageContainer
 * @param {React.Component} fullWidthContent content under header
 * @param {React.Component} contentColumnLeft main content column left
 * @param {React.Component} contentColumnRight main content column right
 * @param {React.Component} footer
 * 
 */

const SingleBase = (props) => {

    //Main props destructuring
    const {
        breadCrumb,
        header,
        fullWidthContent,
        contentColumnLeft,
        contentColumnRight,
        footer,
        model
    } = props;

    const defaultHeaderBg = props.defaultHeaderBg ?? "/general_images/single-header-default-bg.svg";//"/general_images/default-single-background.jpg";

    return (
        <>
            { model &&
                <Head>
                    <title>{getTitle([model.title, model.Type.label])}</title>
                    <meta property="og:url" content={model.fullSingleLinkUrl} />
                    <meta property="og:title" content={model.title} />
                    <meta property="og:description" content={removeTagsFromString(model.description)} />
                    <meta property="og:image" content={model.mainImage.src} />
                    <meta property="og:image:alt" content={model.title} />
                    <meta property="og:image:width" content="2560" />
                    <meta property="og:image:height" content="1345" />

                    <meta name="twitter:title" content={model.title} />
                    <meta name="twitter:description" content={removeTagsFromString(model.description)} />
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:image" content={model.mainImage.src} />
                    <meta name="twitter:image:alt" content="Public assistant à une performance qui contient des nouvelles technologies."/>
                    <meta name="twitter:image:width" content="2560" />
                    <meta name="twitter:image:height" content="1345" />

                    <meta name="twitter:label1" content={"Type"} />
                    <meta name="twitter:data1" content={model.type.label} />
                    <meta name="twitter:label2" content={"Temps de lecture"} />
                    <meta name="twitter:data2" content={"3 minutes (static value)"} />

                    <meta property="article:section" content="Main domain" />
                    <meta property="article:tag" content="start loop of taxonomy 1" />
                    <meta property="article:tag" content="end loop of taxonomy 1" />
                </Head>
            }
            <div className="container">
                { /* BreadCrumbs */ }
                {  breadCrumb &&
                <div className="row">
                    <Breadcrumbs className={"pt-2"} route={breadCrumb.route} getLabelGenerator={breadCrumb.getLabelGenerator || undefined} getHrefGenerator={breadCrumb.getHrefGenerator || undefined} />
                </div>
                }

                { /* Header */ }
                {/* Background image */}
                <header className={`${styles["header-base"]} row position-relative`}>
                    <figure className={`${styles["background-image-figure"]} p-0 rounded overflow-hidden bg-primaryextratlight`}>
                        <img className="w-100 opacity-5" src={defaultHeaderBg} alt="Image d'arrière plan de l'entête"/>
                        <div className={`dark-transparent-gradient doubled`}></div>
                    </figure>

                    {/* Header's content */}
                    { header ?? <SingleBaseHeader/> }
                </header>

                { /* FullWidthContent */ }
                <section className="row p-2 my-4">
                    { fullWidthContent && fullWidthContent }
                </section>

                { /* ContentColumn */ }
                <div className="row p-2 my-4">

                    { /* ContentColumnLeft */ }
                    <section className="col-md-8">
                        { contentColumnLeft && contentColumnLeft }
                    </section>


                    { /* ContentColumnRight */ }
                    <section className="col-md-4">
                        { contentColumnRight && contentColumnRight }
                    </section>

                </div>

                { /* Footer */ }
                <footer className="row p-2">
                    { footer && footer }
                </footer>

            </div>
        </>
    )

}

export default SingleBase;