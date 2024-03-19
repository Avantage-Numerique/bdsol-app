import {forceHttps} from "@/src/helpers/url";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

const ExternalLink = (props) => {

    if (props.href !== '') {
        const link = props.href.includes("mailto:") ? props.href : forceHttps(props.href);
        return (
            <a className={`external-link ${props.className ?? ''}`} href={link} target={"_blank"} title={`${props.title ?? ""}`}>
                {props.children && props.children} <Icon iconName={"external-link-alt"} />
            </a>
        )
    }
    return (
        <></>
    )
}

export {ExternalLink};