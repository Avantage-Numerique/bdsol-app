import {getType} from "@/DataTypes/Entity/Types";

import React from "react";
import styles from "./EntityTag.module.scss";
import Link from "next/link";
import TypeTag from '@/DataTypes/common/layouts/TypeTag/TypeTag'


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
                <article className={`rounded-2 position-relative d-flex ${styles["entity-tag"]} ${className}`}>
                        {/* Image section -- left */}
                        {model.mainImageModel &&
                            <figure className="m-0">
                                <img className={`imgClassName ${model.mainImageModel.isDefault && (styles["default-img"] + " p-3 shadow")}`}
                                    src={model.mainImageModel.src && model.mainImageModel.src}
                                    alt={model.mainImageModel.alt && model.mainImageModel.alt}
                                />
                            </figure>
                        }
                        {/* Content section -- right */}
                        <div className="flex-grow-1 d-flex py-3">
                            <div className={`d-flex flex-column flex-grow-1 justify-content-center w-75 ms-2 px-1 ${styles["entity-tag__texts"]}`}>
                                
                                <TypeTag 
                                    type={type.label}
                                    icon={type.modelClass.icon}
                                />
                                {model.title &&
                                    <p className="m-0 p-2 lh-1 pb-0 fw-semibold">
                                        {model.title}
                                    </p>
                                }
                            </div>
                            {children &&
                                <div>
                                    {children}
                                </div>
                            }
                        </div>
                    
                    {/* Link to redirect towards the element */}
                    {true &&
                        <Link href={model.singleLink} title={model.name} className={"full-link"} />
                    }
                </article>
            }
        </>
    )
}

export default EntityTag;