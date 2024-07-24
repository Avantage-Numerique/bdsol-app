import React from 'react';

//Components
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {ExternalLink} from '@/src/common/Components/ExternalLink';

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
        <div className={`p-1 ${styles["single-social-handle"]} text-break`}>
            {
                data.url === `${data.url}` && data.label === `${data.label}` &&
                <ExternalLink href={data.url} title={data.url} target='_blank'>
                    <span>{data.label}</span>
                </ExternalLink>
            }
        </div>
    )
}


/**
 * 
 * @param {Array} props.urls array of link to be displayed
 * @param {String} props.title String containing the title of the section
 *
 */
const SocialHandleDisplay = ({ url, title, className }) => {
    let orderedUrls = [];
    
    if(Array.isArray(url))
        orderedUrls = url.sort((a, b) => (a.subMeta.order > b.subMeta.order) ? 1 : -1);

    return (
        (orderedUrls.length > 0) &&
            <SingleInfo title={title} className={className}>
                {
                    orderedUrls.map( (singleUrl, i) => <SingleSocialHandle data={singleUrl} key={("url_" + singleUrl.url+i)} />)
                }
            </SingleInfo>
        
    )
}

export default SocialHandleDisplay
