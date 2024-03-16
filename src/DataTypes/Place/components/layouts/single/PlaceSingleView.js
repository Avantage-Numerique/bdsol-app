import {useCallback} from "react";

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {getTitle} from "@/src/DataTypes/MetaData/MetaTitle";

//Component
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import Place from "../../../models/Place";
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import Head from "next/head";
import SingleBaseProgressBar from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'
import {removeTagsFromString} from '@/src/helpers/html'


//Styling
import styles from "./PlaceSingleView.module.scss"

const PlaceSingleView = ({ data }) => {

    const model = new Place(data)

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "lieux": lang.Places,
            "slug": model.breadcrumbTitle
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }
    const header = (
        <SingleBaseHeader 
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text mt-4">
                    {model.address &&
                        <i><p className="text-white fs-4 mb-0">{model.address}{(model.address && model.city) && <span>,</span>}</p></i>
                    }
                    {model.city &&
                        <i><p className="text-white fs-4">{model.city}</p></i>
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
                        {model.address ? model.address : " - "}
                    </div>
                </li>

                {/* city x2 (in subtitle) */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.city} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.city ? model.city : " - "}
                    </div>
                </li>

                {/* postalCode */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.postalCode} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.postalCode ? model.postalCode : " - "}
                    </div>
                </li>

                {/* province */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.province} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.province ? model.province : " - "}
                    </div>
                </li>
            
                {/* country */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.country} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.country ? model.country : " - "}
                    </div>
                </li>

            </ul>
        </SingleInfo>
    )
    const contentColumnRight = (    
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
                        {model.mrc ? model.mrc : " - "}
                    </div>
                </li>

                {/* region */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.region} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.region ? model.region : " - "}
                    </div>
                </li>

                {/* longitude */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.longitude} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.longitude ? model.longitude : " - "}
                    </div>
                </li>

                {/* latitude */}
                <li className={`${styles["coordinate"]}`}>
                    <div className={`${styles["coordinate__title"]}`}>
                        {lang.latitude} :
                    </div>
                    <div className={`${styles["coordinate__data"]}`}>
                        {model.latitude ? model.latitude : " - "}
                    </div>
                </li>
            </ul>
        </SingleInfo>
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
                {data: model.address},
                {data: model.city},
                {data: model.description, validationFunction: (value => removeTagsFromString(value) ? true : false)},
                {data: model.postalCode},
                {data: model.province},
                {data: model.country},
                {data: model.mrc},
                {data: model.region},
                {data: model.longitude},
                {data: model.latitude},
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