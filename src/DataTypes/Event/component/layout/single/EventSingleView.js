import React, {useEffect, useState} from "react";

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import EntitiesTagGrid from "@/src/DataTypes/Entity/layouts/EntitiesTagGrid";
import SearchTag from "@/src/common/Components/SearchTag";
import SingleBaseProgressBar
    from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseProgressBar/SingleBaseProgressBar'
import SocialHandleDisplay from '@/src/DataTypes/common/layouts/SocialHandlesViews/SocialHandleDisplay'
import {ContactPointView} from "@/src/DataTypes/common/layouts/ContactPointView/ContactPointView";

//Utils
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import {lang} from "@/src/common/Data/GlobalConstants";
import {SingleEntityMeta} from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import Event from "../../../models/Event";
import DisplaySchedule from "../../Forms/Schedule/DisplaySchedule";
import {removeTagsFromString} from '@/src/helpers/html'


//Hooks
import {dateManager} from '@/common/DateManager/DateManager'
import {clientSideExternalApiRequest} from "@/src/hooks/http-hook";
import {appConfig} from "@/src/configs/AppConfig";


const EventSingleView = ({data}) => {

    const {
        _id,
        name,
        slug,
        alternateName,
        url,
        description,
        entityInCharge,
        organizer,
        eventType,
        eventFormat,
        team,
        //duration,
        startDate,
        endDate,
        contactPoint,
        mainImage,
        attendees,
        domains,
        skills,
        schedule,
        subEvents,
        location,
        meta,
        type,
        createdAt,
        updatedAt
    } = data


    const model = new Event(data);

    const [formatEnumState, setFormatEnumState] = useState(undefined);

    /******* Sorted lists ********/
    const sortedTeam = team?.[0]?.subMeta?.order !== undefined ? team.sort((a,b) => a.subMeta.order - b.subMeta.order) : team;

    useEffect( () => {
        const getEventFormatEnum = async () => {
            const eventFormatResponse = await clientSideExternalApiRequest(
                '/info/eventformat-enum',
                { method: 'GET' }
            );
            const keyValueEnum = {};
            eventFormatResponse.forEach( (elem) => { keyValueEnum[elem.value] = elem.label });
            setFormatEnumState(keyValueEnum);
        }
        getEventFormatEnum();
    }, [])



    /* Needed for breadCrumb generator */
    const breadcrumbLabels = {
        "evenements": lang.Events,
        "consulter": lang.consultTitle,
        "slug": model.title
    };

    const breadcrumbsRoutes = {
        route: model.singleRoute,
        labels: breadcrumbLabels,
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
    }, [name]);


    const { TimeTag, TimeIntervalSentence } = dateManager(startDate, endDate);

    const header = (
        <SingleBaseHeader 
            title={(<h1>{model.title}</h1>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{model.alternateName ? model.alternateName : ""}</h4>
                    {/*Date*/}
                    <SingleInfo displayCondition={(startDate && endDate)}>
                        <TimeIntervalSentence tag="h2" className="text-decoration-underline" />
                    </SingleInfo>
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    );


    const fullWidthContent = (
        <div>
            <div className="row">
                <div className="col col-md-6">   
                    <SingleInfo 
                        title="Organisations responsables"
                    >
                        <SingleInfo 
                            title={lang.entityInCharge}
                            isSubtitle
                        >
                            {model.entityInCharge && 
                                <EntitiesTagGrid 
                                    feed={[model.entityInCharge]} 
                                    numberOfCols={1}
                                    className="mb-0 pt-1"
                                />
                            }
                        </SingleInfo> 
                        
                        <SingleInfo 
                            title={lang.producer}
                            isSubtitle
                        >
                            {model.organizer && 
                                <EntitiesTagGrid 
                                    feed={[model.organizer]} 
                                    numberOfCols={1}
                                    className="mb-0 pt-1"
                                />
                            }
                        </SingleInfo>
                    </SingleInfo>           
                </div>
                <div className="col col-md-6">
                    {/* location */}
                    <SingleInfo 
                        title={lang.location}
                        displayCondition={(location?.length > 0)} 
                    >
                        <EntitiesTagGrid 
                            feed={location} 
                            subBadgeProperty={"address"} 
                            numberOfCols={1}
                            className="mb-0"
                        />
                    </SingleInfo>
                </div>
            </div>
            <div className="row mt-4">
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
            </div>
        </div>
    )

    const contentColumnLeft = (
        <>
            {/* schedule */}
            <SingleInfo 
                title={lang.schedule} 
                displayCondition={schedule && schedule.length > 0}
                cardLayout 
            >
                <DisplaySchedule feed={schedule}/>
            </SingleInfo>

            {/* subEvents */}
            {
                /*Commented for populate loop trouble

                <SingleInfo 
                title={lang.subEvents}
                displayCondition={subEvents && subEvents.length > 0}
                cardLayout
                >
                    <EntitiesTagGrid feed={subEvents} />
                </SingleInfo>
                */
            }

            {/* team */}
            <SingleInfo
                title={lang.teamMembers}
                displayCondition={sortedTeam?.length > 0}
                cardLayout
            >
                <EntitiesTagGrid 
                    feed={sortedTeam} 
                    regularFlexWrapping
                    subEntityProperty={"member"} 
                    subBadgeProperty={"role"} 
                    noneMessage={"Aucun membre de l'équipe spécifiés"} 
                    className="mb-0"
                />
            </SingleInfo>
        
            {/* attendees */}
            <SingleInfo 
                title={lang.attendees}
                displayCondition={attendees?.length > 0}
                cardLayout
            >
                <EntitiesTagGrid
                    feed={attendees} 
                    className="mb-0"
                />
            </SingleInfo>
        </>
    )

    const contentColumnRight = (
        <>
            {/* Contact information */}
            <SingleInfo title={lang.organisationContact} cardLayout>
                <ContactPointView contact={model.contactPoint}/>
            </SingleInfo>

            <SingleInfo 
                title={"Informations supplémentaires"}
                cardLayout
            >
                {/* skills */}
                <SingleInfo 
                    title={lang.skillsAndTechnologies}
                    isSubtitle
                    displayCondition={skills?.length > 0}
                >
                    <SearchTag list={skills} />
                </SingleInfo>

                {/* domains */}
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
                
                {/* Url */}
                <SocialHandleDisplay 
                    title={lang.externalLinks} 
                    url={model?.url}
                    className={`${appConfig.spacing.singleSectionSpacingClass}`}
                />

                {/*eventType */}
                <SingleInfo 
                        isSubtitle 
                        title={lang.eventType}
                    >
                    {(eventType?.length > 0) &&
                        <ul className="d-flex flex-wrap mb-0 mt-1">
                            {eventType.map( type => (
                                <li className="badge bg-primary-light text-dark me-1 mb-1" key={`${type.name}`}>
                                    {type.name}
                                </li>
                            ))}
                        </ul>
                    }
                </SingleInfo>

                {/* eventFormat */}
                <SingleInfo 
                    isSubtitle 
                    title={lang.eventFormat}
                >
                    { eventFormat && formatEnumState?.[eventFormat] && 
                        (formatEnumState?.[eventFormat] ?? eventFormat)
                    }
                </SingleInfo>
                
            </SingleInfo>
        </>

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
                {data: model.alternateName},
                {data: startDate},
                {data: model.entityInCharge},
                {data: model.organizer},
                {data: location},
                {data: description, validationFunction: (value => !removeTagsFromString(value))},
                {data: model.mainImage.isDefault, validationFunction: ((value) => !value)}, 
                {data: schedule},
                //{data: subEvents},
                {data: sortedTeam},
                {data: skills},
                {data: domains},
                {data: url},
                {data: contactPoint},
                {data: eventType},
                {data: eventFormat}
            ]}
            buttonText={lang.contributeButtonLabel}
            buttonLink={model.singleEditLink}
        />
    )

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}              
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
            />
        </>
    )
}

export default EventSingleView;