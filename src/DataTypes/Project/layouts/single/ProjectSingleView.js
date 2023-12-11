import React, {useCallback, useEffect, useState} from 'react';

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SearchTag from '@/src/common/Components/SearchTag';
import SocialHandleDisplay from '@/src/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay';
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import EntityLink from "@/DataTypes/Entity/layouts/EntityLink";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import Project from "@/DataTypes/Project/models/Project";
import {lang} from "@/common/Data/GlobalConstants";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";

//styling 
import styles from "./ProjectSingleView.module.scss"
import {haveAValidValue} from "@/src/helpers/obj";
import {appConfig} from "@/src/configs/AppConfig";

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

    const sectionClassSpacing = appConfig.spacing.singleSectionSpacingClass;

    /******* Sorted lists ********/
    const sortedSponsors = sponsor?.[0]?.subMeta?.order ? sponsor.sort((a,b) => a.subMeta.order - b.subMeta.order) : sponsor;
    const sortedTeam = team?.[0]?.subMeta?.order ? team.sort((a,b) => a.subMeta.order - b.subMeta.order) : team;

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
                <SingleInfo title={lang.projectDescription} className={`${sectionClassSpacing} mt-3`}>
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                </SingleInfo>
            }
            {sortedSponsors.length > 0 &&
                <SingleInfo title={lang.projectPartners} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={sortedSponsors} subEntityProperty={"entity"} subBadgeProperty={"name"} />
                </SingleInfo>
            }
        </>
    );

    const ContentColumnLeft = (
        <>
            {sortedTeam.length > 0 &&
                <SingleInfo
                    title={lang.teamMembers}
                    className={`${sectionClassSpacing}`}
                >
                    <EntitiesTagGrid feed={sortedTeam} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={"Aucun membre de l'équipe spécifiés"} />
                </SingleInfo>
            }

            { scheduleBudget && haveAValidValue(scheduleBudget) &&
                <SingleInfo
                    title={lang.timelineAndBudget}
                    className={`${sectionClassSpacing}`}
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
                                <h5 className="mt-4 text-dark">{lang.projectsSteps}</h5>
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

            {equipment && 
                <SingleInfo title={lang.Equipments} className={`${sectionClassSpacing}`}>
                    <EntitiesTagGrid feed={equipment} noneMessage={""} />
                </SingleInfo>
            }

            {/*url*/}
            <SocialHandleDisplay 
                title={lang.url} 
                url={model?.url}
                className={`${appConfig.spacing.singleSectionSpacingClass}`}
            />
        </>
    )

    const ContentColumnRight = (
        <>
            {context !== "" &&
                <SingleInfo
                    title={lang.projectContext}
                    className={`${sectionClassSpacing}`}
                >
                    {allEnumState?.[context] ?? context}
                </SingleInfo>
            }

            { skills?.length > 0 &&
                <SingleInfo
                    title={lang.projectSkills}
                    className={`${sectionClassSpacing}`}
                >
                    <>
                        <SearchTag
                            list={skills}
                        />
                    </>
                </SingleInfo>
            }

            { domains?.length > 0 &&
                <SingleInfo title={lang.domainsSingleLabel} className={`${sectionClassSpacing}`}>
                    <SearchTag
                        list={domains}
                        listProperty={"domain"}
                    />
                </SingleInfo>
            }

            { contactPoint &&
                <SingleInfo
                    title={lang.projectContact}
                    className={`${sectionClassSpacing}`}>
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
    const bg_color = header ? "bg-secondary-light" : ((index % 2 === 0) ? "bg-greyBg" : "")

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
