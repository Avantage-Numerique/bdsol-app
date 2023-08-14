import { useCallback } from "react";

//Components
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import EntitiesTagGrid from "@/src/DataTypes/Entity/layouts/EntitiesTagGrid";
import SearchTag from "@/src/common/Components/SearchTag";
import { ExternalLink } from "@/src/common/Components/ExternalLink";

//Utils
import Head from "next/head";
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';
import { lang } from "@/src/common/Data/GlobalConstants";
import {SingleEntityStatus} from "@/DataTypes/Status/components/SingleEntityStatus";
import {getTitle} from "@/DataTypes/MetaData/MetaTitle";
import Event from "../../../models/Event";
import DisplaySchedule from "../../Forms/Schedule/DisplaySchedule";

//Hooks
import {useDateManager} from '@/common/DateManager/DateManager'


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
        team,
        //duration,
        //location,
        startDate,
        endDate,
        contactPoint,
        mainImage,
        attendees,
        domains,
        skills,
        //experience,
        schedule,
        subEvents,
        status,
        type,
        createdAt,
        updatedAt
    } = data
    const model = new Event(data);

    const getLabelGenerator = useCallback((param, query) => {
        return {
            "events": lang.Events,
            "slug": model.title        
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleRoute,
        getLabelGenerator: getLabelGenerator
    }

    const { TimeTag, TimeIntervalSentence } = useDateManager(startDate, endDate);


    const header = (
        <SingleBaseHeader 
            title={(<SanitizedInnerHtml tag={"h1"} className="text-white">{`${model.title}`}</SanitizedInnerHtml>)}
            subtitle={(
                <div className="d-text">
                    <h4 className="text-white">{model.alternateName ? model.alternateName : ""}</h4>
                    <div className="mt-4">
                        <p className="text-white m-0">Entité en charge : {model.entityInCharge ? model.entityInCharge.name : "Aucune"}</p>
                        <p className="text-white">Organisateur : {model.organizer ? model.organizer.name : "Aucun"}</p>
                    </div>
                </div>
            )}
            mainImage={model.mainImage}
            entity={model}
            buttonText="Proposer des modifications"
            buttonLink={model.singleEditLink}
        />
    )
    const fullWidthContent = (
        <div>
            <div className="row">
                <div className="col col-md-6">              
                    {/*Date*/}
                    <div>
                        { startDate && endDate  && <TimeIntervalSentence tag="h3" /> }  
                    </div>
                    <div>
                        <h4 className="text-primarylight">{eventType}</h4>
                    </div>
                </div>
                <div className="col col-md-6">
                    {/*eventType */}
                    { eventType?.length > 0 &&
                        <SingleInfo title={lang.eventType}>
                            <ul>
                                {eventType.map( type => (
                                    <li>
                                        {type.name}
                                    </li>
                                ))}
                            </ul>
                        </SingleInfo>
                    }
                </div>
            </div>
            <div className="row mt-4">
                {
                    description &&
                    <SingleInfo title={lang.description}>
                        <SanitizedInnerHtml>{description}</SanitizedInnerHtml>
                    </SingleInfo>
                }
            </div>
        </div>
    )
    const contentColumnLeft = (
        <>
            {/* schedule */}
            {
                schedule &&
                <SingleInfo title={lang.schedule}>
                    <DisplaySchedule feed={schedule}/>
                </SingleInfo>
            }
            {/* subEvents */}
            {
                subEvents &&
                <SingleInfo title={lang.subEvents}>
                    <EntitiesTagGrid feed={subEvents} />
                </SingleInfo>
            }
            {/* attendees */}
            {
                attendees &&
                <SingleInfo title={lang.attendees}>
                    <EntitiesTagGrid feed={attendees} />
                </SingleInfo>
            }

            {/* team */}
            {
                team?.length > 0 &&
                <SingleInfo 
                    title={lang.teamMembers}
                    className="mb-3"
                >
                    <EntitiesTagGrid feed={team} subEntityProperty={"member"} subBadgeProperty={"role"} noneMessage={"Aucun membre de l'équipe spécifiés"} />
                </SingleInfo>
            }
            
        </>
    )
    const contentColumnRight = (
        <>
            {/* skills */}
            {
                skills?.length > 0 &&
                <SingleInfo 
                    title={lang.eventSkills}
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

            {/* domains */}
            {
                domains?.length > 0 && 
                <SingleInfo title={lang.domainsSingleLabel} className={"mb-3"}>
                    <SearchTag
                        className="row"
                        list={domains}
                        listProperty={"domain"}
                    />
                </SingleInfo>
            }
            {/* Url */}
            { url &&
                <SingleInfo title={lang.hyperlink} className={"pb-4"}>
                    <ExternalLink href={url}>{url}</ExternalLink>
                </SingleInfo>
            }
            {/* contactPoint */}
            { contactPoint &&
                <SingleInfo title={lang.contactPoint}>
                    {contactPoint}
                </SingleInfo>
            }
        </>
    )

    {/*********** Footer section ***********/}
    const Footer = (
        <div className="border-top border-bottom pt-2">
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus  
                    createdAt={createdAt} 
                    updatedAt={updatedAt} 
                    status={status} />
            }
        </div>
    )
    
    return (
        <>
            <Head>
                <title>{getTitle([model.title, model.Type.label])}</title>
            </Head>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}              
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={Footer}
            />
        </>
    )
}

export default EventSingleView;