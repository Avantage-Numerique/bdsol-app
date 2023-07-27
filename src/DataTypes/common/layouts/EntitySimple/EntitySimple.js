import React from 'react';

//components
import KebabButton from '@/common/FormElements/KebabButton/KebabButton'

//Styling
import styles from './EntitySimple.module.scss';
import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";
import {getType} from "@/DataTypes/Entity/Types";
import HtmlTagsRemover from '@/src/utils/HtmlTagsRemover'
import Link from "next/link";


/**
 *
 * @param props
 * @param props.className {String}
 * @param props.model {EntitySimple|object}
 * @param props.Header {JSX.Component}
 * @param props.Content {JSX.Component}
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
        //showEntityType,
        //Props for informations to display
        //title,
        //imgSrc,
        //imgAlt,
        //description,
        tagListTitle,
        tagList,
        tagKeyName,
        model
    } = props;

    //content
    const title = model.title;
    const description = model.shortDescription;
    //params
    const showEntityType = props.showEntityType ?? true;
    const appType = getType(model.type);


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
                <h4 className={`position-relative text-white fw-normal m-0 ${styles["entity-type"]}`}>{appType.label}</h4>
            }
        </div>
    );

    /**
     * Defining the ContenDefault layout for the EntitySimple, TO be overwrite with Content.
     * @type {JSX.Element}
     */
    const ContentDefault = (
        <>
            <header className="d-flex justify-content-between">
                {/* Main name of the entity */}
                <h3 className={` 
                    ${styles["simple-abstract__content__title"]}
                    ${styles["simple-abstract__content_ellipsis"]}
                `}>
                    {model.title}
                </h3>
                {/* Redirection button */}
                { model.singleLink && <KebabButton href={model.singleLink} /> }
            </header>
            <section>
                {/* Description */}
                {description ? 
                    <HtmlTagsRemover 
                        tag="p"
                        className={`
                            ${styles["simple-abstract__content__description"]}
                            ${styles["simple-abstract__content_ellipsis"]}
                        `}>
                        {description}
                    </HtmlTagsRemover> :
                    <p className={`${styles["simple-abstract__content__description"]}`}>Aucune description</p>
                }
                {/* List of tags 
                <ul className={`d-flex flex-wrap ${styles["simple-abstract__content__tagList"]}`}>
                    {tagList && tagList.length > 0 &&
                        tagList.map(tag => (
                            <li className="rounded">{tag[tagKeyName]}</li>
                        ))
                    }
                </ul>
                */}

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