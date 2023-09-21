import React from 'react';

//components
//Styling
import styles from './EntitySimple.module.scss';
import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";
import {getType} from "@/DataTypes/Entity/Types";
import HtmlTagsRemover from '@/src/utils/HtmlTagsRemover'
import Link from "next/link";
import Icon from "@/common/widgets/Icon/Icon";


/**
 *
 * @param props
 * @param props.className {String}
 * @param props.model {EntitySimple|object}
 * @param props.Header {JSX.Component}
 * @param props.Content {JSX.Component}
 * @param props.BottomLineContent {JSX.Component} Define the overwriting of the last line under the description
 * @param props.tagListTitle {String} Title of the section containing a list of tag
 * @param props.tagList  {Object}  List to be displayed of individual tags
 * @return {JSX.Element}
 * @constructor
 */
const EntitySimple = (props) => {
    const Tag = "article";

    /**** Deconstructiong props ******/
    const {
        className,
        //Props for this component fonctionalities
        //redirectionLink,
        Header,
        Content,
        BottomLineContent,
        //showEntityType,
        //Props for informations to display
        //title,
        //imgSrc,
        //imgAlt,
        //description,
        model
    } = props;

    //content
    const title = model.title;
    const description = model.shortDescription;
    //params
    const showEntityType = props.showEntityType ?? true;
    const appType = getType(model.type);
    //Verify is a bottom line is available to be displayed
    const isBottomLine = (BottomLineContent || model.simgleList);


    /**
     * Defininf the default header fo the EntitySimple to be overwrite with Header
     * @type {JSX.Element}
     */
    const HeaderDefault = (
        <div className={"d-flex h-100 justify-content-start align-items-end"}>
            {/* Image representing the entity */}
            { model.mainImage &&
                <div>
                    <Link href={model.singleLink} title={title}>
                        <a>
                            <MediaFigure
                                model={model.mainImage}
                                className={`${styles["simple-abstract__header__figure"]} position-absolute top-0 start-0 w-100 h-100 t-0`}
                                imgClassName={`${styles["simple-abstract__header__figure__img"]}`}
                                addGradientOver={true}>
                                <div className={`${styles["figure-overlay"]} position-absolute w-100 h-100 no-pointer-events dark-transparent-gradient`}></div>
                            </MediaFigure>
                        </a>
                    </Link>
                </div>
            }
            {/* Display over the entity the type of image */}
            {showEntityType && appType &&
                <h4 title={appType.label} className={`position-relative text-white fw-normal justify-self-end m-2 p-0 ${styles["entity-type"]}`}><Icon iconName={appType.icon}/></h4>
            }
        </div>
    );

    /**
     * Defining the ContenDefault layout for the EntitySimple, TO be overwrite with Content.
     * @type {JSX.Element}
     *
     *
     */
    const ContentDefault = (
        <>
            <header className={`d-flex mb-2 justify-content-between ${styles["simple-abstract__content__header"]}`}>
                {/* Main name of the entity */}
                <div className={"w-100 d-flex flex-column justify-content-center "}>
                    <h3 className={`w-100 m-0 
                        ${styles["simple-abstract__content__title"]}
                        ${styles["simple-abstract__content_ellipsis"]}
                    `}>
                        <Link href={model.singleLink} title={title}>
                            <a className={"d-block w-100"}>
                                {model.title}
                            </a>
                        </Link>
                    </h3>
                </div>
                {/* model.singleLink && <KebabButton href={model.singleLink} /> */}
            </header>
            <section className={`
                d-flex
                justify-content-between
                flex-column
                ${styles["simple-abstract__sub-section"]}
            `}>
                {/* Description */}
                {description ? 
                    <HtmlTagsRemover 
                        tag="p"
                        className={`
                            mb-0
                            ${styles["simple-abstract__content__description"]}
                            ${styles["simple-abstract__content_ellipsis"]}
                            ${!isBottomLine && styles["simple-abstract__content_ellipsis--3lines"]}
                        `}>
                        {description}
                    </HtmlTagsRemover> :
                    <p className={`mb-0 ${styles["simple-abstract__content__description"]}`}>Aucune description</p>
                }
                {/* List of tags */}
                { !BottomLineContent && model.simgleList && 
                <ul className={`d-flex mb-0 ${styles["simple-abstract__content__tagList"]}`}>
                    {model.simgleList.length > 0 &&
                        model.simgleList.map(tag => (
                            <li key={tag} title={tag} className="rounded">{tag}</li>
                        ))
                    }
                </ul>
                }
                {/* Overwrite buttom line content */}
                { BottomLineContent && 
                    <BottomLineContent />
                }
            </section>
        </>
    );

    return (
        <Tag className={`${className} rounded ${styles["simple-abstract"]}`}>
            {/* SECTION 1/2 : HeaderDefault */}
            <header className={`${styles["simple-abstract__header"]}`}>
                {/* Override the display of the normal visual if there is the overRidingHeader is defined */}
                { Header ? Header : HeaderDefault }
            </header>
            {/* SECTION 2/2 : Main content */}
            <section className={`${styles["simple-abstract__content"]}`}>
                { Content ? Content : ContentDefault }
            </section>
        </Tag>
    )
}

export default EntitySimple