import React, {useCallback} from 'react';

//components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SearchTag from '@/src/common/Components/SearchTag';
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SocialHandleDisplay from '@/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay'

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Equipment from '../../../models/Equipment';


const EquipmentSingleView = ({ data }) => {

    const model = new Equipment(data);
    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "equipment": lang.Equipment,
            "slug": model.title        
        }[param];
    }, []);

    console.log("data", data)

    /****************************
     *  Sections
     ***************************/
    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }
    const title = (
        <>
            <SanitizedInnerHtml tag={"h5"} className="text-white">{`${model.equipmentType.name}`}</SanitizedInnerHtml>
            <SanitizedInnerHtml tag={"h3"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>
        </>)
    const subtitle = (<></>)
    const Header = (
        <SingleBaseHeader
            title={title}
            subtitle={subtitle}
            mainImage={model.mainImage}
            entity={model}
            buttonText="Proposer des modifications"
            buttonLink={model.singleEditLink}
        />
    )

    const FullWidthContent = (
        <>
        </>
    )

    const ContentColumnLeft = (
        <>
            {
                model.brand &&
                <SingleInfo title={lang.brand}>{model.brand}</SingleInfo>
            }
            {
                model.modelName &&
                <SingleInfo title={lang.modelName}>{model.modelName}</SingleInfo>
            }
            
            <SocialHandleDisplay 
                title={lang.url} 
                url={model?.url} 
            />
        </>
    )

    const ContentColumnRight = (
        <>
        </>
    )

    const Footer = (
        <>
            {
                (model.createdAt || model.updatedAt || model.meta) &&
                <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
            }
        </>
    )

    {/**************************
    *   Elements returned as props of the SingleBase
    */}
    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={Header}              
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
                model={model}
            />
        </>
    )
}

export default EquipmentSingleView