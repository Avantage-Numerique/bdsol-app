import { forceHttps } from "@/src/helpers/url";
import React from "react";
import Icon from "@/common/widgets/Icon/Icon";

/**
 * @typedef ExternalLinkProps
 *
 * @property {string} href target external URL
 * @property {string} title link's title
 * @property {string} className additional class to the link
 * @property {JSX.Element} children fill the link with the children.
 * @property {bool} avnuApproved link content approved by the team
 * @property {bool} noreferrer add noreferrer attribute
 */

/**
 * Add a link to an external URL
 *
 * @type {(props: ExternalLinkProps) => Element}
 *
 * @constructor
 */
const ExternalLink = (props) => {
    if (props.href !== "") {
        const link = props.href.includes("mailto:") ? props.href : forceHttps(props.href);

        const relStr = ["external"];
        if (!props.avnuApproved) {
            relStr.push("nofollow");
        }
        if (props.noreferrer) {
            relStr.push("noreferrer");
        }

        return (
            <>
                <a
                    className={`external-link ${props.className ?? ""}`}
                    href={link}
                    target={"_blank"}
                    title={`${props.title ?? ""}`}
                    rel={relStr.join(" ")}
                >
                    {props.children && props.children}
                    <Icon iconName={"external-link-alt"} className={"text-decoration-none ps-1"} />
                </a>
            </>
        );
    }
    return <></>;
};

export { ExternalLink };
