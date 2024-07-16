import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

const InPageLink = (props) => {
    if (props.name !== '') {
        const link = `#${props.name}`;
        const showIcon = props.showIcon ?? false;
        return (
            <a className={`in-page-link ${props.className ?? ''}`} href={link} name={`${props.name}`}>
                {showIcon && <Icon iconName={"share"} className={"text-decoration-none ps-1"} />}
            </a>
        )
    }
    return (
        <></>
    )
}

export {InPageLink};