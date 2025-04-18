import {useEffect, useState} from "react";

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";

//Component
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import Place from "../../../models/Place";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import SingleBaseProgressBar
    from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'
import {removeTagsFromString} from '@/src/helpers/html'
import MapWrapper from "@/src/map/MapWrapper";


//Styling
import styles from "./PlaceSingleView.module.scss"

const PlaceSingleView = ({ data }) => {

    const model = new Place(data)

    const breadcrumbLabels = {
        "lieux": lang.Places,
        "slug": model.breadcrumbTitle
    };

    const [breadCrumb, setBreadCrumb] = useState({
        route: model.singleRoute,
        labels: breadcrumbLabels,
    });

    useEffect(() => {
        setBreadCrumb({
            route: model.singleRoute,
            labels: breadcrumbLabels,
        });
    }, [model.title]);


    const header = (
        <SingleBaseHeader 
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text mt-4">
                    {model?.location?.address &&
                        <i><p className="text-white fs-4 mb-0">{model?.location?.address}{(model?.location?.address && model?.location?.city) && <span>,</span>}</p></i>
                    }
                    {model?.location?.city &&
                        <i><p className="text-white fs-4">{model?.location?.city}</p></i>
                    }
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText="Proposer des modifications"
            buttonLink={model.singleEditLink}
        />
    )

    const FullWidthContent = (
        <>
            <SingleInfo 
                title={lang.about} 
                NAMessage="Aucune description n'est disponible pour le moment."
            >
                {
                    <SanitizedInnerHtml>
                        {model.description}
                    </SanitizedInnerHtml>
                }
            </SingleInfo>
        </>
    );

    const contentColumnLeft = (
        <>
            <SingleInfo
                title="Coordonnées"
                cardLayout
            >
                <ul className={`${styles["main-coordinate-list"]}`}>
                    {/* address x2 (in subtitle) */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.address} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.address ? model.location.address : " - "}
                        </div>
                    </li>

                    {/* city x2 (in subtitle) */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.city} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.city ? model.location.city : " - "}
                        </div>
                    </li>

                    {/* postalCode */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.postalCode} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.postalCode ? model.location.postalCode : " - "}
                        </div>
                    </li>

                    {/* province */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.province} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.province ? model.location.province : " - "}
                        </div>
                    </li>
                
                    {/* country */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.country} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.country ? model.location.country : " - "}
                        </div>
                    </li>

                </ul>
            </SingleInfo>
            <SingleInfo
                title="Informations supplémentaires"
                cardLayout
            >
                <ul className={`${styles["main-coordinate-list"]}`}>
                    {/* mrc */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.mrc} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.mrc ? model.location.mrc : " - "}
                        </div>
                    </li>

                    {/* region */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.region} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.region ? model.location.region : " - "}
                        </div>
                    </li>

                    {/* longitude */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.longitude} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.longitude ? model.location.longitude : " - "}
                        </div>
                    </li>

                    {/* latitude */}
                    <li className={`${styles["coordinate"]}`}>
                        <div className={`${styles["coordinate__title"]}`}>
                            {lang.latitude} :
                        </div>
                        <div className={`${styles["coordinate__data"]}`}>
                            {model?.location?.latitude ? model.location.latitude : " - "}
                        </div>
                    </li>
                </ul>
            </SingleInfo>
        </>
    )
    const contentColumnRight = (
        <div>
            <MapWrapper height={"450px"} locationList={[model]} centerAt={[model.location.latitude, model.location.longitude]}/>
        </div>
    )


    {/*********** Footer section ***********/}
    const Footer = (
        <>
            {
                (model.createdAt || model.updatedAt || model.meta) &&
                <SingleInfo 
                    title={lang.entityMetadata} 
                    className="border-top pt-3"
                >
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
                </SingleInfo>
            }
        </>
    )

    {/*********** Bottom section ***********/}
    const SinglePageBottom = (
        <SingleBaseProgressBar 
            dataList={[
                {data: model.title},
                {data: model?.location?.address},
                {data: model?.location?.city},
                {data: model.description, validationFunction: (value => removeTagsFromString(value) ? true : false)},
                {data: model?.location?.postalCode},
                {data: model?.location?.province},
                {data: model?.location?.country},
                {data: model?.location?.mrc},
                {data: model?.location?.region},
                {data: model?.location?.longitude},
                {data: model?.location?.latitude},
                {data: model.mainImage.isDefault, validationFunction: ((value) => !value)}, 
            ]}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    )

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
            />
        </>
    )
}
export default PlaceSingleView;