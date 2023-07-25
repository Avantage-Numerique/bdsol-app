//React
import React, {useCallback} from "react";

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
import {SingleEntityStatus} from "@/src/DataTypes/Status/components/SingleEntityStatus";
import nextConfig from "@/next.config";
import Head from "next/head";


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
        status
    } = data;

    const baseSrc = `${process.env.NEXT_PUBLIC_API_URL}`;

    const associatedEntityType = getType(data.entityId.type, true);
    const associatedEntityModel = getModelFromType(data.entityId.type, data.entityId);
    /* Needed for breadCrumb generator */
    const getHrefGenerator = useCallback(() => {
        return {
            "[slug]": data?.slug ?? "no-set",
            "[person.slug]": associatedEntityModel.slug ?? "no-set",
            "[organisation.slug]": associatedEntityModel.slug ?? "no-set",
            "[project.slug]": associatedEntityModel.slug ?? "no-set",
            "persons": "persons",
            "organisations": "organisations",
            "projects": "projects",
            "medias": "medias"
        };
    }, []);

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "id": () => data?.title ?? "title must be set",
            "slug": () => data?.title ?? "title must be set",
            "person.slug": () => associatedEntityModel.title ?? "Personne",
            "organisation.slug": () => associatedEntityModel.title ?? "Organisation",
            "project.slug": associatedEntityModel.title ?? "Projet",
            "persons": () => "Personnes",
            "organisations": () => "Organisations",
            "projets": () => "Projets",
            "medias": () => "Média"
        }[param];
    }, []);

    const breadCrumb = {
        route: associatedEntityModel.singleMediaRoute,
        getLabelGenerator: getLabelGenerator,
        getHrefGenerator: getHrefGenerator
    }

    const header = (
        <SingleBaseHeader
            className={"mode-public"}
            title={(<h2 className="text-white">{`${title}`}</h2>)}
            subtitle={(
                <div className="d-text text-white">
                    <div>
                        <span className={`${styles["quick-section__single-info"]}`}>{lang.filename}{lang.colon}</span>{fileName + '.' + extension}
                    </div>
                    <div>
                        <strong>{lang.licence}{lang.colon}</strong>
                        <LicenceDisplay licenceKey={licence ?? {} }/>
                    </div>
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
        <>
            <Head>
                <title>{lang.mainImage} {lang.associatedTo} {associatedEntityModel.title}{associatedEntityModel.meta.seperator}{associatedEntityModel.Type.label}{associatedEntityModel.meta.seperator}{nextConfig.app.name}</title>
            </Head>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
            />
        </>
    )
}

export default MediaSingleView;