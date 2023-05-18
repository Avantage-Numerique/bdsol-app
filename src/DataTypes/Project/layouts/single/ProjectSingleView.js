import React from 'react';

//Components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {lang} from "@/common/Data/GlobalConstants";

const ProjectSingleView = ({ data }) => {

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

    console.log(location)

    /****************************
     *  Sections
     ***************************/
    const Header = (
        <SingleBaseHeader 
            title={(<h2 className="text-white">{`${name}`}</h2>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{alternateName}</h4>
                    <p className="text-white">{entityInCharge}</p>
                </div>
            )}
            mainImage={mainImage}
            entity={data}
            type="Personne"
        />
    )

    const FullWidthContent = (
        <SingleInfo title={"Présentation"} className={"mb-3 mt-3"}>
            <SanitizedInnerHtml>
                {description}
            </SanitizedInnerHtml>
        </SingleInfo>
    )

    const ContentColumnLeft = (
        <>
            <SingleInfo title={"Groupes de compétences"} className={"mb-3"}>
            </SingleInfo>
        </>
    )

    const ContentColumnRight = (
        <> 
            <SingleInfo title={"Contact"} className={"mb-3"}>
                {contactPoint && 
                    <SanitizedInnerHtml>
                        {contactPoint}
                    </SanitizedInnerHtml>
                }
            </SingleInfo>
        </>
    )

    const Footer = (
        <>
            {
                status?.state &&
                    <SingleInfo className="border-top pt-3"
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus 
                    className="border-bottom pb-2" 
                    createdAt={createdAt} 
                    updatedAt={updatedAt} 
                    status={status} 
                />
            }
        </>
    )

    return (  
        <SingleBase 
            header={Header}
            fullWidthContent={FullWidthContent}
            contentColumnLeft={ContentColumnLeft}
            contentColumnRight={ContentColumnRight}
            footer={Footer}
        />
    )
}

export default ProjectSingleView