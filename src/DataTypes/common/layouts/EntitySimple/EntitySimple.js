import { useMemo } from "react";
import styles from "./EntitySimple.module.scss";

import MediaFigure from "@/DataTypes/Media/layouts/MediaFigure";
import { getType } from "@/DataTypes/Entity/Types";
import TypeTag from "@/DataTypes/common/layouts/TypeTag/TypeTag";
import { htmlToTextSingleParagraph, truncate } from "@/src/helpers/str";

import Link from "next/link";
import { htmlToText } from "html-to-text";
import Image from "next/image";

/**
 * @typedef {Object} EntitySimpleProps
 *
 * @property {React.Component} Header
 * @property {React.Component} Content
 * @property {React.Component} BottomLineContent
 *
 * @property {EntityModel} model
 *
 * @property {string} [className]
 * @property {boolean} [showEntityType]
 * @property {BadgeProps[]} [badgesInfo]
 */

/**
 * @type {(props: EntitySimpleProps) => React.JSX.Element}
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
        model,
        badgesInfo,
    } = props;

    //content
    const maxTitlelength = 40;
    const truncatedTitle = htmlToText(truncate(model.title, maxTitlelength, true));
    // const titleEllipsis = title.length > maxTitlelength ? "..." : "";

    const description = htmlToTextSingleParagraph(model.description).substring(0, 87);
    const descriptionEllipsis = htmlToTextSingleParagraph(model.description).length > 87 ? "..." : "";

    //params
    // const showEntityType = props.showEntityType ?? true;
    const appType = getType(model.type);
    //Verify is a bottom line is available to be displayed
    const isBottomLine = BottomLineContent || model.singleList;

    /**
     * @typedef {{ iconPath?: string; iconAlt?: string; label?: string; }} BadgeProps
     */

    /**
     * @type {ReturnType<typeof useMemo<BadgeProps>>}
     */
    const badgeToShow = useMemo(
        () =>
            props.badgesInfo !== undefined &&
            model.badges !== undefined &&
            Array.isArray(model.badges) &&
            model.badges.length > 0
                ? props.badgesInfo[model.badges[0]]
                : undefined,
        [props.badgesInfo, model.badges]
    );

    /**
     * Defining the default header fo the EntitySimple to be overwrite with Header
     * @type {JSX.Element}
     */
    const HeaderDefault = (
        <div className={"h-100 d-flex flex-column"}>
            {/* Tag container */}
            <div className="mb-2">
                <TypeTag type={appType.label} icon={appType.modelClass.icon} />
            </div>
            {/* Image representing the entity */}
            {model.mainImage && (
                <div className="d-flex justify-content-center w-100 mt-4">
                    <div className={`${styles["simple-abstract__header__figure__container"]}`}>
                        <MediaFigure
                            model={model.mainImage}
                            className={`${styles["simple-abstract__header__figure"]} t-0 ${model.mainImage.isDefault && styles["img-contained"] + " py-3"}`}
                            imgClassName={`${styles["simple-abstract__header__figure__img"]}`}
                            addGradientOver={true}
                            link={model.singleLink}
                            linkTitle={model.title}
                            addLinkTag={false}
                        >
                            {!model.mainImage.isDefault && (
                                <div
                                    className={`${styles["figure-overlay"]} position-absolute w-100 h-100 no-pointer-events dark-transparent-gradient`}
                                ></div>
                            )}
                        </MediaFigure>

                        {badgeToShow !== undefined && (
                            <div
                                className={`position-absolute bottom-0 end-0 ${styles["simple-abstract__header__badge"]} `}
                            >
                                <Image
                                    src={badgeToShow?.iconPath}
                                    alt={badgeToShow?.iconAlt ?? "Badge"}
                                    width="40"
                                    height="40"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    /**
     * Defining the ContenDefault layout for the EntitySimple, TO be overwrite with Content.
     * @type {JSX.Element}
     */
    const maxWidthCaracters = 30;
    const totalTags = model.singleList?.length;
    let maxTags = 2;
    let restOfTags = totalTags - maxTags;
    let tagRenderedLength = -1;
    let totalCharacters = 0;

    const ContentDefault = (
        <>
            <header className={`d-flex mb-2 justify-content-between ${styles["simple-abstract__content__header"]}`}>
                {/* Main name of the entity */}
                <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                    <h3
                        title={model.title}
                        className={`w-100 m-0 text-center
                        ${styles["simple-abstract__content__title"]}
                        `}
                        // ${styles["simple-abstract__content_ellipsis"]}
                    >
                        {truncatedTitle}
                    </h3>
                </div>
                {/* model.singleLink && <KebabButton href={model.singleLink} /> */}
            </header>
            <section
                className={`
                d-flex
                justify-content-between
                flex-column
                ${styles["simple-abstract__sub-section"]}
            `}
            >
                <p
                    className={`
                        mb-0
                        text-center
                        ${styles["simple-abstract__content__description"]}
                        ${styles["simple-abstract__content_ellipsis"]}
                        ${!isBottomLine && styles["simple-abstract__content_ellipsis--3lines"]}
                    `}
                >
                    {description && description + descriptionEllipsis}
                </p>

                {!BottomLineContent && model.singleList && (
                    <ul className={`d-flex mb-0 ${styles["simple-abstract__content__tagList"]} justify-content-center`}>
                        {model.singleList.length > 0 &&
                            model.singleList.map((tag, index) => {
                                let Tag;
                                if (index < maxTags) {
                                    if (tag) {
                                        totalCharacters += tag.length ?? 0;
                                        Tag = (
                                            <li key={`${tag}${index}`} title={tag} className="rounded bg-general-tag">
                                                {tag}
                                            </li>
                                        );
                                    }
                                }
                                {
                                    /* Check if the next elements with bust the maxWidthCaracters for length of the occupations/offers */
                                }
                                const nextIndex = index + 1;
                                const isLast = nextIndex >= model.singleList.length;
                                const nextTag = !isLast ? model.singleList[nextIndex] : null;
                                const willNextTotalCaractersTotalBust =
                                    totalCharacters + nextTag?.length >= maxWidthCaracters;

                                {
                                    /* setup variable to avoid rendering all new tags if the lenght is too much. To optimize we need to use a loop for (in/of) and use break/continue. */
                                }
                                if (
                                    (totalCharacters >= maxWidthCaracters || willNextTotalCaractersTotalBust) &&
                                    tagRenderedLength === -1
                                ) {
                                    maxTags = index;
                                    restOfTags = totalTags - index - 1;
                                    tagRenderedLength = index;
                                }
                                return Tag;
                            })}
                        {totalTags > maxTags && (
                            <li
                                key={"tagListRest"}
                                title={`+${restOfTags}`}
                                className={`rounded bg-general-tag last-tag ${styles["last-tag"]}`}
                            >
                                <span title={`+${restOfTags}`}>&hellip;</span>
                            </li>
                        )}
                    </ul>
                )}
                {/* Overwrite buttom line content */}
                {BottomLineContent && <BottomLineContent />}
            </section>
        </>
    );

    return (
        <Tag className={`${className} rounded ${styles["simple-abstract"]}`}>
            <Link href={model.singleLink} title={model.title}>
                {/* SECTION 1/2 : HeaderDefault */}
                <header className={`${styles["simple-abstract__header"]}`}>
                    {/* Override the display of the normal visual if there is the overRidingHeader is defined */}
                    {Header ? Header : HeaderDefault}
                </header>
                {/* SECTION 2/2 : Main content */}
                <section className={`${styles["simple-abstract__content"]}`}>
                    {Content ? Content : ContentDefault}
                </section>
            </Link>
        </Tag>
    );
};

export default EntitySimple;
