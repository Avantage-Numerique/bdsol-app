import React, { useEffect, useState } from "react";

//components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SocialHandleDisplay from "@/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay";
import SingleBaseProgressBar from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar";
import SingleBaseCTA from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseCTA";
import { SupererogatorySection } from "@/src/common/Components/SupererogatorySection/SupererogatorySection";

//Utils
import SanitizedInnerHtml from "@/src/utils/SanitizedInnerHtml";
import { SingleEntityMeta } from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import { lang } from "@/common/Data/GlobalConstants";
import Equipment from "@/src/DataTypes/Equipment/models/Equipment";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import { removeTagsFromString } from "@/src/helpers/html";
import SameAsDisplay from "@/src/DataTypes/common/layouts/SameAsViews/SameAsDisplay";

const EquipmentSingleView = ({ data }) => {
    const model = new Equipment(data);

    /* Needed for breadCrumb generator */

    const breadcrumbLabels = {
        equipements: lang.Equipments,
        consulter: lang.consultTitle,
        slug: model.title,
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

    /****************************
     *  Sections
     ***************************/

    const title = (
        <>
            <SanitizedInnerHtml
                removeQlEditorClass
                tag={"h5"}
                className="text-white"
            >{`${model.equipmentType.name}`}</SanitizedInnerHtml>
            <SanitizedInnerHtml
                removeQlEditorClass
                tag={"h3"}
                className="text-white"
            >{`${model.title}`}</SanitizedInnerHtml>
        </>
    );
    const subtitle = <></>;
    const Header = (
        <SingleBaseHeader
            title={title}
            subtitle={subtitle}
            mainImage={model.mainImage}
            entity={model}
            ctaSection={<SingleBaseCTA model={model} />}
        />
    );

    const FullWidthContent = (
        <SingleInfo
            displayCondition={typeof model.description == "string" && model.description !== ""}
            title={lang.description}
            NAMessage="Aucune description n'est disponible pour le moment."
        >
            {removeTagsFromString(model.description) && <SanitizedInnerHtml>{model.description}</SanitizedInnerHtml>}
        </SingleInfo>
    );

    const ContentColumnLeft = (
        <>
            <SingleInfo
                displayCondition={model.brand || model.modelName}
                NAMessage="Aucun modèle ou marque n'est associé à ce produit."
                title={lang.productInformations}
            >
                <SingleInfo title={lang.brand} isSubtitle noCardLayout>
                    {model.brand && model.brand}
                </SingleInfo>

                <SingleInfo title={lang.modelName} isSubtitle noCardLayout>
                    {model.modelName && model.modelName}
                </SingleInfo>
            </SingleInfo>

            <SingleInfo
                title={`${lang.plural(lang.ownByOrganisation, lang.ownByOrganisations, model.organisations.length)}`}
                displayCondition={model.organisations.length > 0}
            >
                <EntitiesTagGrid feed={model.organisations} />
            </SingleInfo>

            <SingleInfo
                title={`${lang.plural(lang.usedInProject, lang.usedInProjects, model.projects.length)}`}
                displayCondition={model.projects.length > 0}
            >
                <EntitiesTagGrid feed={model.projects} />
            </SingleInfo>
        </>
    );

    const ContentColumnRight = (
        <>
            <SocialHandleDisplay
                title={lang.externalLinks}
                url={model?.url}
                //className={`${appConfig.spacing.singleSectionSpacingClass}`}
            />
            <SameAsDisplay
                title={lang.sameAs}
                urls={model?.sameAs}
                //className={`${appConfig.spacing.singleSectionSpacingClass}`}
            />
        </>
    );

    const Footer = (
        <>
            <SupererogatorySection model={model} />

            {(model.createdAt || model.updatedAt || model.meta) && (
                <SingleInfo title={lang.entityMetadata} className="pt-3">
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
                </SingleInfo>
            )}
        </>
    );

    {
        /*********** Bottom section ***********/
    }
    const SinglePageBottom = (
        <SingleBaseProgressBar
            dataList={[
                { data: model.equipmentType.name },
                { data: model.title },
                { data: model.brand },
                { data: lang.modelName },
                { data: model?.url },
                {
                    data: model.mainImage.isDefault,
                    validationFunction: (value) => !value,
                },
            ]}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    );

    {
        /**************************
         *   Elements returned as props of the SingleBase
         */
    }
    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={Header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
            />
        </>
    );
};

export default EquipmentSingleView;
