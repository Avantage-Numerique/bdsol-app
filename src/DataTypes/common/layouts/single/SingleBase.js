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
 * @param {React.Component} props.header
 * @param {React.Component} props.mainImageContainer
 * @param {React.Component} props.fullWidthContent content under header
 * @param {React.Component} props.contentColumnLeft main content column left
 * @param {React.Component} props.contentColumnRight main content column right
 * @param {React.Component} props.footer
 * @param {React.Component} props.model
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

    const imageSrc = model ? (model.mainImage.src ?? model.src) : "";//model.type === "Media" ? model.mainImage.src : model.mainImage.url;
    return (
        <>
            { model &&
                <Head>
                    <title>{getTitle([model.meta.title, model.Type.label])}</title>
                    <meta property="og:url" content={model.fullSingleLinkUrl} />
                    <meta property="og:title" content={model.meta.title} />
                    <meta property="og:description" content={removeTagsFromString(model.meta.description)} />
                    <meta property="og:image" content={imageSrc} />
                    <meta property="og:image:alt" content={model.title} />
                    <meta property="og:image:width" content="2560" />
                    <meta property="og:image:height" content="1345" />

                    <meta name="twitter:title" content={model.meta.title} />
                    <meta name="twitter:description" content={removeTagsFromString(model.meta.description)} />
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:image" content={imageSrc} />
                    <meta name="twitter:image:alt" content="Public assistant à une performance qui contient des nouvelles technologies."/>
                    <meta name="twitter:image:width" content="2560" />
                    <meta name="twitter:image:height" content="1345" />

                    <meta name="twitter:label1" content={"Type"} />
                    <meta name="twitter:data1" content={model.type.label} />
                    <meta name="twitter:label2" content={"Temps de lecture"} />
                    <meta name="twitter:data2" content={"3 minutes (test)"} />

                    <meta property="article:section" content="Main domain" />
                    <meta property="article:tag" content="start loop of taxonomy 1" />
                    <meta property="article:tag" content="end loop of taxonomy 1" />
                </Head>
            }
            
            <div>
                

                { /* Header */ }
                <header className={`${styles["header-base"]} ${styles["full-width-container"]} position-relative`}>
                    <div className="container">
                        { /* BreadCrumbs  */ }
                        {  breadCrumb &&
                            <div className="row">
                                <Breadcrumbs className={"pt-2"} route={breadCrumb.route} getLabelGenerator={breadCrumb.getLabelGenerator || undefined} getHrefGenerator={breadCrumb.getHrefGenerator || undefined} />
                            </div>
                        }
                
                        {/* Header's content */}
                        { header || <SingleBaseHeader/> }
                    </div>
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
                { footer &&
                    <footer className="row p-2">
                        { footer } 
                    </footer>
                }

            </div>
        </>
    )

}

export default SingleBase;