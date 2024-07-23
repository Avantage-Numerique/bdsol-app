import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

/**
 * Add in page target for hash url into a title or into step to adjust of the header offset.
 * The target works only on a full reload. (https://github.com/vercel/next.js/issues/51346)
 * @param props
 * @param props.name {string} the hash name of the link
 * @param props.showIcon {boolean} do we show the share icon permanently for the element.
 * @param props.showTarget {boolean} on a full reload, if the hash is the active, it will show a circle left to it.
 * @return {Element}
 * @constructor
 */
const InPageLink = (props) => {
    if (props.name !== '') {
        const link = `#${props.name}`;
        const showIcon = props.showIcon ?? false;
        const showTarget = props.showTarget ?? true;
        return (
            <div className={"in-page-link-container"}>
                <a className={`in-page-link ${props.className ?? ''}`} href={link} name={`${props.name}`}>
                    {showIcon && <Icon iconName={"share"} className={"text-decoration-none ps-1"}/>}
                </a>
                {showTarget && <span iconName={"share"} className={"in-page-link-target"}>&nbsp;</span>}
            </div>
        )
    }
    return (
        <></>
    )
}

export {InPageLink};