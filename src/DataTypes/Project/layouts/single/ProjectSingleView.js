import React, {useCallback, useEffect, useState} from 'react';

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SearchTag from '@/src/common/Components/SearchTag';

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import Project from "@/DataTypes/Project/models/Project";
import {lang} from "@/common/Data/GlobalConstants";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {ExternalLink} from "@/common/Components/ExternalLink";
import EntityLink from "@/DataTypes/Entity/layouts/EntityLink";


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
        equipment,
        sponsor,
        scheduleBudget,
        skills,
        domains,
        context,
        meta,
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
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{alternateName}</h4>
                    <div className="mt-4">
                        {entityInCharge &&
                            <p className="text-white">
                                <span className={"badge bg-secondary"}>{lang.inCharge}</span> <EntityLink data={entityInCharge} />
                            </p>
                        }
                        {producer &&
                            <p className="text-white">
                                <span className={"badge bg-secondary"}>{lang.producer}</span> <EntityLink data={producer} />
                            </p>
                        }
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
            { description !== "" &&
                <SingleInfo title={"Présentation"} className={"mb-3 mt-3"}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }
            {sponsor.length > 0 &&
                <SingleInfo title="Partenaires">
                    <EntitiesTagGrid feed={sponsor} subEntityProperty={"entity"} subBadgeProperty={"name"} />
                </SingleInfo>
            }
        </>
    )

    const ContentColumnLeft = (
        <>
            {team.length > 0 &&
                <SingleInfo
                    title={lang.teamMembers}
                    className="mb-3"
                >
                    <EntitiesTagGrid feed={team} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={"Aucun membre de l'équipe spécifiés"} />
                </SingleInfo>
            }

            { scheduleBudget &&
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
            }

            {equipment && 
                <SingleInfo title={lang.Equipments} className={"pb-4"}>
                    <EntitiesTagGrid feed={equipment} noneMessage={""} />
                </SingleInfo>
            }

            {url &&
                <SingleInfo title="Hyperlien" className={"pb-4"}>
                    <ExternalLink href={url}>{url}</ExternalLink>
                </SingleInfo>
            }
        </>
    )

    const ContentColumnRight = (
        <>
            {context !== "" &&
                <SingleInfo
                    title="Contexte du projet"
                    className="mb-3"
                >
                    {allEnumState?.[context] ?? context}
                </SingleInfo>
            }

            { skills?.length > 0 &&
                <SingleInfo
                    title="Compétences liées au projet"
                    className="mb-3"
                >
                    <>
                        <SearchTag
                            className="row"
                            list={skills}
                        />
                    </>
                </SingleInfo>
            }

            { domains?.length > 0 &&
                <SingleInfo title={lang.domainsSingleLabel} className={"mb-3"}>
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                </SingleInfo>
            }

            { contactPoint &&
                <SingleInfo
                    title={"Contact"}
                    className={"mb-3"}>
                    <SanitizedInnerHtml>
                        {contactPoint}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }
        </>
    )

    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta
                    createdAt={createdAt} 
                    updatedAt={updatedAt} 
                    meta={meta} 
                />
            }
        </>
    )

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

export default ProjectSingleView