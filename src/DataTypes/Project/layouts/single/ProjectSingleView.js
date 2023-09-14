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
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import {ExternalLink} from "@/common/Components/ExternalLink";
import EntityLink from "@/DataTypes/Entity/layouts/EntityLink";

//styling 
import styles from "./ProjectSingleView.module.scss"

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
                    <EntitiesTagGrid feed={sponsor} />
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
                    <section className={`ps-4 border-start  ${styles["budget"]}`}>
                        <div className="container my-2">
                            <div className="row">
                                <BudgetCard title="Date de début" data={scheduleBudget?.startDate} />
                                <BudgetCard title="Date estimée de fin" data={scheduleBudget?.endDateEstimate} />
                                <BudgetCard title="Date de fin" data={scheduleBudget?.completionDate} />
                                <BudgetCard title="Budget total" data={scheduleBudget?.estimatedTotalBudget} isDate={false} />
                                <BudgetCard title="Temps avant la complétion" data={scheduleBudget?.eta} isDate={false} />
                            </div>
                        </div>

                        {scheduleBudget?.timeframe?.length > 0 && 
                            <>
                                <h5 className="mt-4 text-dark">Étapes du projet</h5>
                                <ul 
                                    key="timeframe-container" 
                                    className={`container rounded overflow-hidden shadow-sm`}
                                >
                                    {/* Table's header */}
                                    <BudgetStep header />
                                    {
                                        scheduleBudget.timeframe.map( (singleTimeframe, index) => {
                                            return (
                                                <BudgetStep 
                                                    key={`timeframe-${singleTimeframe._id}`}
                                                    index={index}
                                                    step={singleTimeframe.step}
                                                    duration= {allEnumState?.[singleTimeframe.eta] ?? singleTimeframe.eta}
                                                    costs={allEnumState?.[singleTimeframe.budgetRange] ?? singleTimeframe.budgetRange}
                                                />
                                            )
                                        })
                                    }
                                </ul>
                            </>
                        }
                    </section>
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
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus
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

/********************************
 * 
 * 
 *      Other functions and components
 * 
 */

 //Line component for the budget steps
 function BudgetStep(props){
    //Deconstruct props
    const {
        header = false,
        index,
        step = " - ",
        duration = " - ",
        costs = " - "
    } = props; 

    const Tag = header ? "h6" : "p";
    const bg_color = header ? "bg-secondarylight" : ((index % 2 === 0) ? "bg-greyBg" : "")

    return (
        <li className={`${bg_color} row`}>
            <Tag className="col col-flex-1 my-2">{header ? "Étape" : step}</Tag>
            <Tag className="col flex-1 my-2">{header ? "Durée" : duration}</Tag>
            <Tag className="col flex-1 my-2">{header ? "Coûts" : costs}</Tag>
        </li>
     )
 }

 function BudgetCard(props){

    const {
        title,
        data,               //Main value to be displayed
        isDate = true,      //By default, considered has holding a date
        col = "col-6",
    } = props;

    const style = {"border": "0.15rem dashed"}

    if(title && data)
        return (
            <div className={`${col} g-3`}>
                <div style={style} className="bg-greyBg py-3 px-3 rounded border-secondary">
                    <h6 className="text-grey mb-1">{title}</h6>
                    <p className="mb-0">{isDate ? getDateFromIsoString(data) : data}</p>
                </div>
            </div>
        )
 }
