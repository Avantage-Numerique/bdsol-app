import {getModelFromType, getType} from "@/DataTypes/Entity/Types";

import React from "react";
import Icon from "@/common/widgets/Icon/Icon";
import Link from "next/link";

/**
 *
 * @param props
 * @param props.className {string} The figure class Name.
 * @param props.model {Media} Image tag className to pass.
 * @return {JSX.Element}
 * @constructor
 */
const EntityLink = (props) => {

    let {
        className,
        data
    } = props;

    // defaults
    className = className ?? "";
    const model = getModelFromType(data.type, data);
    const type = getType(model.type);

    //get height and width dynamicaly ?
    return (
        <>
            {model &&
                <Link href={model.singleLink} title={model.title}>
                    <a href={model.singleLink} className={`link ${className}`}>
                        <Icon iconName={type.icon} className="pe-1" /> {model.title}
                    </a>
                </Link>
            }
        </>
    )
}

export default EntityLink;