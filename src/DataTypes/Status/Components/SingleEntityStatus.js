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
                    status?.requestedBy?.username && createdAt &&
                    <li><span>Créer par : </span> <span>{status.requestedBy.username}</span> le <DateWidget stringDate={createdAt} /></li>
                }
                {
                    status?.lastModifiedBy?.username && createdAt !== updatedAt &&
                    <li><span>Dernière modifications par : </span> <span>{status.lastModifiedBy.username}</span> le <DateWidget stringDate={updatedAt} /></li>
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