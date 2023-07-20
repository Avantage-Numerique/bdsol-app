//React
import { useCallback } from "react";

//Utils
import {getModelFromType, getType} from "@/DataTypes/Entity/Types";
import {lang} from "@/common/Data/GlobalConstants";

//style
import styles from './MediaSingleView.module.scss';

//Component
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import EntityTag from "@/src/DataTypes/Entity/layouts/EntityTag";
import LicenceDisplay from "@/src/common/FormElements/SelectLicence/LicenceDisplay";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import { SingleEntityStatus } from "@/src/DataTypes/Status/components/SingleEntityStatus";


const SingleInfoLayout = ({ title, NAMessage="-", children }) => {
    const haveChildren = children && children !== "";
    return (
        <section className={`my-2`}>
            <h4>{title}</h4>
            <div>
                {haveChildren && children}
                {!haveChildren && NAMessage && (<>{NAMessage}</>)}
            </div>
        </section>
    )
}

const MediaSingleView = (data, ...props) => {
    const {
        _id,
        title,
        alt,
        description,
        fileName,
        fileType,
        licence,
        url,
        extension,
        createdAt,
        updatedAt,
        status
    } = data.data;

    const associatedEntityType = getType(data.data.entityId.type,true);
    const associatedEntityModel = getModelFromType(data.data.entityId.type, data.data.entityId);

    /* Needed for breadCrumb generator */
    const getHrefGenerator = useCallback(() => {
        return {
            "[slug]": data?.slug ?? "no-set",
            "[person.slug]": data?.entityId?.slug ?? "no-set",
            "[organisation.slug]": data?.entityId?.slug ?? "no-set",
            "[project.slug]": data?.entityID?.slug ?? "no-set",
            "persons": "persons",
            "organisations": "organisations",
            "projects":"projects"
        };
    }, []);

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "id": () => data?.title ?? "title must be set",
            "slug": () => data?.title ?? "title must be set",
            "person.slug": () => data.entityId?.name ?? "Personne",
            "organisation.slug": () => data.entityId?.name ?? "Organisation",
            "project.slug": data?.entityID?.slug ?? "Projet",
            "persons": () => "Personnes",
            "organisations": () => "Organisations",
            "projects":() => "Projets"
        }[param];
    }, []);

    const breadCrumb = {
        route: associatedEntityModel.singleRoute,
        getLabelGenerator: getLabelGenerator
    }

    const header = (
        <SingleBaseHeader
            className={"mode-public"}
            title={(<h2 className="text-white">{`${title}`}</h2>)}
            subtitle={(
                <div className="d-text text-white">
                    <div>
                        <span className={`${styles["quick-section__single-info"]}`}>{lang.filename}{lang.colon}</span>{fileName}
                    </div>
                    <div>
                        <strong>{lang.licence}{lang.colon}</strong>
                        <LicenceDisplay licenceKey={licence ?? {} }/>
                    </div>
                </div>
            )}
            //mainImage={}
            entity={data.data}
        />
    );
    const fullWidthContent = (<></>);
    const contentColumnLeft = (
        <div className={`single-media-main-image`}>
            <figure className={`position-relative d-flex justify-content-center ${styles["single-media-container"]}`}>
                <div className={`position-absolute top-0 start-0 w-100 h-100 ${styles["single-media-container__behind-img"]}`}>
                    <img className={`position-absolute top-0 start-0 w-100 h-100`} src={url} alt={alt} />
                </div>
                <img className={`img-fluid ${styles["single-media-img"]}`} src={url} alt={alt} />
            </figure>
        </div>
    );

    const contentColumnRight = (
        <>
            <SingleInfoLayout
                title={lang.capitalize("metadatas")}
                NAMessage={<p>{lang.infoNotAvailable}</p>}
            >
                <p>{lang.filetype}{lang.colon}{fileType} ({extension})</p>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={lang.associatedTo + associatedEntityType.inSentencePrefix + associatedEntityType.label}>
                <EntityTag model={associatedEntityModel} />
            </SingleInfoLayout>
        </>
    );

    const footer = (
        <>
            <SingleInfoLayout
                title={lang.altText}>
                <SanitizedInnerHtml tag={"span"}>{alt}</SanitizedInnerHtml>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={lang.description}>
                <SanitizedInnerHtml tag={"span"}>{description}</SanitizedInnerHtml>
            </SingleInfoLayout>
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus className="border-bottom py-4" createdAt={createdAt} updatedAt={updatedAt} status={status} />
            }
        </>
    );

    return (
        <SingleBase 
            breadCrumb={breadCrumb}
            header={header}
            fullWidthContent={fullWidthContent}
            contentColumnLeft={contentColumnLeft}
            contentColumnRight={contentColumnRight}
            footer={footer}
        />
    )

}

export default MediaSingleView;