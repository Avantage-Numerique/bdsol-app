import React from "react";

//Components
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { ExternalLink } from "@/src/common/Components/ExternalLink";

//Styles
import styles from "./SameAsDisplay.module.scss";

/**
 *
 *  @param {string} props.label Title of the link to be displayed
 *  @param {string} props.url String of the external link address
 */
const SingleSameAs = ({ label, url }) => {
    return (
        <div className={`p-1 ${styles["single-same-as"]} text-break`}>
            <ExternalLink href={url} title={url} target="_blank">
                <span>{label ?? url}</span>
            </ExternalLink>
        </div>
    );
};

/**
 *
 * @param {Object} props
 * @param {{ label: string, url: string }[]} props.urls array of link to be displayed
 * @param {string} props.title String containing the title of the section
 *
 */
const SameAsDisplay = ({ urls, title, className }) => {
    let orderedUrls = [];

    if (Array.isArray(urls)) orderedUrls = urls.sort((a, b) => (a.subMeta.order > b.subMeta.order ? 1 : -1));

    return (
        orderedUrls.length > 0 && (
            <SingleInfo
                title={title}
                className={className}
                tooltip={{ header: "Web Sémantique", body: 'Propriété "sameAs" du web sémantique' }}
            >
                {orderedUrls.map((singleUrl, i) => (
                    <SingleSameAs label={singleUrl.label} url={singleUrl.url} key={"url_" + singleUrl.label + i} />
                ))}
            </SingleInfo>
        )
    );
};

export default SameAsDisplay;
