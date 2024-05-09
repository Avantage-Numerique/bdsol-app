import React, {useEffect, useState} from 'react';

//components
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader"
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase"
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SearchTag from '@/src/common/Components/SearchTag';
import SocialHandleDisplay from '@/src/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay';
import EntitiesTagGrid from "@/DataTypes/Entity/layouts/EntitiesTagGrid";
import EntityLink from "@/DataTypes/Entity/layouts/EntityLink";
import SingleBaseProgressBar
    from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import {getDateFromIsoString} from "@/src/utils/DateHelper";
import Project from "@/DataTypes/Project/models/Project";
import {lang} from "@/common/Data/GlobalConstants";
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import {removeTagsFromString} from '@/src/helpers/html'

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
    /*const getLabelGenerator = useCallback((param, query) => {
        return {
            "projets": lang.Projects,
            "slug": name       
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }*/


    const breadcrumbLabels = {
        "projets": lang.Projects,
        "slug": name
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
    }, [name]);


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

    const Header = (
        <SingleBaseHeader 
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{alternateName}</h4>
                    <div className="mt-4">
                        {entityInCharge &&
                            <p className="text-white">
                                <span className={"badge bg-secondary"}>{lang.entityInCharge}</span> <EntityLink data={entityInCharge} />
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
            <SingleInfo 
                title={lang.about} 
                NAMessage="Aucune description n'est disponible pour le moment."
            >
                {
                    removeTagsFromString(description) && 
                    <SanitizedInnerHtml>
                        {description}
                    </SanitizedInnerHtml>
                }
            </SingleInfo>
        </>
    );

    const ContentColumnLeft = (
        <>
            {/* Partners */}
            <SingleInfo 
                title={lang.projectPartners} 
                displayCondition={sortedSponsors.length > 0}
                cardLayout
            >
                <EntitiesTagGrid feed={sortedSponsors} subEntityProperty={"entity"} subBadgeProperty={"name"} />
            </SingleInfo>
            
            {/* Team */}
            <SingleInfo
                    title={lang.teamMembers}
                    displayCondition={sortedTeam.length > 0}
                    cardLayout
            >
                <EntitiesTagGrid feed={sortedTeam} regularFlexWrapping subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={"Aucun membre de l'équipe spécifiés"} />
            </SingleInfo>
            
            {/* schedule budget */}
            <SingleInfo
                title={lang.timelineAndBudget}
                cardLayout
                displayCondition={scheduleBudget && haveAValidValue(scheduleBudget)}
            >
                <section className={`${styles["budget"]}`}>
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
            
            {/* Equipments */}
            <SingleInfo 
                title={lang.equipmentUsed} 
                cardLayout
            >
                {equipment && 
                    <EntitiesTagGrid 
                        regularFlexWrapping 
                        feed={equipment} 
                        noneMessage={""} 
                    />
                }
            </SingleInfo>

        </>
    )

    const ContentColumnRight = (
        <SingleInfo
            title="Informations supplémentaires"
            cardLayout
        >
            {context !== "" &&
                <SingleInfo
                    title={lang.projectContext}
                    isSubtitle
                >
                    {allEnumState?.[context] ?? context}
                </SingleInfo>
            }

            {/* Skills */}
            <SingleInfo
                title={lang.skillsAndTechnologies}
                displayCondition={skills?.length > 0}
                isSubtitle
            >
                <SearchTag list={skills} />
            </SingleInfo>
            
            {/* Domains */}
            <SingleInfo 
                title={lang.Domains} 
                displayCondition={domains?.length > 0}
                isSubtitle
            >
                <SearchTag
                    list={domains}
                    listProperty={"domain"}
                />
            </SingleInfo>
            
            {/* Contact */}            
            <SingleInfo
                title={lang.contactInformations}
                isSubtitle                
            >
                { contactPoint &&
                <SanitizedInnerHtml>
                    {contactPoint}
                </SanitizedInnerHtml>
                }
            </SingleInfo>
            
            {/*url*/}
            <SocialHandleDisplay 
                title={lang.externalLinks} 
                url={model?.url}
                className={`${appConfig.spacing.singleSectionSpacingClass}`}
            />
        </SingleInfo>
    )

    {/*********** Footer section ***********/}
    const Footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleInfo 
                    title={lang.entityMetadata} 
                    className="border-top pt-3"
                >
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
                </SingleInfo>
            }
        </>
    )

    {/*********** Bottom section ***********/}
    const SinglePageBottom = (
        <SingleBaseProgressBar 
            dataList={[
                {data: model.title},
                {data: alternateName},
                {data: entityInCharge},
                {data: producer},
                {data: description, validationFunction: (value => removeTagsFromString(value) ? true : false)},
                {data: sortedSponsors},
                {data: sortedTeam},
                {data: scheduleBudget, validationFunction: ((value) => value && haveAValidValue(value))},
                {data: equipment},
                {data: context},
                {data: skills},
                {data: domains},
                {data: contactPoint},
                {data: model?.url},
                {data: model.mainImage.isDefault, validationFunction: ((value) => !value)}, 
            ]}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
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
                singlePageBottom={SinglePageBottom}
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
