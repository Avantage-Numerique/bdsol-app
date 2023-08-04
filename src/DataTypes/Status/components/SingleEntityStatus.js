import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {lang} from "@/common/Data/GlobalConstants";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";
import React from "react";

/**
 *
 * @param props.createdAt {string} Date in a string format
 * @param props.updatedAt {string} Date in a string format
 * @param props.status {object} The status object with username and status of the modification.
 * @param props.status {className} additional class to add as is in the element className property.
 * @param props.children {any} The children, if this has children from its parent.
 * @return {JSX.Element}
 * @constructor
 */
export const SingleEntityStatus = (props) => {

    const {
        createdAt,
        updatedAt,
        status,
        className,
        children
    } = props;
    return (
        <SingleInfo className={`border-top pt-3 ${className}`} title={lang.entityMetadata}>
            <ul className={"list-style-none"}>
                {
                    status?.state &&
                    <li>
                        <span>{lang.entityStatus}{lang.colon}</span>
                        <span>{lang.capitalize(status.state) ?? ""}</span>
                    </li>
                }
                {
                    (status?.requestedBy?.username || createdAt) &&
                    <li>
                        <span>{lang.created}</span>
                        {
                            status?.requestedBy?.username &&
                            <span>
                                &nbsp;{lang.by}&nbsp;:&nbsp;
                                {status.requestedBy.username}
                            </span>
                        }
                        { createdAt &&
                            <span>
                                &nbsp;{lang.on}&nbsp;<DateWidget stringDate={createdAt} noTag={true} />
                            </span>
                        }
                    </li>
                }
                {
                    (status?.lastModifiedBy?.username || updatedAt) &&
                    <li>
                        <span>{lang.lastModification}</span>
                        {
                            status?.lastModifiedBy?.username &&
                            <span>
                                &nbsp;{lang.by}&nbsp;:&nbsp;{status.lastModifiedBy.username}
                            </span>
                        }
                        { createdAt !== updatedAt &&
                            <span>
                                &nbsp;{lang.on}&nbsp;<DateWidget stringDate={updatedAt} noTag={true} />
                            </span>
                        }
                    </li>
                }
            </ul>
            {
                children &&
                <div>
                    {children}
                </div>
            }
        </SingleInfo>
    )
}