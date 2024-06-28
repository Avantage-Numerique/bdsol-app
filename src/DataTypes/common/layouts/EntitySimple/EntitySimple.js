import { useEffect, useState } from 'react';
import styles from './EntitySimple.module.scss';
import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";
import {getType} from "@/DataTypes/Entity/Types";
import HtmlTagsRemover from '@/src/utils/HtmlTagsRemover'
import Link from "next/link";
import TypeTag from '@/DataTypes/common/layouts/TypeTag/TypeTag'

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
    const isBottomLine = (BottomLineContent || model.singleList);

    //Set up badges
    const [badgeToShowState, setBadgeToShowState] = useState(undefined);
    //If props.badgesInfo exist, badges array exist in entity and is > 0 length fetch badges info
    useEffect( () => {
        if( props.badgesInfo !== undefined && model.badges !== undefined && Array.isArray(model.badges) && model.badges.length > 0){
            setBadgeToShowState(props.badgesInfo[model.badges[0]]);
        }
    }, [props.badgesInfo])

    /**
     * Defining the default header fo the EntitySimple to be overwrite with Header
     * @type {JSX.Element}
     */
    const HeaderDefault = (
        <div className={"h-100 d-flex flex-column"}>
            {/* Tag container */}
            <div className="mb-2">
                <TypeTag 
                    type={appType.label}
                    icon={appType.modelClass.icon}
                />
            </div>
            {/* Image representing the entity */}
            { model.mainImage &&
                <div className="d-flex justify-content-center w-100 mt-4">
                    <MediaFigure
                        model={model.mainImage}
                        className={`${styles["simple-abstract__header__figure"]} t-0 ${model.mainImage.isDefault && (styles["img-contained"] + " py-3")}`}
                        imgClassName={`${styles["simple-abstract__header__figure__img"]}`}
                        addGradientOver={true}
                        link={model.singleLink}
                        linkTitle={title}
                        addLinkTag={false}
                    >
                        {!model.mainImage.isDefault && <div className={`${styles["figure-overlay"]} position-absolute w-100 h-100 no-pointer-events dark-transparent-gradient`}></div> }
                    </MediaFigure>
                    {
                        badgeToShowState !== undefined && 
                        (
                            <div className={"position-absolute top-100 start-100 translate-middle"} style={{marginLeft: "-105px", paddingBottom: "70px"}}>
                                <img src={badgeToShowState?.iconPath} alt={badgeToShowState?.iconAlt ?? "Badge"} width="40px" height="40px"/>
                            </div>
                        )
                    }
                </div>
            }
            {/* Display over the entity the type of image 
            {showEntityType && appType &&
                <h4 title={appType.label} className={`position-relative text-white fw-normal justify-self-end m-2 p-0 ${styles["entity-type"]}`}><Icon iconName={appType.icon}/></h4>
            }
            */}
        </div>
    );

    /**
     * Defining the ContenDefault layout for the EntitySimple, TO be overwrite with Content.
     * @type {JSX.Element}
     *
     *
     */

    const maxWidthCaracters = 30;
    const totalTags = model.singleList?.length;
    let maxTags = 2;
    let restOfTags = totalTags - maxTags;
    let tagRenderedLength = -1;
    let totalCaracters = 0;

    const ContentDefault = (
        <>
            <header className={`d-flex mb-2 justify-content-between ${styles["simple-abstract__content__header"]}`}>
                {/* Main name of the entity */}
                <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                    <h3 className={`w-100 m-0 text-center
                        ${styles["simple-abstract__content__title"]}
                        ${styles["simple-abstract__content_ellipsis"]}
                    `}>
                        {model.title}
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
                {description &&
                    <HtmlTagsRemover 
                        tag="p"
                        className={`
                            mb-0
                            text-center
                            ${styles["simple-abstract__content__description"]}
                            ${styles["simple-abstract__content_ellipsis"]}
                            ${!isBottomLine && styles["simple-abstract__content_ellipsis--3lines"]}
                        `}>
                        {description}
                    </HtmlTagsRemover>
                }

                { !BottomLineContent && model.singleList &&

                    <ul className={`d-flex mb-0 ${styles["simple-abstract__content__tagList"]} justify-content-center`}>
                        {model.singleList.length > 0 &&
                            model.singleList.map((tag, index) => {
                                let Tag;
                                if (index < maxTags) {
                                    totalCaracters += tag.length;
                                    Tag = (
                                        <li key={tag} title={tag} className="rounded bg-general-tag">{tag}</li>
                                    )
                                }
                                {/* Check if the next elements with bust the maxWidthCaracters for length of the occupations/offers */}
                                const nextIndex = index+1;
                                const isLast = nextIndex >= model.singleList.length;
                                const nextTag = !isLast ? model.singleList[nextIndex] : null;
                                const willNextTotalCaractersTotalBust = totalCaracters + nextTag?.length  >= maxWidthCaracters;

                                {/* setup variable to avoid rendering all new tags if the lenght is too much. To optimize we need to use a loop for (in/of) and use break/continue. */}
                                if ((totalCaracters >= maxWidthCaracters || willNextTotalCaractersTotalBust) && tagRenderedLength === -1) {
                                    maxTags = index;
                                    restOfTags = totalTags - index;
                                    tagRenderedLength = index;
                                }
                                return Tag;
                            })
                        }
                        {totalTags > maxTags &&
                            <li key={"tagListRest"} title={`+${restOfTags}`} className="rounded bg-general-tag last-tag"><span title={`+${restOfTags}`}>&hellip;</span></li>
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
            <Link href={model.singleLink} title={title}>
                {/* SECTION 1/2 : HeaderDefault */}
                <header className={`${styles["simple-abstract__header"]}`}>
                    {/* Override the display of the normal visual if there is the overRidingHeader is defined */}
                    { Header ? Header : HeaderDefault }
                </header>
                {/* SECTION 2/2 : Main content */}
                <section className={`${styles["simple-abstract__content"]}`}>
                    { Content ? Content : ContentDefault }
                </section>
            </Link>
        </Tag>
    )
}

export default EntitySimple