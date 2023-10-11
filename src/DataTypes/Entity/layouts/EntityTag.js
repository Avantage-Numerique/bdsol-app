import {getType} from "@/DataTypes/Entity/Types";

import React from "react";
import styles from "./EntityTag.module.scss";
import Icon from "@/common/widgets/Icon/Icon";
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
        addType,
        badge
    } = props;

    const type = getType(model.type);
    addButton = addButton ?? true;
    addType = addType ?? false;

    // defaults
    className = className ?? "";

    badge = badge ?? "";

    //get height and width dynamicaly ?
    return (
        <>
            {model &&
                <article className={`rounded position-relative d-flex justify-content-between align-content-stretch flex-wrap ${styles["entity-tag"]} ${className}`}>
                    <div className={"d-flex w-100"}>
                        {model.mainImageModel &&
                            <figure className="m-0">
                                <img className={imgClassName}
                                    src={model.mainImageModel.src && model.mainImageModel.src}
                                    alt={model.mainImageModel.alt && model.mainImageModel.alt}
                                />
                            </figure>
                        }
                        <div className={`d-flex flex-column justify-content-center w-75 ms-2 px-1 ${styles["entity-tag__texts"]}`}>
                            {addType &&
                                <p className="m-0">
                                    {type.label}
                                </p>}
                            {model.title &&
                                <p className="m-0 p-2">
                                    <Icon iconName={type.icon} className="px-2" /> {model.title}
                                </p>}
                        </div>
                    </div>
                    {children &&
                        <div className={"w-100"}>
                            {children}
                        </div>
                    }
                    { model?.badge &&
                        <span className={"badge bg-secondary position-absolute top-0 start-50 translate-middle"} dangerouslySetInnerHTML={{__html:model?.badge}}></span>
                    }
                    {addButton &&
                        <Link href={model.singleLink} title={model.name} className={"full-link"} />
                    }
                </article>
            }
        </>
    )
}

export default EntityTag;