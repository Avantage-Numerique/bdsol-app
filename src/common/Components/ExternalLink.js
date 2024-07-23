import {forceHttps} from "@/src/helpers/url";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

const ExternalLink = (props) => {

    if (props.href !== '') {
        const link = props.href.includes("mailto:") ? props.href : forceHttps(props.href);
        return (
            <div class={"display-inline-block"}>
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