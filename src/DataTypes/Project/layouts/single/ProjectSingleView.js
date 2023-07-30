import React, {useCallback, useEffect, useState} from 'react';

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
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import EntityTag from "@/DataTypes/Entity/layouts/EntityTag";
import {getModelFromType} from "@/DataTypes/Entity/Types";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";


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

    const [allEnumState, setAllEnumState] = useState(undefined);
    useEffect( () => {
        const getScheduleEnum = async () => {
            const scheduleEnum = await clientSideExternalApiRequest(
                '/info/budgetrange-enum',
                { method: 'GET' }
            );
            const timeFrameEnum = await clientSideExternalApiRequest(
                '/info/timeframeeta-enum',
                { method: 'GET' }
            )
            const contextEnum = await clientSideExternalApiRequest(
                '/info/context-enum',
                { method: 'GET' }
            )
            let keyValueScheduleEnum = {}
            scheduleEnum.forEach( (elem) => { keyValueScheduleEnum[elem.value] = elem.label });
            timeFrameEnum.forEach( (elem) => { keyValueScheduleEnum[elem.value] = elem.label });
            contextEnum.forEach( (elem) => { keyValueScheduleEnum[elem.value] = elem.label })
            setAllEnumState(keyValueScheduleEnum);
        }
        getScheduleEnum();
    }, [])

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
                    {sponsor?.length > 0 && sponsor.map( (singleSponsor, index) => {
                        let sponsorModel;
                        if (singleSponsor.entity) {
                            sponsorModel = getModelFromType(singleSponsor.entity.type, singleSponsor.entity);//
                        }
                        return (
                            <li className="d-flex flex-column w-50" key={`sponsor-${index}`}>
                                {singleSponsor.name &&
                                    <div className="p-1" key={`sponsor-sponsor-name${index}`}>
                                        {singleSponsor?.name}
                                    </div>
                                }
                                { !sponsorModel ?
                                    <div className="p-1 bg-successlighter text-white">{singleSponsor?.entity?.name ?? singleSponsor?.entity?.fullname}</div>
                                    :
                                    <EntityTag model={sponsorModel} />
                                }
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
                        {team.map( (singleMember, index) => {
                            let memberModel;
                            if (singleMember.member) {
                                memberModel = getModelFromType(singleMember.member.type, singleMember.member);//
                            }

                            return (
                                <li className="d-flex flex-column w-50" key={`teammember-${index}`}>
                                    {singleMember?.role &&
                                        <div className="p-1" key={`teammember-role${index}`}>
                                            {singleMember?.role}
                                        </div>
                                    }
                                    { !memberModel ?
                                        <div className="p-1 bg-successlighter text-white">{singleMember?.member?.fullName ?? "Aucun nom"}</div>
                                        :
                                        <EntityTag model={memberModel} />
                                    }
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
                    {scheduleBudget?.estimatedTotalBudget && <div key="estimatedTotalBudget">Budget total : {scheduleBudget.estimatedTotalBudget}$</div>}
                    {scheduleBudget?.eta && <div key="eta">Lapse de temps avant la complétion : {scheduleBudget.eta}</div>}
                    {scheduleBudget?.timeframe?.length > 0 && 
                        <ul key="timeframe-container">
                                Échéancier : {
                                scheduleBudget.timeframe.map( (singleTimeframe, index) => {
                                    return (
                                        <li key={`timeframe-${singleTimeframe._id}`} className={`border-start p-2 ${(index % 2 === 0) && "bg-greyBg"}`}>
                                            {singleTimeframe?.step ? <h5 className="text-successDarker m-0">{singleTimeframe.step}</h5> : <></> }
                                            <div className="d-flex flex-wrap gap-4">     
                                                {singleTimeframe?.eta ? <div key={"timeframe-eta-"+index}>Durée : {allEnumState?.[singleTimeframe.eta] ?? singleTimeframe.eta}</div> : <></> }
                                                {singleTimeframe?.budgetRange ? <div key={"timeframe-budgetRange-"+index}>Budget : {allEnumState?.[singleTimeframe.budgetRange] ?? singleTimeframe.budgetRange}</div> : <></> }
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
                {allEnumState?.[context] ?? context}
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
                <title>{getTitle([model.title, model.Type.label])}</title>
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