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


const PlaceSingleView = ({ data }) => {

    const model = new Place(data)

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "lieux": lang.Places,
            "slug": model.title
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
                        <p className="text-white">
                            <span className={"badge bg-secondary"}>{model.address}</span>
                        </p>
                    }
                    {model.city &&
                        <p className="text-white">
                            <span className={"badge bg-secondary"}>{model.city}</span>
                        </p>
                    }
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText="Proposer des modifications"
            buttonLink={model.singleEditLink}
        />
    )
    const fullWidthContent = (
        <div>
            {/* description */}
            {
                model.description && model.description !== "" &&
                <SingleInfo title={lang.description}>
                    <SanitizedInnerHtml>{model.description}</SanitizedInnerHtml>
                </SingleInfo>
            }
        </div>
    )
    const contentColumnLeft = (
        <div>
            {/* address x2 (in subtitle) */}
                {
                    model.address &&
                    <div className="row">
                        <div className="col-2">
                            {lang.address}
                            

                        </div>
                        <div className="col-8">
                            {model.address}
                        </div>
                    </div>
                }
            {/* city x2 (in subtitle) */}
                {
                    model.city &&
                    <div className="row">
                        <div className="col-2">
                            {lang.city}
                        </div>
                        <div className="col-8">
                            {model.city}
                        </div>
                    </div>
                }
            {/* postalCode */}
                {
                    model.postalCode &&
                    <div className="row">
                        <div className="col-2">
                            {lang.postalCode}
                        </div>
                        <div className="col-8">
                            {model.postalCode}
                        </div>
                    </div>
                }
            {/* province */}
                {
                    model.province &&
                    <div className="row">
                        <div className="col-2">
                            {lang.province}
                        </div>
                        <div className="col-8">
                            {model.province}
                        </div>
                    </div>
                }            
            {/* country */}
                {
                    model.country &&
                    <div className="row">
                        <div className="col-2">
                            {lang.country}
                        </div>
                        <div className="col-8">
                            {model.country}
                        </div>
                    </div>
                }
        </div>
    )
    const contentColumnRight = (
        <div>
            {/* mrc */}
                {
                    model.mrc &&
                    <div className="row">
                        <div className="col-3">
                            {lang.mrc}
                        </div>
                        <div className="col-8">
                            {model.mrc}
                        </div>
                    </div>
                }
            {/* region */}
                {
                    model.region &&
                    <div className="row">
                        <div className="col-3">
                            {lang.region}
                        </div>
                        <div className="col-8">
                            {model.region}
                        </div>
                    </div>
                }
            {/* longitude */}
                {
                    model.longitude &&
                    <div className="row">
                        <div className="col-3">
                            {lang.longitude}
                        </div>
                        <div className="col-8">
                            {model.longitude}
                        </div>
                    </div>
                }
            {/* latitude */}
                {
                    model.latitude &&
                    <div className="row">
                        <div className="col-3">
                            {lang.latitude}
                        </div>
                        <div className="col-8">
                            {model.latitude}
                        </div>
                    </div>
                }
        </div>
    )
    const footer = (
        <div>
            {
                (model.createdAt || model.updatedAt || model.meta) &&
                <SingleEntityMeta
                    createdAt={model.createdAt}
                    updatedAt={model.updatedAt}
                    meta={model.meta} />
            }
        </div>
    )

    return (
        <>
            <Head>
                <title>{getTitle([model.title, model.Type.label])}</title>
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
export default PlaceSingleView;