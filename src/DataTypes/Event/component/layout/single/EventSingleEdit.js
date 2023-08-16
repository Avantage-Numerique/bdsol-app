//React
import { useContext, useState, useCallback, useEffect } from "react";
import Router from "next/router";

//Utils, context
import { useAuth } from "@/src/authentification/context/auth-context";
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { lang } from "@/src/common/Data/GlobalConstants";
import { getDefaultCreateEntityStatus } from "@/src/DataTypes/Status/EntityStatus";
import {replacePathname} from "@/src/helpers/url";
import {SingleEntityStatus} from '@/DataTypes/Status/components/SingleEntityStatus';


//Component
import Event from "../../../models/Event";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import MainImageDisplay from "@/src/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import Link from "next/link";
import Icon from "@/src/common/widgets/Icon/Icon";
import Button from "@/src/common/FormElements/Button/Button";
import Input from "@/src/common/FormElements/Input/Input";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";
import UpdateSchedule from "../../Forms/Schedule/UpdateSchedule";
import UpdateTeams from "@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams";
import { getDateFromIsoString } from "@/src/utils/DateHelper";

const EventSingleEdit = ({data}, ...props) => {

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

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Event(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    
    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);

    /*
        First of all, verify if the user is logged in.
        If he isn't, then redirect him in the connexion page
    */
    useEffect(() => {
        if(!auth.user.isLoggedIn) {
            msg.addMessage({ 
                text: lang.needToBeConnectedToAccess,
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.user.isLoggedIn]);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: name ?? "",
                isValid: false
            },
            alternateName: {
                value: alternateName ?? "",
                isValid: false
            },
            //Not activated. Simply here for the information
            location: {
                value: "",
                isValid: true
            },
            url: {
                value: url ?? "",
                isValid: true
            },
            description: {
                value: description ?? "",
                isValid: true
            },
            entityInCharge: {
                value: entityInCharge ?? "",
                isValid: true
            },
            organizer: {
                value: organizer ?? "",
                isValid: true
            },
            eventType: {
                value: eventType ?? undefined,
                isValid: true
            },
            team: {
                value: team ?? [],
                isValid: true
            },
            startDate: {
                value: startDate ? startDate.split("T")[0] : "",
                isValid: true
            },
            startTime: {
                value: "",
                isValid: true
            },
            endDate: {
                value: endDate ? endDate.split("T")[0] : "",
                isValid: true
            },
            endTime: {
                value: "",
                isValid: true
            },
            contactPoint: {
                value: contactPoint ?? "",
                isValid: true
            },
            attendees: {
                value: attendees ?? [],
                isValid: true
            },
            skills: {
                value: skills ?? [],
                isValid: true
            },
            domains: {
                value: domains ?? [],
                isValid: true
            },
            subEvents: {
                value: subEvents ?? [],
                isValid: true
            }
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }
        }
    );

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();
        const formData = {
            data: {
                id: _id,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge.value.value,
                organizer: formState.inputs.organizer.value?.value ?? undefined,
                description: formState.inputs.description.value,
                eventType: formState.inputs.eventType.value?.length > 0 ?
                    formState.inputs.eventType.value.map( (selectedEventType) => { return selectedEventType.value }) : [],
                startDate: formState.inputs.startDate.value,
                endDate: formState.inputs.endDate.value,
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                schedule: formState.inputs.schedule.value.map( (singleSchedule) => {
                    return {
                        name: singleSchedule.value.name.value,
                        startDate: singleSchedule.value.startDate.value,
                        startTime: singleSchedule.value.startTime.value,
                        endDate: singleSchedule.value.endDate.value,
                        endTime: singleSchedule.value.endTime.value,
                    }
                }),
                subEvents: formState.inputs.subEvents.value?.length > 0 ?
                    formState.inputs.subEvents.value.map( (selectedSubEvent) => { return selectedSubEvent.value }) : [],
                attendees: formState.inputs.attendees.value?.length > 0 ?
                    formState.inputs.attendees.value.map( (selectedAttendee) => { return selectedAttendee.value }) : [],
                skills: formState.inputs.skills?.value?.length > 0 ?
                    formState.inputs.skills.value.map( (selectOptionSkill) => { return selectOptionSkill.value }) : [],
                domains: formState.inputs.domains?.value?.length > 0 ?
                    formState.inputs.domains.value.map( (elem) => {
                        return {
                            domain: elem.value,
                            status: getDefaultCreateEntityStatus(auth.user)
                        }
                    })
                    : [],
                team:formState.inputs.team.value.map(function(singleMember){
                    return {
                        status: singleMember.status,
                        member: singleMember.value.member.value.value,
                        role: singleMember.value.role.value
                    }
                }),
                status: getDefaultCreateEntityStatus(auth.user),
            }
        };

        submitRequest(
            `/events/update`,
            'POST',
            JSON.stringify(formData)
        );
    }

    const title = (
        <>
            <Input 
                name="name"
                label={lang.eventName}
                className="col-12 col-md-6"
                formClassName="discrete-without-focus form-text-white h2"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />
        </>
    );
    const subtitle = (
        <>
            {/* alternateName */}
            <Input
                name="alternateName"
                label={lang.eventAlternateName}      
                formClassName="discrete-without-focus form-text-white h4"
                formTools={formTools}
            />
            {/* entityInCharge */}
            <Select2
                name="entityInCharge"
                label="Organisation en charge"
                formTools={formTools}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />
            {/* organizer */}
            <Select2
                name="organizer"
                label={lang.eventOrganizer}
                formTools={formTools}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />

        </>);
    const ctaHeaderSection = (
        <div className="d-flex align-items-end">
            <Link href={model.singleLink} >
                <button type="button" className="btn underlined-button text-white"><Icon iconName={"eye"} />&nbsp;{lang.capitalize("visualize")}</button>
            </Link>
            <Button disabled={!formState.isValid} onClick={submitHandler}><Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}</Button>
        </div>
    )
    
    const header = ( 
        <SingleBaseHeader
            className={"mode-update"}
            title={title} 
            subtitle={subtitle} 
            mainImage={currentMainImage}
            buttonSection={ctaHeaderSection}
            entity={model}
        >
            <MainImageDisplay mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
        </SingleBaseHeader>
    );

    const fullWidthContent = (
        <div>
            <div className="row">
                <div className="col col-md-6">
                    {/*startDate*/}
                        <div className="bg-greyBg col rounded-1 mb-2">
                            <div className="row py-1 px-2">
                                <Input
                                    className="col-12 col-lg-8"
                                    name="startDate"
                                    label={lang.startDate}
                                    type="date"
                                    formTools={formTools}
                                />
                                <Input
                                    className="col-12 col-lg-4"
                                    name="startTime"
                                    label={lang.startTime}
                                    type="time"
                                    formTools={formTools}
                                />
                            </div>
                        </div>

                        {/*endDate*/}
                        <div className="bg-greyBg col rounded-1">
                            <div className="row py-1 px-2">
                                <Input
                                    className="col-12 col-lg-8"
                                    name="endDate"
                                    label={lang.endDate}
                                    type="date"
                                    formTools={formTools}
                                />
                                <Input
                                    className="col-12 col-lg-4"
                                    name="endTime"
                                    label={lang.endTime}
                                    type="time"
                                    formTools={formTools}
                                />
                            </div>
                        </div>
                        
            
                </div>
                <div className="col col-md-6">

                    {/* experiences */}
                    {/*eventType*/}
                    <Select2
                        name="eventType"
                        className="my-1"
                        label={lang.selectEventType}
                        formTools={formTools}
                        creatable={false}
                        isMulti={true}
                        fetch={"/taxonomies/list"}
                        requestData={ {category: "eventType", name:""}}
                        searchField={"name"}
                        selectField={"name"}
                    />
                    <Input 
                        label="Lieu"
                        placeholder="Option bientôt disponible"
                        formTools={formTools}
                        name="location"
                        disabled={true}
                    />

                </div>

            </div>
            <div className="row">
                {/* Description */}
                <RichTextarea
                    className="mb-3 mt-2"
                    name="description"
                    label={lang.description}
                    formTools={formTools}
                />
            </div>
        </div>
    )


    const contentColumnLeft = (
        <>
            {/* schedule */}
            <UpdateSchedule
                name="schedule"
                label={lang.schedule}
                schedule={schedule?.length > 0 ? schedule.map( (elem, ind, arr) => {
                    if(elem.startDate)
                        elem.startDate = getDateFromIsoString(elem.startDate);
                    if(elem.endDate)
                        elem.endDate = getDateFromIsoString(elem.endDate);
                    return elem;
                }):[]}
                formTools={formTools}
            />
            {/* subEvents */}
            <Select2
                name="subEvents"
                className="my-1"
                label={lang.subEvents}
                formTools={formTools}
                creatable={false}
                isMulti={true}
                fetch={"/events/list"}
                requestData={ _id ? {_id:"ne:"+_id} : {}}
                searchField={"name"}
                selectField={"name"}
            />
            {/* attendees */}
            <Select2
                name="attendees"
                className="my-1"
                label={lang.attendees}
                formTools={formTools}
                creatable={false}
                isMulti={true}
                fetch={"/persons/list"}
                searchField={"firstName"}
                selectField={"fullname"}
            />

            {/* team */}
            <UpdateTeams
                name="team"
                formTools={formTools}
                parentEntity={data}
                label="Éditez vos membre d'équipe"
            />
            
        </>
    )

    const contentColumnRight = (
        <>
            <SingleInfo
                title={"Informations supplémentaires"}
                className="py-3"
            >
                {/* skills */}
                <Select2
                    name="skills"
                    label={lang.eventSkills}
                    formTools={formTools}
                    creatable={true}
                    isMulti={true}
                    requestData={{name:""}}
                    fetch={"/taxonomies/list"}
                    //requestData={}
                    searchField={"name"}
                    selectField={"name"}
                />
                {/* domains */}
                <Select2
                    name="domains"
                    label={lang.Domains}
                    formTools={formTools}
                    creatable={true}
                    isMulti={true}
                    fetch={"/taxonomies/list"}
                    requestData={{category:"domains", name:""}}
                    searchField={"name"}
                    selectField={"domains"}
                />
                {/* Url */}
                <Input
                    name="url"
                    label={lang.hyperlink}
                    type="url"
                    className="mb-3"
                    pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                    placeholder="Une url avec le https, exemple : https://siteWeb.com"
                    formTools={formTools}
                />
                {/* contactPoint */}
                <Input
                    className="mb-3"
                    name="contactPoint"
                    label={lang.projectContactPointLabel}
                    tip={{
                        header: lang.projectContactPointTipTitle,
                        body: lang.projectContactPointTipContent
                    }}
                    placeholder={lang.projectContactPointPlaceholder}
                    formTools={formTools}
                />
                </SingleInfo>
        </>
    )

    const footer = (
        <>
            <div className="border-top border-bottom pt-3">
                {
                    (createdAt || updatedAt || status) &&
                    <SingleEntityStatus createdAt={createdAt} updatedAt={updatedAt} status={status} />
                }
            </div>
        </>
    );

    return (
        <>
            <SingleBase
                //breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
            />
        </>
    )
}
export default EventSingleEdit;