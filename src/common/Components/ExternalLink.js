import {forceHttps} from "@/src/helpers/url";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

const ExternalLink = (props) => {

    return (
        <a className={`external-link ${props.className ?? ''}`} href={forceHttps(props.href)} target={"_blank"} title={`${props.title}`}>
            {props.children} <Icon iconName={"external-link-alt"} />
        </a>
    )
}

export {ExternalLink};