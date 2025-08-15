import {forceHttps} from "@/src/helpers/url";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

/**
 * Add a link to an external URL
 * @param props
 * @param props.href {string} target external URL
 * @param props.title {string} link's title
 * @param props.className {string} additional class to the link
 * @param props.children {JSX.Element} fill the link with the children.
 * @returns {Element}
 * @constructor
 */
const ExternalLink = (props) => {

    if (props.href !== '') {
        const link = props.href.includes("mailto:") ? props.href : forceHttps(props.href);
        return (
            <div className={"d-inline-block"}>
                <a className={`external-link ${props.className ?? ''}`} href={link} target={"_blank"} title={`${props.title ?? ""}`}>
                    {props.children && props.children}
                </a>
                <Icon iconName={"external-link-alt"} className={"text-decoration-none ps-1"} />
            </div>
        )
    }
    return (
        <></>
    )
}

export {ExternalLink};