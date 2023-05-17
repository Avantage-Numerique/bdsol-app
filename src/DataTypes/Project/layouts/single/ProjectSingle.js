import React from 'react';

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";

const ProjectSingle = ({ data }) => {

    const {
        _id,
        name,
        alternateName,
        slug,
        entityInCharge,
        producer,
        description,
        url,
        contactPoint,
        location,
        team,
        mainImage,
        sponsor,
        scheduleBudget,
        skills,
        context,
        status,
        createdAt,
        updatedAt
    } = data;

    /****************************
     *  Sections
     ***************************/
    const FullWidthContent = () => (
        <SingleInfo title={"Présentation"} className={"mb-3"}>
            <SanitizedInnerHtml>
                {description}
            </SanitizedInnerHtml>
        </SingleInfo>
    )

    const ContentColumnLeft = () => (
        <>
            <SingleInfo title={"Équipe"} className={"mb-3"}>
            </SingleInfo>

            <SingleInfo title={"Financement"} className={"mb-3"}>
            </SingleInfo>

            <SingleInfo title={"Budget"} className={"mb-3"}>
            </SingleInfo>
        </>
    )

    const ContentColumnRight = () => (
        <> 
            <SingleInfo title={"Contact"} className={"mb-3"}>
                <SanitizedInnerHtml>
                    {contactPoint}
                </SanitizedInnerHtml>
            </SingleInfo>
            <SingleInfo title={"Adresse"} className={"mb-3"}>
                {location && location}
            </SingleInfo>
        </>
    )

    const Footer = () => (
        <>
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus 
                    className={singleInfoCommonClass} 
                    createdAt={createdAt} 
                    updatedAt={updatedAt}         
                    status={status}
                />
            }
        </>
    )

    return (
        <>
            <SingleBase 
                header={null}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
            />
        </>
    )
}

export default ProjectSingle