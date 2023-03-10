import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {lang} from "@/common/Data/GlobalConstants";


export const SingleEntityStatus = (props) => {

    const {
        createdAt,
        updatedAt,
        status,
        className,
        children
    } = props;


    const date_createdAt = new Date(createdAt);
    const date_updatedAt = new Date(updatedAt);

    return (
        <SingleInfo className={className} title={lang.modificationHistory}>
            <ul className={"list-style-none"}>
                {
                    date_createdAt &&
                    <li><span>Date de création : </span> {date_createdAt.toLocaleDateString("fr-CA")}</li>
                }
                {
                    date_createdAt !== date_updatedAt &&
                    <li><span>Dernière modification : </span> {date_updatedAt.toLocaleDateString("fr-CA")}</li>
                }
                {
                    status?.requestedBy?.username &&
                    <li><span>Créer par : </span> {status.requestedBy.username}</li>
                }
                {
                    status?.lastModifiedBy?.username &&
                    <li><span>Dernière modifications par : </span> {status.lastModifiedBy.username}</li>
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