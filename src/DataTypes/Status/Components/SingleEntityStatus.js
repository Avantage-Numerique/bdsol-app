import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {lang} from "@/common/Data/GlobalConstants";
import DateWidget from "@/common/widgets/DateWidget/DateWidget";

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
        <SingleInfo className={className} title={lang.modificationHistory}>
            <ul className={"list-style-none"}>
                {
                    (status?.requestedBy?.username || createdAt) &&
                    <li>
                        <span>Créer</span>
                        {
                            status?.requestedBy?.username &&
                            <span>
                                &nbsp;par&nbsp;:&nbsp;
                                {status.requestedBy.username}
                            </span>
                        }
                        { createdAt &&
                            <span>
                                &nbsp;le&nbsp;<DateWidget stringDate={createdAt} noTag={true} />
                            </span>
                        }
                    </li>
                }
                {
                    (status?.lastModifiedBy?.username || updatedAt) &&
                    <li>
                        <span>Dernière modifications</span>
                        {
                            status?.lastModifiedBy?.username &&
                            <span>
                                &nbsp;par&nbsp;:&nbsp;{status.lastModifiedBy.username}
                            </span>
                        }
                        { createdAt !== updatedAt &&
                            <span>
                                &nbsp;le&nbsp;<DateWidget stringDate={updatedAt} noTag={true} />
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