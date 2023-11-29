//React
import React, {useCallback, useContext, useEffect, useState} from "react";
import Router from "next/router";

//Utils, context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";
import {useFormUtils} from "@/src/hooks/useFormUtils/useFormUtils";
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import {replacePathname} from "@/src/helpers/url";
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta';


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
import {TYPE_EVENT, TYPE_PLACE, TYPE_TAXONOMY} from "@/src/DataTypes/Entity/Types";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import CreatePhotoGallery from "@/src/DataTypes/Media/components/forms/CreatePhotoGallery/CreatePhotoGallery";
import {apiDateToDateInput, apiDateToTimeInput, dateTimeStringToUTC} from "@/common/DateManager/Parse";
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";

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
        eventFormat,
        team,
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

    let model = new Event(data);

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

    const combineDateAndTime = (date, time) => {
        return dateTimeStringToUTC(`${date} ${time}`);
    }

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
            eventFormat: {
                value: eventFormat ?? "",
                isValid: true
            },
            team: {
                value: team ?? [],
                isValid: true
            },
            startDate: {
                value: startDate ? apiDateToDateInput(startDate) : "",
                isValid: true
            },
            startTime: {
                value: startDate ? apiDateToTimeInput(startDate) : "",
                isValid: true
            },
            endDate: {
                value: endDate ? apiDateToDateInput(endDate) : "",
                isValid: true
            },
            endTime: {
                value: endDate ? apiDateToTimeInput(endDate) : "",
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
            },
            location: {
                value: location ? location : [],
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


    // Save current events dates and time into field to help the user managing and adding multiple schedule step.

    //react when the form's state change, to adjust the form accordingly to the dates.
    useEffect(() => {
        updateCurrentEventDateTime();
    }, [formState]);

    //set a st

    const [currentEventDateTime, setCurrentEventDateTime] = useState({
        startDate: startDate,//startDate
        endDate: endDate,
        startTime: '00:00',//startDate
        endTime: '00:00',
    });

    const updateCurrentEventDateTime =() => {
        setCurrentEventDateTime({
            startDate: formState.inputs.startDate.value,
            endDate: formState.inputs.endDate.value,
            startTime: formState.inputs.startTime.value,
            endTime: formState.inputs.endTime.value
        });
    };

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            data: {
                id: _id,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge.value?.value ?? undefined,
                organizer: formState.inputs.organizer.value?.value ?? undefined,
                description: formState.inputs.description.value,
                eventType: formState.inputs.eventType.value?.length > 0 ?
                    formState.inputs.eventType.value.map( (selectedEventType) => { return selectedEventType.value }) : [],
                eventFormat: formState.inputs.eventFormat.value && formState.inputs.eventFormat.value !== "" ? formState.inputs.eventFormat.value : "",
                startDate: combineDateAndTime(formState.inputs.startDate.value, formState.inputs.startTime.value),
                endDate: combineDateAndTime(formState.inputs.endDate.value, formState.inputs.endTime.value),
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                schedule: formState.inputs.schedule.value.map( singleSchedule => {
                    return {
                        name: singleSchedule.value.name.value,
                        startDate: combineDateAndTime(singleSchedule.value.startDate.value, singleSchedule.value.startTime.value),
                        startTime: singleSchedule.value.startTime.value,
                        endDate: combineDateAndTime(singleSchedule.value.endDate.value, singleSchedule.value.endTime.value),
                        endTime: singleSchedule.value.endTime.value,
                        subMeta: { order: singleSchedule.order }
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
                        }
                    })
                    : [],
                team:formState.inputs.team.value.map(function(singleMember){
                    return {
                        member: singleMember.value.member.value.value,
                        role: singleMember.value.role.value,
                        subMeta: { order: singleMember.order }
                    }
                }),
                location: formState.inputs.location?.value?.length > 0 ?
                    formState.inputs.location.value.map(function(singlePlace){
                        return singlePlace.value
                    })
                    :[],
                //Temporary set the input in name field until we have a more elaborated structure for location
                //location: [{ name: formState.inputs.location.value}],
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            }
        };

        submitRequest(
            `/events/update`,
            'POST',
            JSON.stringify(formData)
        );
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "evenements": lang.Events,
            "slug": `${model.name ?? '-'}`
        }[param];
    }, []);

    const breadCrumb = {
        route: model.singleEditRoute,
        getLabelGenerator: getLabelGenerator
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
                                    validationRules={[
                                        {name: "HIGHER_DATE_REQUIRED", dependencies: [
                                            {value: state => state.inputs["startDate"].value, listenerValue: state => state.inputs["startDate"].value}
                                        ]}
                                    ]}
                                    
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

                    {/* eventType */}
                    <Select2
                        name="eventType"
                        className="my-1"
                        label={lang.selectEventType}
                        formTools={formTools}
                        creatable={false}
                        isMulti={true}
                        fetch={"/taxonomies/list"}
                        requestData={{category: "eventType", name:""}}
                        searchField={"name"}
                        selectField={"name"}
                    />

                    {/* eventFormat */}
                    <SelectFetch 
                        name="eventFormat"
                        label="Choisissez un format"
                        className="my-1"
                        formTools={formTools}
                        noValueText={lang.noSelectedOption}
                        fetchOption="eventformat-enum"
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                    />
                    
                    {/* location */}
                    <Select2
                        name="location"
                        label={"Emplacement (par adresse)"}//lang.location}
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_PLACE}
                        isMulti={true}
                        
                        fetch={"/places/list"}
                        requestData={{address:""}}
                        searchField={"address"}
                        //selectField={"address"}
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
                minDate={currentEventDateTime.startDate}
                maxDate={currentEventDateTime.endDate}
                minTime={currentEventDateTime.startTime}
                maxTime={currentEventDateTime.endTime}
                schedule={schedule?.length > 0 ? schedule.map( (elem, ind, arr) => {
                    if(elem.startDate)
                        elem.startDate = apiDateToDateInput(elem.startDate);//getDateFromIsoString(elem.startDate);
                    if(elem.endDate)
                        elem.endDate = apiDateToDateInput(elem.endDate);//getDateFromIsoString(elem.endDate);
                    return elem;
                }):[]}
                formTools={formTools}
                description={lang.scheduleFieldDescription}
            />

            {/* subEvents */}
            <Select2
                name="subEvents"
                className="my-2"
                label={lang.subEvents}
                formTools={formTools}
                creatable={true}
                modalType={TYPE_EVENT}
                isMulti={true}
                fetch={"/events/list"}
                requestData={ _id ? {_id:"ne:"+_id} : {}}
                searchField={"name"}
                selectField={"name"}
            />
            {/* attendees */}
            <Select2
                name="attendees"
                className="my-2"
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
                    modalType={TYPE_TAXONOMY}
                    isMulti={true}
                    requestData={{name:""}}
                    fetch={"/taxonomies/group/skills"}
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
                    modalType={TYPE_TAXONOMY}
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
                {/* photoGallery */}
                <CreatePhotoGallery
                    entity={model}
                />
                </SingleInfo>
        </>
    )

    const footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
            }
        </>
    );

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={footer}
            />

            <SubmitEntity submitHandler={submitHandler} formState={formState} />
        </>
    )
}
export default EventSingleEdit;