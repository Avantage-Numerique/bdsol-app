//Styles
import styles from './SingleBase.module.scss';

//Component
import SingleBaseHeader from './defaultSections/SingleBaseHeader';
import {Breadcrumbs} from "@/common/Breadcrumbs/Breadcrumbs";
import React from "react";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import {removeTagsFromString} from "@/src/helpers/html";
import PageMeta from "@/src/common/PageMeta/PageMeta";


/**
 * 
 * @param {React.Component} props.header
 * @param {React.Component} props.mainImageContainer
 * @param {React.Component} props.fullWidthContent content under header
 * @param {React.Component} props.contentColumnLeft main content column left
 * @param {React.Component} props.contentColumnRight main content column right
 * @param {React.Component} props.footer
 * @param {React.Component} props.singlePageBottom
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
        singlePageBottom,
        model
    } = props;

    const imageSrc = model ? model.mainImageModel.src : "";

    return (
        <>
            <PageMeta 
                title={getTitle([model?.meta.title, model?.Type.label]) || ""}
                description={removeTagsFromString(model?.meta.description) || ""}
                imageFromApi={imageSrc || ""}
                imageAlt={getTitle([model?.meta.title, model?.Type.label]) || ""}
                canonical={model?.fullSingleLinkUrl || ""}
            />
            
            <div>
            
                { /* Header */ }
                <header className={`${styles["header-base"]} ${styles["full-width-container"]} position-relative`}>
                    <div className="container">
                        {/* Header's content */}
                        { header || <SingleBaseHeader/> }
                    </div>
                </header>
                {/* Breadcrumb section */}
                {  breadCrumb &&
                    <div className="row pt-sm-4 mt-sm-4">
                        <div className="col-12 pt-4 mt-4">
                            <Breadcrumbs className={"pt-4"} labels={breadCrumb.labels} route={breadCrumb.route} getLabelGenerator={breadCrumb.getLabelGenerator || undefined} getHrefGenerator={breadCrumb.getHrefGenerator || undefined} />
                        </div>
                    </div>
                }
                { /* FullWidthContent */ }
                <section className="row">
                    <div className="col-12">
                        { fullWidthContent && fullWidthContent }
                    </div>
                </section>

                { /* ContentColumn */ }
                <div className="row">
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
                    <footer className="row">
                        { footer } 
                    </footer>
                }

                {/* Page bottom : CTA + progress */}
                {
                    singlePageBottom &&
                    <section className={`${styles["full-width-container"]} position-relative bg-primary-lighter`}>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-center align-items-center py-4">
                                    {singlePageBottom}
                                </div>
                            </div>
                        </div>
                    </section>
                }

            </div>
        </>
    )

}

export default SingleBase;