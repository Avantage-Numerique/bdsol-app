import {getType} from "@/DataTypes/Entity/Types";

import React from "react";
import styles from "./EntityTag.module.scss";
import Icon from "@/common/widgets/Icon/Icon";
import {getEntityURI} from "@/src/utils/EntityURI";
import Link from "next/link";

/**
 *
 * @param props
 * @param props.className {string} The figure class Name.
 * @param props.imgClassName {string} Image tag className to pass.
 * @param props.model {Media} Image tag className to pass.
 * @param props.addGradientOver {boolean} To show a gradient over.
 * @return {JSX.Element}
 * @constructor
 */
const EntityTag = (props) => {

    let {
        className,
        imgClassName,
        model,
        children,
        baseSrc,
        addButton,
        addType
    } = props;

    const type = getType(model.type);
    addButton = addButton ?? true;
    addType = addType ?? false;

    // defaults
    className = className ?? "";

    //get height and width dynamicaly ?
    return (
        <>
            {model &&
                <article className={`rounded position-relative d-flex justify-content-between align-content-stretch flex-wrap ${styles["entity-tag"]}`}>
                    <div className={"d-flex w-100"}>
                        {model.mainImage.url &&
                            <figure className="m-0 w-25">
                                <img className={imgClassName}
                                    src={process.env.NEXT_PUBLIC_API_URL + model.mainImage.url}
                                    alt={model.mainImage.alt && model.mainImage.alt}
                                />
                            </figure>
                        }
                        <div className={`d-flex flex-column w-75 ms-2 px-1 py-3 ${styles["entity-tag__texts"]}`}>
                            {addType &&
                                <p className="m-0 fs-6">
                                    {type.label}
                                </p>}
                            {model.title &&
                                <p className="m-0 fs-6">
                                    <Icon iconName={type.icon} className="px-2" /> {model.title}
                                </p>}
                        </div>
                    </div>
                    {children &&
                        <div className={"w-100"}>
                            {children}
                        </div>
                    }
                    {addButton &&
                    <Link href={getEntityURI(model.type, model.slug)} title={model.name}>
                        <a href={getEntityURI(model.type, model.slug)} className={"full-link"}>
                        </a>
                    </Link>
                    }
                </article>
            }
        </>
    )
}

export default EntityTag;