import React, {useCallback} from 'react';

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SearchTag from '@/src/common/Components/SearchTag';

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityStatus} from "@/DataTypes/Status/components/SingleEntityStatus";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import Project from "@/DataTypes/Project/models/Project";
import {lang} from "@/common/Data/GlobalConstants";
import Head from "next/head";
import nextConfig from "@/next.config";


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
        domains,
        context,
        status,
        createdAt,
        updatedAt
    } = data;

    const model = new Project(data);

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "projets": lang.Projects,
            "slug": name       
        }[param];
    }, []);

    /****************************
     *  Sections
     ***************************/
    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }

    const Header = (
        <SingleBaseHeader 
            title={(<h2 className="text-white">{`${name}`}</h2>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{alternateName}</h4>
                    <div className="mt-4">
                        <p className="text-white m-0">Entité en charge : {entityInCharge ? entityInCharge.name : "Aucune"}</p>
                        <p className="text-white">Producteur : {producer ? producer.name : "Aucun"}</p>
                    </div>
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
            <SingleInfo title={"Présentation"} className={"mb-3 mt-3"}>
                <SanitizedInnerHtml>
                    {description}
                </SanitizedInnerHtml>
            </SingleInfo>
            {/* Sponsor */}
            <SingleInfo title="Partenaires">
                <ul className="d-flex flex-wrap gap-3">
                    {sponsor?.length > 0 && sponsor.map( (singleSponsor) => {
                        return (
                            <li className="d-flex flex-column border border-successlighter rounded-1">
                                {singleSponsor.name && <div className="p-1">{singleSponsor?.name}</div>}
                                {singleSponsor.entity && <div className="p-1 bg-successlighter text-white">{singleSponsor?.entity?.name ?? singleSponsor?.entity?.fullname}</div>}
                            </li>
                        )
                    }) }
                </ul>
            </SingleInfo>
        </>
    )

    const ContentColumnLeft = (
        <>
            {/* Team */}
            <SingleInfo 
                title="Membre de l'équipe"
                className="mb-3"
            >
                {
                    team?.length > 0 &&
                    <ul className="d-flex flex-wrap gap-3">
                        {team.map( (singleMember) => {
                            return (
                                <li className="d-flex flex-column border border-purplelight rounded-1">
                                    <div className="p-1">{singleMember?.member?.fullName ?? "Aucun nom"}</div>
                                    <b className="p-1 fs-6 bg-purplelight text-white">{singleMember?.role ?? "Aucun rôle"}</b>
                                </li>
                            )
                        })}
                    </ul>
                }
            </SingleInfo>
            {/* scheduleBudget */}
            <SingleInfo 
                title="Échéancier et budget"
                className="mb-3"
            >
                <section className='ps-4 border-start'>
                    {scheduleBudget?.startDate && <div key="startDate">Date de début : {getDateFromIsoString(scheduleBudget.startDate)}</div>}
                    {scheduleBudget?.endDateEstimate && <div key="endDateEstimate">Date estimée de fin : {getDateFromIsoString(scheduleBudget.endDateEstimate)}</div>}
                    {scheduleBudget?.completionDate && <div key="completionDate">Date de fin : {getDateFromIsoString(scheduleBudget.completionDate)}</div>}
                    {scheduleBudget?.estimatedTotalBudget && <div key="estimatedTotalBudget">Budget total : {scheduleBudget.estimatedTotalBudget}</div>}
                    {scheduleBudget?.eta && <div key="eta">Lapse de temps avant la complétion : {scheduleBudget.eta}</div>}
                    {scheduleBudget?.timeframe?.length > 0 && 
                        <ul key="timeframe-container">
                                Échéancier : {
                                scheduleBudget.timeframe.map( (singleTimeframe, index) => {
                                    return (
                                        <li key={`timeframe-${singleTimeframe._id}`} className={`border-start p-2 ${(index % 2 === 0) && "bg-greyBg"}`}>
                                            {singleTimeframe?.step ? <h5 className="text-successDarker m-0">{singleTimeframe.step}</h5> : <></> }
                                            <div className="d-flex flex-wrap gap-4">     
                                                {singleTimeframe?.eta ? <div key={"timeframe-eta-"+index}>Durée : {singleTimeframe.eta}</div> : <></> }
                                                {singleTimeframe?.budgetRange ? <div key={"timeframe-budgetRange-"+index}>Budget : {singleTimeframe.budgetRange}</div> : <></> }
                                            </div>
                                        </li>
                                    )
                                }
                        )}</ul>
                    }
                </section>
            </SingleInfo>
        </>
    )

    const ContentColumnRight = (
        <>  
            {/* Context */}
            <SingleInfo 
                title="Contexte du projet"
                className="mb-3"
            >
                {context}
            </SingleInfo>
            {/* Skills */}
            <SingleInfo 
                title="Compétences liées au projet"
                className="mb-3"
            >
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

            <SingleInfo title={lang.domainsSingleLabel} className={"mb-3"}>
                {
                    domains?.length > 0 && 
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                }
            </SingleInfo>
            
            <SingleInfo 
                title={"Contact"} 
                className={"mb-3"}
            >
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
            {/* Url */}
            <SingleInfo title="Hyperlien"><p>{url}</p></SingleInfo>
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
        <>
            <Head>
                <title>{model.title}{model.meta.seperator}{model.Type.label}{model.meta.seperator}{nextConfig.app.name}</title>
            </Head>
            <SingleBase
                breadCrumb={breadCrumb}
                header={Header}
                fullWidthContent={FullWidthContent}
                contentColumnLeft={ContentColumnLeft}
                contentColumnRight={ContentColumnRight}
                footer={Footer}
            />
        </>
    )
}

export default ProjectSingleView