import React from 'react';

//Components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SearchTag from '@/src/common/Components/SearchTag';

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/Components/SingleEntityStatus";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import {replacePathname} from "@/src/helpers/url";
import Project from "@/DataTypes/Project/models/Project";



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

    const model = new Project(data);

    const link = "/"+replacePathname(model.singleEditRoute.pathname, {slug: model.slug});

    /****************************
     *  Sections
     ***************************/
    const Header = (
        <SingleBaseHeader 
            title={(<h2 className="text-white">{`${name}`}</h2>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{alternateName}</h4>
                    <p className="text-white">Entité en charge du projet : {entityInCharge ? entityInCharge.name : "Aucune"}</p>
                    <p className="text-white">Producteur : {producer ? producer.name : "Aucun"}</p>
                </div>
            )}
            mainImage={mainImage}
            entity={data}
            type="Projet"
            buttonText="Proposer des modifications"
            buttonLink={link}
        />
    )

    const FullWidthContent = (
        <>
            <SingleInfo title={"Présentation"} className={"mb-3 mt-3"}>
                <SanitizedInnerHtml>
                    {description}
                </SanitizedInnerHtml>
            </SingleInfo>
            {/* Sponsor */}
            <SingleInfo title="Partenaires">
                <ul>
                    {sponsor?.length > 0 && sponsor.map( (singleSponsor) => {
                        return (
                            <li>
                                {singleSponsor.name && <div>{singleSponsor?.name}</div>}
                                {singleSponsor.entity && <div>{singleSponsor?.entity?.name ?? singleSponsor?.entity?.fullname}</div>}
                            </li>
                        )
                    }) }
                </ul>
            </SingleInfo>
        </>
    )

    const ContentColumnLeft = (
        <>
            {/* Context */}
            <SingleInfo title="Contexte du projet">{context}</SingleInfo>
            {/* Skills */}
            <SingleInfo title="Compétences liées au projet">
            {
                skills?.length > 0 &&
                <>
                    <SearchTag
                        className="row"
                        list={skills}
                    />
                </>
            }
            </SingleInfo>
            {/* Team */}
            <SingleInfo title="Membre de l'équipe">
                {
                    team?.length > 0 &&
                    <ul>
                        {team.map( (singleMember) => {
                            console.log(singleMember)
                            return (
                                <li>
                                    <b>{singleMember?.member?.fullName ?? "Aucun nom"}</b>
                                    <div>{singleMember?.role ?? "Aucun rôle"}</div>
                                </li>
                            )
                        })}
                    </ul>
                }
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
            
            {/* scheduleBudget */}
            <SingleInfo title="Échéancier et budget">
                <ul className='ps-4 border-start'>
                    {scheduleBudget?.startDate && <li key="startDate">Date de début : {getDateFromIsoString(scheduleBudget.startDate)}</li>}
                    {scheduleBudget?.endDateEstimate && <li key="endDateEstimate">Date estimée de fin : {getDateFromIsoString(scheduleBudget.endDateEstimate)}</li>}
                    {scheduleBudget?.completionDate && <li key="completionDate">Date de fin : {getDateFromIsoString(scheduleBudget.completionDate)}</li>}
                    {scheduleBudget?.estimatedTotalBudget && <li key="estimatedTotalBudget">Budget total : {scheduleBudget.estimatedTotalBudget}</li>}
                    {scheduleBudget?.eta && <li key="eta">Lapse de temps avant la complétion : {scheduleBudget.eta}</li>}
                    {scheduleBudget?.timeframe?.length > 0 && 
                        <li key="timeframe-container">
                                Échéancier : {
                                scheduleBudget.timeframe.map( (singleTimeframe, index) => {
                                    return (
                                        <div key="timeframe" className='border-start ps-4'>
                                            {singleTimeframe?.step ? <div key={"timeframe-step-"+index}>Étape : {singleTimeframe.step}</div> : <></> }
                                            {singleTimeframe?.eta ? <div key={"timeframe-eta-"+index}>Durée : {singleTimeframe.eta}</div> : <></> }
                                            {singleTimeframe?.budgetRange ? <div key={"timeframe-budgetRange-"+index}>Budget : {singleTimeframe.budgetRange}</div> : <></> }
                                        </div>
                                    )
                                }
                        )}</li>
                    }
                </ul>
            </SingleInfo>
        </>
    )

    const Footer = (
        <>
            {/* Url */}
            <SingleInfo title="Hyperlien"><p>{url}</p></SingleInfo>
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