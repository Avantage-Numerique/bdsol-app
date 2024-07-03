//React
import React, {useCallback, useEffect, useState} from "react";

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
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import Media from "@/DataTypes/Media/models/Media";
import {RouteLink} from "@/common/Components/RouteLink";


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

const MediaSingleView = ({data}, ...props) => {
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
        meta
    } = data;

    const baseSrc = `${process.env.NEXT_PUBLIC_API_URL}`;
    const model = new Media(data);

    const associatedEntityType = getType(data.entityId.type, true);
    const associatedEntityModel = getModelFromType(data.entityId.type, data.entityId);


    /* Needed for breadCrumb generator */
    const getHrefGenerator = useCallback(() => {
        return {
            "[slug]": data?.slug ?? "no-set",
            "[person.slug]": associatedEntityModel.slug ?? "no-set",
            "[organisation.slug]": associatedEntityModel.slug ?? "no-set",
            "[project.slug]": associatedEntityModel.slug ?? "no-set",
            "[event.slug]": associatedEntityModel.slug ?? "no-set",
            "[equipment.slug]": associatedEntityModel.slug ?? "no-set",
            "[place.slug]": associatedEntityModel.slug ?? "no-set",
            "persons": "persons",
            "organisations": "organisations",
            "projects": "projects",
            "events":"events",
            "medias": "medias",
            "lieux": "lieux"
        };
    }, []);

    /* Needed for breadCrumb generator */
    const breadcrumbLabels = {
        "id": data?.title && data?.title !== "" ? data?.title : "title must be set",
        "slug": data?.title && data?.title !== "" ? data?.title : "title must be set",
        "person.slug": associatedEntityModel.title ?? "Personne",
        "organisation.slug": associatedEntityModel.title ?? "Organisation",
        "project.slug": associatedEntityModel.title ?? "Projet",
        "event.slug": associatedEntityModel.title ?? "Événement",
        "equipment.slug": associatedEntityModel.title ?? "Équipement",
        "place.slug": associatedEntityModel.title ?? "Lieu",
        "personnes": "Personnes",
        "equipement": "Équipements",
        "organisations": "Organisations",
        "projets": "Projets",
        "evenements": "Événements",
        "lieux": "Lieux",
        "medias": "Média"
    };

    const breadcrumbsRoutes = {
        route: associatedEntityModel.singleMediaRoute,
        labels: breadcrumbLabels,
        getHrefGenerator: getHrefGenerator
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
    }, [title]);


    const header = (
        <SingleBaseHeader
            className={"mode-public"}
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text text-white">
                    <LicenceDisplay licenceKey={licence ?? {} }/>
                </div>
            )}
            entity={data}
        />
    );
    const fullWidthContent = (<></>);
    const contentColumnLeft = (
        <div className={`single-media-main-image`}>
            <figure className={`position-relative d-flex justify-content-center ${styles["single-media-container"]}`}>
                <div className={`position-absolute top-0 start-0 w-100 h-100 ${styles["single-media-container__behind-img"]}`}>
                    <img className={`position-absolute top-0 start-0 w-100 h-100`} src={`${baseSrc}${url}`} alt={alt} />
                </div>
                <img className={`img-fluid ${styles["single-media-img"]}`} src={`${baseSrc}${url}`} alt={alt} />
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
                title={lang.associatedTo.capitalize() + associatedEntityType.inSentencePrefix + associatedEntityType.label}>
                <EntityTag model={associatedEntityModel}/>
            </SingleInfoLayout>

            <SingleInfoLayout title={lang.licenceMediaMoreDetails}>
                <RouteLink routeName={"licences"} className="btn btn-sm btn-secondary px-4" />
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
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
            }
        </>
    );

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
                model={model}
            />
        </>
    )
}

export default MediaSingleView;