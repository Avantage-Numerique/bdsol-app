import {lang} from "@/common/Data/GlobalConstants";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";
import React from "react";

/**
 *
 * @param props.createdAt {string} Date in a string format
 * @param props.updatedAt {string} Date in a string format
 * @param props.meta {object} The meta object with username and state of the modification.
 * @param props.className {className} additional class to add as is in the element className property.
 * @param props.children {any} The children, if this has children from its parent.
 * @return {JSX.Element}
 * @constructor
 */
export const SingleEntityMeta = (props) => {

    const {
        createdAt,
        updatedAt,
        meta,
        className,
        children
    } = props;
    return (
        <div>
            <ul className={"list-style-none"}>
                {
                    /*meta?.state &&
                    <li>
                        <span>{lang.entityMeta}{lang.colon}</span>
                        <span>{lang.capitalize(meta.state) ?? ""}</span>
                    </li>*/
                }
                {
                    (meta?.requestedBy?.name || createdAt) &&
                    <li>
                        <span>{lang.created}</span>
                        {
                            meta?.requestedBy?.name &&
                            <span>
                                &nbsp;{lang.by}&nbsp;:&nbsp;
                                {meta.requestedBy.name}
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
                    (meta?.lastModifiedBy?.name || updatedAt) &&
                    <li>
                        <span>{lang.lastModification}</span>
                        {
                            meta?.lastModifiedBy?.name &&
                            <span>
                                &nbsp;{lang.by}&nbsp;:&nbsp;{meta.lastModifiedBy.name}
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
        </div>
    )
}