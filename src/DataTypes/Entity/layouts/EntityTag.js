import {getType} from "@/DataTypes/Entity/Types";

import React from "react";
import styles from "./EntityTag.module.scss";

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
    } = props;

    // defaults
    className = className ?? "";

    //get height and width dynamicaly ?
    return (
        <>
            {model &&
                <article className={`rounded d-flex ${styles["entity-tag"]}`}>
                    {model.mainImage.url &&
                        <figure className="m-0">
                            <img className={imgClassName}
                                src={process.env.NEXT_PUBLIC_API_URL + model.mainImage.url}
                                alt={model.mainImage.alt && model.mainImage.alt}
                            />
                        </figure>
                    }

                    <div className={`d-flex flex-column ms-2 py-1 ${styles["entity-tag__texts"]}`}>
                        {model.fullName && <p className="m-0 fs-6">{model.fullName}</p>}
                        {model.name && <p className="m-0 fs-6">{model.name}</p>}
                        {model.type &&
                            <p className="m-0 fs-6">{getType(model.type, true).label}</p>
                        }
                    </div>
                    {children &&
                        <div>
                            {children}
                        </div>
                    }
                </article>
            }
        </>
    )
}

export default EntityTag;