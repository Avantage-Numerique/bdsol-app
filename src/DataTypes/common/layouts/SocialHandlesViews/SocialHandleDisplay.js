import React from 'react';

//Components 
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import Icon from "@/src/common/widgets/Icon/Icon"

//Styles 
import styles from './SocialHandleDisplay.module.scss';

/**
 * 
 *  @param {String} props.label Title of the link to be displayed
 *  @param {Object} props.subMeta meta data as the order number
 *  @param {String} props.url String of the external link address
 *
 */
const SingleSocialHandle = ( {data} ) => {
    return (
        <div className={`p-1 ${styles["single-social-hangle"]}`}>
            <a href={data.url} className="d-flex flex-column" target='blank'>
                {/* Label section */}
                <div className="d-flex">
                    <p className="m-0 fw-semibold text-truncate">{data.label}</p>
                    <Icon className={`ms-2 fs-5 font-weight-bold ${styles["single-social-hangle__icons"]}`} iconName={`las la-external-link-alt`}/>
                </div>
                {/* Display link */}
                <small>
                    <p className={`m-0 text-truncate text-secondary ${styles["single-social-hangle__link"]}`}>{data.url}</p>
                </small>
            </a>
        </div>
    )
}


/**
 * 
 * @param {Array} props.urls array of link to be displayed
 * @param {String} props.title String containing the title of the section
 *
 */
const SocialHandleDisplay = ({ url, title }) => {

    const orderedUrls = url.sort((a, b) => (a.subMeta.order > b.subMeta.order) ? 1 : -1);

    return (
        <SingleInfo title={title}>
            {orderedUrls.map( (singleUrl) => <SingleSocialHandle data={singleUrl} key={("url_" + singleUrl.url)} />)}
        </SingleInfo>
    )
}

export default SocialHandleDisplay
