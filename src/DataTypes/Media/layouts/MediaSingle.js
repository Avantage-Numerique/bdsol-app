import React, {useCallback} from "react";
import LicenceDisplay from '@/src/common/FormElements/SelectLicence/LicenceDisplay';

//components
import Single from "@/DataTypes/common/layouts/single/Single";
import {SingleEntityStatus} from "@/DataTypes/Status/components/SingleEntityStatus";
import {getEntityURI} from "@/src/utils/EntityURI";

//hooks
//import { useModal } from '@/src/hooks/useModal/useModal';
//Utils
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";

//Styling
import styles from './MediaSingle.module.scss';
import AppRoutes from "@/src/Routing/AppRoutes";
import Icon from "@/src/common/widgets/Icon/Icon";


const SingleInfoLayout = ({ title, NAMessage="-", children }) => {
    const haveChildren = children && children !== "";
    return (
        <section className={`my-2 ${styles["singleInfoLayout"]}`}>
            <h4>{title}</h4>
            <div className={`px-3 ${styles["singleInfoLayout__main"]}`}>
                {haveChildren && children}
                {!haveChildren && NAMessage && (<>{NAMessage}</>)}
            </div>
        </section>
    )
}

const MediaSingle = ({ data, route }) => {

    //const { Modal, closeModal } = useModal();
    const aside = (
        <>
            <SingleInfoLayout
                title={"Métadonnées"}
                NAMessage={<p>Information non disponible</p>}
            >
                <p>Type de fichier: {data.fileType} ({data.extension})</p>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Associé à l'entité"}>
                <a className="d-flex fs-3" href={getEntityURI(data.entityId.type, data.entityId.slug)} title={data.entityId.name}>
                    <Icon iconName="reply" className="px-2"></Icon>
                    <SanitizedInnerHtml tag={"span"}>
                        {data.entityId.name}
                    </SanitizedInnerHtml>
                </a>
            </SingleInfoLayout>

        </>
    )

    const headerMainContent = (
        <div className={`${styles["quick-section"]}`}>
            <h1>{data.title}</h1>
            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Nom de fichier : </span>{data.fileName}
            </div>
            <div className={`${styles["quick-section__single-info"]}`}>
                <span>Licence : </span>
                <LicenceDisplay licenceKey={data.licence ?? {} }/>
            </div>
        </div>
    )

    const singleInfoCommonClass = "border-bottom py-4";

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
            "slug": () => data?.title ?? "title must be set",
            "person.slug": () => data.entityId?.name ?? "Personne",
            "organisation.slug": () => data.entityId?.name ?? "Organisation",
            "project.slug": data?.entityID?.slug ?? "Projet",
            "persons": () => "Personnes",
            "organisations": () => "Organisations",
            "projects":() => "Projets"
        }[param];
    }, []);

    const mediaRoute = route ?? AppRoutes[`${data.entityType.toLowerCase()}SingleMedia`];//AppRoutes.personneSingleMedia;//

    return (
        <Single
            className={`single ${styles["single-media"]}`}
            aside={aside}
            headerMainContent={headerMainContent}
            entity={data}
            showCTA={false}
            showMainImageInHeader={false}
            showUpdateMenu={false}
            mainImageClass={"header-content__media-preview"}
            title={`${data.title}`}
            route={mediaRoute}
            breadcrumbParams={{
                labelGenerator: getLabelGenerator,
                hrefGenerator: getHrefGenerator
            }}
        >
            <div className={`single-media-main-image`}>
                <figure className={`position-relative d-flex justify-content-center ${styles["single-media-container"]}`}>
                    <div className={`position-absolute top-0 start-0 w-100 h-100 ${styles["single-media-container__behind-img"]}`}>
                        <img className={`position-absolute top-0 start-0 w-100 h-100 `} src={data.url} alt={data.alt} />
                    </div>
                    <img className={`img-fluid ${styles["single-media-img"]}`} src={data.url} alt={data.alt} />
                </figure>
            </div>

            <SingleInfoLayout
                title={"Texte alternatif"}>
                <SanitizedInnerHtml tag={"span"}>{data.alt}</SanitizedInnerHtml>
            </SingleInfoLayout>

            <SingleInfoLayout
                title={"Description"}>
                <SanitizedInnerHtml tag={"span"}>{data.description}</SanitizedInnerHtml>
            </SingleInfoLayout>
            {
                (data.createdAt || data.updatedAt || data.status) &&
                <SingleEntityStatus className={singleInfoCommonClass} createdAt={data.createdAt} updatedAt={data.updatedAt} status={data.status} />
            }

        </Single>
    )
}


export default MediaSingle
