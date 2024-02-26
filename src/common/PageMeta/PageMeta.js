import React from 'react'
import { useRouter } from 'next/router';

import Head from 'next/head';
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {lang} from "@/common/Data/GlobalConstants";
import {appUrl} from "@/src/helpers/url";
import DOMPurify from 'isomorphic-dompurify';

const lengthValidator = (text, recommandation, tagName="") => {

    //Validate the length and send a warning if greater
    if(text.length > recommandation)
        console.warn(`ATTENTION. \nIl est recommandé d'utiliser un texte d'une longueur maximale de ${recommandation} charactères pour la balise meta ${tagName}. \n\n${text}`)

    return text
}
/**
 * Generate a header component with all the defined tag
 * 
 * General details
 * @param props.title {string} Main title of the page
 * @param props.description {string} Main description of the page
 * @param props.keywords {string} Main keywords of the page
 * @Param props.preventIndexation {boolean} If true, the meta tag for robots/crawlers will be set at unfollow. False by default
 * @Param props.structuredData {Json} Contains data about the content of the page in a json shape
 * @Param props.ogTitle {String} Representing the title of the page to be shown on social medias. Must be engagning
 * @Param props.ogDescription {String} Representing the description of the page to be shown on social medias. Must be engagning
 * 
 * Media 
 * @Param props.image {String} Address of the image that will represent the page.
 * @Param props.imageAlt {String} Text descriptif du contenu de l'image
 * @Param props.imageWidth {Int} Announced width of the image
 * @Param props.imageHeight {Int} Announced height of the image

 * @return {array}
 */
const PageMeta = (props) => {

    //Extract the current address for the canonical
    const router = useRouter();
    const currentAddress = appUrl(router.pathname)

    //If those two aren't filled, the default values are going to be injected instead.
    const defaultPageTitle = lang.appDefaultName
    const defaultPageDescription = lang.appDefaultDescription

    //Og Values 
    const displayedOgTitle = lengthValidator((props.ogTitle || (props.title || defaultPageTitle)), 65, "og:title")
    const displayedOgDescription = lengthValidator((props.ogDescription || (props.description || defaultPageDescription)), 160, "og:description")

    //Default image for social media. The same by default for both
    const defaultImg = "/meta-images/Avnu---Open-Graph.jpg";
    const defaultImgAlt = "Logo officiel d'AVNU aux côtés de la fusée emblématique de l'organisation survolant le Québec et l'Ontario."
    const defaultImgWidth = "1200"
    const defaultImgHeight = "630"

    return (
        <Head>
            <title>{lengthValidator((props.title || defaultPageTitle), 65, "Title")}</title>

            {/* Keywords and description to evaluate */}
            <meta name="description" content={lengthValidator((props.description ?? defaultPageDescription), 160, "Description")}/>  
            {props.keywords && <meta name="keywords" content={props.keywords}/>}
            {props.preventIndexation ? 
                <meta name="robots" content="noindex, nofollow" /> : 
                <meta name="robots" content="index, follow" /> 
            }
            <link rel="canonical" href={currentAddress} /> 

            {/*****************
             * 
             *  Open Graph Meta Tags 
             * 
             * */}
            {/* For the title and description, the component look for specific og:data, then for the general title and description values, and finaly for default values if nothing is available */}
            {displayedOgTitle && <meta property="og:title" content={displayedOgTitle}/>}
            {displayedOgDescription && <meta property="og:description" content={displayedOgDescription}/>}
            <meta property="og:url" content={currentAddress} />
            <meta property="og:locale" content="fr_CA" />
            {/* Note : absolute minimum size of an image for Open Graph is 200x200 pixels. To get the best display on high-resolution devices, it should be at least 1200x630 pixels */}
            <meta property="og:image" content={appUrl(props.image || defaultImg)} />
            {props.image ?
                <>
                    {props.imageAlt && <meta property="og:image:alt" content={props.imageAlt} />}
                    {props.imageWidth && <meta property="og:image:width" content={String(props.imageWidth)} />}
                    {props.imageHeight && <meta property="og:image:height" content={String(props.imageHeight)} />}
                </> : 
                <>  {/* Default values kicking in if there is no image defined */}      
                    <meta property="og:image:alt" content={defaultImgAlt} />
                    <meta property="og:image:width" content={defaultImgWidth} />
                    <meta property="og:image:height" content={defaultImgHeight} />
                </>
            }

            {/*****************
             * 
             *  Twitter Meta Tags
             *  For now, using the same values as og
             * 
             * */}
            {displayedOgTitle && <meta name="twitter:title" content={displayedOgTitle}/>}
            {displayedOgDescription && <meta name="twitter:description" content={displayedOgDescription}/>}

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:image" content={appUrl(props.image || defaultImg)} />
            {props.image ?
                <>
                    {props.imageAlt && <meta property="twitter:image:alt" content={props.imageAlt} />}
                    {props.imageWidth && <meta property="twitter:image:width" content={String(props.imageWidth)} />}
                    {props.imageHeight && <meta property="twitter:image:height" content={String(props.imageHeight)} />}
                </> : 
                <>  {/* Default values kicking in if there is no image defined */}      
                    <meta property="twitter:image:alt" content={defaultImgAlt} />
                    <meta property="twitter:image:width" content={defaultImgWidth} />
                    <meta property="twitter:image:height" content={defaultImgHeight} />
                </>
            }

            {/*
            {
                props.structuredData &&
                <SanitizedInnerHtml  
                    tag="script" 
                    type='application/ld+json'
                >
                    {JSON.stringify(props.structuredData)}
                </SanitizedInnerHtml>
            } 
            */}


            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(JSON.stringify(props.structuredData))}}
            />

    

        </Head>
    )
}

export default PageMeta

/* To be developped, one day                
    <meta name="twitter:label1" content="Written by" />
    <meta name="twitter:data1" content="Author's user" />
    <meta name="twitter:label2" content="Reading time" />
    <meta name="twitter:data2" content="3 minutes (static value)" />
    ** The Open Graph protocol **

    <meta property="article:section" content="Technology" />
    <meta property="article:tag" content="data" />
    <meta property="article:tag" content="teachnocreatif" />
*/