import React, {useCallback} from 'react';

//components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SocialHandleDisplay from '@/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay'
import SingleBaseProgressBar from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {lang} from "@/common/Data/GlobalConstants";
import Equipment from '../../../models/Equipment';
import {appConfig} from "@/src/configs/AppConfig";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";


const EquipmentSingleView = ({ data }) => {

    const model = new Equipment(data);

    const sectionClassSpacing = appConfig.spacing.singleSectionSpacingClass;

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "equipment": lang.Equipment,
            "slug": model.title
        }[param];
    }, []);

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

    const ContentColumnLeft = (
        <>
            <SingleInfo
                cardLayout
                title={lang.productInformations}
            >
                
                <SingleInfo 
                    title={lang.brand}
                    isSubtitle
                >{model.brand && model.brand}
                </SingleInfo>
                
                <SingleInfo 
                    title={lang.modelName}
                    isSubtitle
                    >{model.modelName && model.modelName}
                </SingleInfo>
                
            </SingleInfo>

            <SingleInfo 
                title={`${lang.plural(lang.ownByOrganisation, lang.ownByOrganisations, model.organisations.length)}`} 
                cardLayout
                displayCondition={model.organisations.length > 0}
            >
                <EntitiesTagGrid feed={model.organisations}/>
            </SingleInfo>
            
            <SingleInfo 
                title={`${lang.plural(lang.usedInProject, lang.usedInProjects, model.projects.length)}`} 
                cardLayout
                displayCondition={model.projects.length > 0}
            >
                <EntitiesTagGrid feed={model.projects}/>
            </SingleInfo>
            
        </>
    )

    const ContentColumnRight = (
        <>
            <SingleInfo 
                title={lang.url}
                cardLayout
                displayCondition={model?.url.length > 0}
                NAMessage="Aucun hyperlien n'est disponible pour le moment."
            >
                <SocialHandleDisplay 
                    url={model?.url}
                />            
            </SingleInfo>     
        </>
    )

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
                {data: model.equipmentType.name},
                {data: model.title},
                {data: model.brand},
                {data: lang.modelName},
                {data: model?.url},
                {data: model.mainImage.isDefault, validationFunction: ((value) => !value)}, 
            ]}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    )

    {/**************************
    *   Elements returned as props of the SingleBase
    */}
    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={Header}              
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
            />
        </>
    )
}

export default EquipmentSingleView