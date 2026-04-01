//React
import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";

//hooks
import { useRootModal } from "@/src/hooks/useModal/useRootModal";

//Utils, context
import { useAuth } from "@/src/authentification/context/auth-context";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { lang, modes } from "@/src/common/Data/GlobalConstants";
import { getDefaultUpdateEntityMeta } from "@/src/DataTypes/Meta/EntityMeta";
import { replacePathname } from "@/src/helpers/url";
import { SingleEntityMeta } from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import SingleBeforeUnloadReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleBeforeUnloadReminder";

//Component
import Event from "@/src/DataTypes/Event/models/Event";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import Input from "@/src/common/FormElements/Input/Input";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";
import UpdateSchedule from "../../Forms/Schedule/UpdateSchedule";
import UpdateTeams from "@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams";
import { TYPE_PLACE, TYPE_TAXONOMY } from "@/src/DataTypes/Entity/Types";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import { apiDateToDateInput, apiDateToTimeInput, dateTimeStringToUTC } from "@/common/DateManager/Parse";
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import UpdateSocialHandles from "@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles";
import SingleSaveEntityReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder";
import UpdateContactPoint from "@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint";
import SingleBaseCTA from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseCTA";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";
import { ShortDescription } from "@/src/DataTypes/common/layouts/ShortDescription/ShortDescription";

const EventSingleEdit = ({ data }, ...props) => {
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
        updatedAt,
    } = data;

    let model = new Event(data);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context
    const msg = useMessages();

    //Save intention for SingleBeforeUnloadReminder
    const [saveIntentionState, setSaveIntentionState] = useState(false);

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    //Modal hook
    const modalSaveEntityReminder = useRootModal();

    const updateEntityModel = useCallback(
        (rawData) => {
            model = new Event(rawData);
            setCurrentMainImage(model.mainImage);
        },
        [setCurrentModel]
    );

    const updateModelMainImage = useCallback(
        (mainImage) => {
            setCurrentMainImage(mainImage);
            model.mainImage = mainImage;
            setCurrentModel(model);
        },
        [setCurrentModel]
    );

    const combineDateAndTime = (date, time) => {
        return dateTimeStringToUTC(`${date} ${time}`);
    };

    //Main form functionalities
    const { submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: name ?? "",
                isValid: false,
                invalidMsg: "Nom de l'événement",
            },
            alternateName: {
                value: alternateName ?? "",
                isValid: false,
            },
            url: {
                value: url ?? [],
                isValid: true,
            },
            description: {
                value: description ?? "",
                isValid: true,
            },
            shortDescription: {
                value: model.shortDescription ?? "",
                isValid: true,
            },
            entityInCharge: {
                value: entityInCharge ?? "",
                isValid: true,
            },
            organizer: {
                value: organizer ?? "",
                isValid: true,
            },
            eventType: {
                value: eventType ?? undefined,
                isValid: true,
            },
            eventFormat: {
                value: eventFormat ?? "",
                isValid: true,
            },
            team: {
                value: team ?? [],
                isValid: true,
            },
            startDate: {
                value: startDate ? apiDateToDateInput(startDate) : "",
                isValid: true,
            },
            startTime: {
                value: startDate ? apiDateToTimeInput(startDate) : "",
                isValid: true,
            },
            endDate: {
                value: endDate ? apiDateToDateInput(endDate) : "",
                isValid: true,
            },
            endTime: {
                value: endDate ? apiDateToTimeInput(endDate) : "",
                isValid: true,
            },
            contactPoint: {
                value: contactPoint ?? {
                    tel: { num: "", ext: "" },
                    email: { address: "" },
                    website: { url: "" },
                },
                isValid: true,
            },
            attendees: {
                value: attendees ?? [],
                isValid: true,
            },
            skills: {
                value: skills ?? [],
                isValid: true,
            },
            domains: {
                value: domains ?? [],
                isValid: true,
            },
            //Commented for populate loop trouble
            /* subEvents: {
                value: subEvents ?? [],
                isValid: true
            }, */
            location: {
                value: location ? location : [],
                isValid: true,
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,
            callbackFunction: (response) => {
                Router.push(
                    "/" +
                        replacePathname(model.singleRoute.pathname, {
                            slug: response.data.slug,
                        })
                );
            },
        }
    );

    // Save current events dates and time into field to help the user managing and adding multiple schedule step.

    //react when the form's state change, to adjust the form accordingly to the dates.
    useEffect(() => {
        updateCurrentEventDateTime();
    }, [formState]);

    //set a st

    const [currentEventDateTime, setCurrentEventDateTime] = useState({
        startDate: startDate, //startDate
        endDate: endDate,
        startTime: "00:00", //startDate
        endTime: "00:00",
    });

    const updateCurrentEventDateTime = () => {
        setCurrentEventDateTime({
            startDate: formState.inputs.startDate.value,
            endDate: formState.inputs.endDate.value,
            startTime: formState.inputs.startTime.value,
            endTime: formState.inputs.endTime.value,
        });
    };

    //Submit the form
    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = {
            data: {
                name: formState.inputs.name.value,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge.value?.value ?? null,
                organizer: formState.inputs.organizer.value?.value ?? null,
                description: formState.inputs.description.value,
                shortDescription: formState.inputs.shortDescription.value,
                eventType:
                    formState.inputs.eventType.value?.length > 0
                        ? formState.inputs.eventType.value.map((selectedEventType) => {
                              return selectedEventType.value;
                          })
                        : [],
                eventFormat:
                    formState.inputs.eventFormat.value && formState.inputs.eventFormat.value !== ""
                        ? formState.inputs.eventFormat.value
                        : "",
                startDate: combineDateAndTime(formState.inputs.startDate.value, formState.inputs.startTime.value),
                endDate: combineDateAndTime(formState.inputs.endDate.value, formState.inputs.endTime.value),
                url: formState.inputs.url.value.map(function (singleUrl) {
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order: singleUrl.order },
                    };
                }),
                contactPoint: formState.inputs.contactPoint.value,
                schedule: formState.inputs.schedule.value.map((singleSchedule) => {
                    return {
                        name: singleSchedule.value.name.value,
                        startDate: combineDateAndTime(
                            singleSchedule.value.startDate.value,
                            singleSchedule.value.startTime.value
                        ),
                        startTime: singleSchedule.value.startTime.value,
                        endDate: combineDateAndTime(
                            singleSchedule.value.endDate.value,
                            singleSchedule.value.endTime.value
                        ),
                        endTime: singleSchedule.value.endTime.value,
                        subMeta: { order: singleSchedule.order },
                    };
                }),
                //Commented for populate loop trouble
                //subEvents: formState.inputs.subEvents.value?.length > 0 ?
                //formState.inputs.subEvents.value.map( (selectedSubEvent) => { return selectedSubEvent.value }) : [],
                attendees:
                    formState.inputs.attendees.value?.length > 0
                        ? formState.inputs.attendees.value.map((selectedAttendee) => {
                              return selectedAttendee.value;
                          })
                        : [],
                skills:
                    formState.inputs.skills?.value?.length > 0
                        ? formState.inputs.skills.value.map((selectOptionSkill) => {
                              return selectOptionSkill.value;
                          })
                        : [],
                domains:
                    formState.inputs.domains?.value?.length > 0
                        ? formState.inputs.domains.value.map((elem) => {
                              return {
                                  domain: elem.value,
                              };
                          })
                        : [],
                team: formState.inputs.team.value.map(function (singleMember) {
                    return {
                        member: singleMember.value.member.value.value,
                        role: singleMember.value.role.value,
                        subMeta: { order: singleMember.order },
                    };
                }),
                location:
                    formState.inputs.location?.value?.length > 0
                        ? formState.inputs.location.value.map(function (singlePlace) {
                              return singlePlace.value;
                          })
                        : [],
                //Temporary set the input in name field until we have a more elaborated structure for location
                //location: [{ name: formState.inputs.location.value}],
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            },
        };

        if (_id !== undefined) {
            formData.data.id = _id;
            submitRequest(`/events/update`, "POST", JSON.stringify(formData));
        } else {
            submitRequest(`/events/create`, "POST", JSON.stringify(formData));
        }
    };

    /* Needed for breadCrumb generator */
    const breadcrumbLabels = {
        contribuer: lang.menuContributeLabel,
        evenements: lang.Events,
        slug: `${model.name ?? "-"}`,
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    };

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes);
    }, [model.title]);

    const title = (
        <>
            <Input
                name="name"
                label={lang.eventName + lang.required}
                className="col-12 col-md-6"
                formClassName="discrete-without-focus form-text-white"
                validationRules={[{ name: "REQUIRED" }, { name: "MIN_LENGTH", specification: 2 }]}
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
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
            />

            <div className="container mt-3">
                <div className="row gap-2">
                    {/*startDate*/}
                    <div
                        style={{ backgroundColor: "#4f4f4f1c" }}
                        className="col-12 col-sm-5 col-lg-4  rounded-1 mb-2 px-2 py-2 "
                    >
                        <h5 className="m-0 mb-1 text-dark-light">Début</h5>
                        <div className="row p-0">
                            <Input
                                className="col-7"
                                formClassName="discrete-without-focus form-text-white "
                                name="startDate"
                                label={lang.date + lang.required}
                                type="date"
                                formTools={formTools}
                                validationRules={[{ name: "REQUIRED" }]}
                            />
                            <Input
                                className="col-5"
                                formClassName="discrete-without-focus form-text-white "
                                name="startTime"
                                label={lang.hour}
                                type="time"
                                formTools={formTools}
                            />
                        </div>
                    </div>

                    {/*endDate*/}
                    <div
                        style={{ backgroundColor: "#4f4f4f1c" }}
                        className="col-12 col-sm-5 col-lg-4 rounded-1 mb-2 px-2 py-2"
                    >
                        <h5 className="m-0 mb-1 text-dark-light">Fin</h5>
                        <div className="row p-0">
                            <Input
                                name="endDate"
                                className="col-7"
                                formClassName="discrete-without-focus form-text-white "
                                label={lang.date + lang.required}
                                type="date"
                                formTools={formTools}
                                validationRules={[
                                    { name: "REQUIRED" },
                                    {
                                        name: "HIGHER_DATE_REQUIRED",
                                        dependencies: [
                                            {
                                                value: (state) => state.inputs["startDate"].value,
                                                listenerValue: (state) => state.inputs["startDate"].value,
                                            },
                                        ],
                                    },
                                ]}
                            />
                            <Input
                                className="col-5"
                                formClassName="discrete-without-focus form-text-white "
                                name="endTime"
                                label={lang.hour}
                                type="time"
                                formTools={formTools}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const ctaSection = (
        <SingleBaseCTA
            formTools={formTools}
            mainImage={currentMainImage}
            model={model}
            mainImageSetter={updateModelMainImage}
            saveEntityReminderModal={modalSaveEntityReminder}
            saveIntentionSetter={setSaveIntentionState}
        />
    );

    const header = (
        <SingleBaseHeader
            className={"mode-update"}
            title={title}
            subtitle={subtitle}
            mainImage={currentMainImage}
            entity={model}
            mode={modes.CONTRIBUTING}
            ctaSection={ctaSection}
        />
    );

    const fullWidthContent = (
        <div>
            <div className="row">
                <div className="col col-md-6">
                    <SingleInfo title="Organisations responsables">
                        <SingleInfo title={lang.entityInCharge} isSubtitle noCardLayout>
                            {/* entityInCharge */}
                            <Select2
                                name="entityInCharge"
                                formTools={formTools}
                                creatable={false}
                                isMulti={false}
                                fetch={"/organisations/list"}
                                searchField={"name"}
                                selectField={"name"}
                            />
                        </SingleInfo>
                        <SingleInfo title={lang.producer} isSubtitle noCardLayout>
                            {/* organizer */}
                            <Select2
                                name="organizer"
                                formTools={formTools}
                                creatable={false}
                                isMulti={false}
                                fetch={"/organisations/list"}
                                searchField={"name"}
                                selectField={"name"}
                            />
                        </SingleInfo>
                    </SingleInfo>
                </div>
                <div className="col col-md-6">
                    {/* location */}
                    <SingleInfo title={lang.location}>
                        <Select2
                            name="location"
                            formTools={formTools}
                            creatable={true}
                            modalType={TYPE_PLACE}
                            isMulti={true}
                            fetch={"/places/list"}
                            requestData={{ address: "" }}
                            searchField={"address"}
                        />
                    </SingleInfo>
                </div>
            </div>
            <div className="row">
                <SingleInfo title={lang.about} className={"col"}>
                    {/* Description */}
                    <RichTextarea
                        name="description"
                        //label={lang.description}
                        formTools={formTools}
                    />
                </SingleInfo>
            </div>
        </div>
    );

    const contentColumnLeft = (
        <>
            {/* schedule */}
            <SingleInfo title={lang.schedule}>
                <UpdateSchedule
                    name="schedule"
                    minDate={currentEventDateTime.startDate}
                    maxDate={currentEventDateTime.endDate}
                    minTime={currentEventDateTime.startTime}
                    maxTime={currentEventDateTime.endTime}
                    schedule={
                        schedule?.length > 0
                            ? schedule.map((elem, ind, arr) => {
                                  if (elem.startDate) elem.startDate = apiDateToDateInput(elem.startDate); //getDateFromIsoString(elem.startDate);
                                  if (elem.endDate) elem.endDate = apiDateToDateInput(elem.endDate); //getDateFromIsoString(elem.endDate);
                                  return elem;
                              })
                            : []
                    }
                    formTools={formTools}
                    description={lang.scheduleFieldDescription}
                />
            </SingleInfo>

            {/* subEvents */}
            {
                //Commented for populate loop trouble
                /*
                <SingleInfo 
                    title={lang.subEvents}
                >
                    <Select2
                        name="subEvents"
                        className="my-2"
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_EVENT}
                        isMulti={true}
                        fetch={"/events/list"}
                        requestData={ _id ? {_id:"ne:"+_id} : {}}
                        searchField={"name"}
                        selectField={"name"}
                    />
                </SingleInfo>
                */
            }

            {/* team */}
            <SingleInfo title={lang.teamMembers}>
                <UpdateTeams name="team" formTools={formTools} parentEntity={data} label="Éditez vos membre d'équipe" />
            </SingleInfo>

            {/* attendees */}
            <SingleInfo title={lang.attendees}>
                {/* attendees */}
                <Select2
                    name="attendees"
                    className="my-2"
                    formTools={formTools}
                    creatable={false}
                    isMulti={true}
                    fetch={"/persons/list"}
                    searchField={"firstName"}
                    selectField={"fullname"}
                />
            </SingleInfo>
        </>
    );

    const contentColumnRight = (
        <>
            <SingleInfo title={lang.contactInformations}>
                <UpdateContactPoint formTools={formTools} name="contactPoint" model={model} />
            </SingleInfo>
            <SingleInfo title={"Informations supplémentaires"} className="py-3">
                {/* skills */}
                <SingleInfo title={lang.skillsAndTechnologies} isSubtitle noCardLayout>
                    <Select2
                        name="skills"
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_TAXONOMY}
                        allowedCategories={["skills", "technologies"]}
                        isMulti={true}
                        requestData={{ name: "" }}
                        fetch={"/taxonomies/group/skills"}
                        //requestData={}
                        searchField={"name"}
                        selectField={"name"}
                    />
                </SingleInfo>

                {/* domains */}
                <SingleInfo title={lang.Domains} isSubtitle noCardLayout>
                    <Select2
                        name="domains"
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_TAXONOMY}
                        allowedCategories={["domains"]}
                        isMulti={true}
                        fetch={"/taxonomies/list"}
                        requestData={{ category: "domains", name: "" }}
                        searchField={"name"}
                        selectField={"domains"}
                    />
                </SingleInfo>

                {/* Url */}
                <SingleInfo title={lang.externalLinks} isSubtitle noCardLayout>
                    <UpdateSocialHandles
                        name="url"
                        //label={lang.url}
                        parentEntity={model}
                        formTools={formTools}
                    />
                </SingleInfo>

                {/*eventType */}
                <SingleInfo isSubtitle title={lang.selectEventType} noCardLayout>
                    <Select2
                        name="eventType"
                        formTools={formTools}
                        creatable={false}
                        isMulti={true}
                        fetch={"/taxonomies/list"}
                        requestData={{ category: "eventType", name: "" }}
                        searchField={"name"}
                        selectField={"name"}
                    />
                </SingleInfo>

                {/* eventFormat */}
                <SingleInfo isSubtitle title={lang.eventFormat} noCardLayout>
                    <SelectFetch
                        name="eventFormat"
                        formTools={formTools}
                        noValueText={lang.noSelectedOption}
                        fetchOption="eventformat-enum"
                    />
                </SingleInfo>
                {/* photoGallery 
                <CreatePhotoGallery
                    entity={model}
                />
                */}
            </SingleInfo>
        </>
    );

    {
        /*********** Footer section ***********/
    }
    const Footer = (
        <>
            <SingleInfo title={lang.seoSection}>
                <ShortDescription formTools={formTools} name="shortDescription" />
            </SingleInfo>
            {(createdAt || updatedAt || meta) && (
                <SingleInfo title={lang.entityMetadata} className="pt-3">
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
                </SingleInfo>
            )}
        </>
    );

    {
        /*********** Submit section ***********/
    }
    const SinglePageBottom = (
        <SubmitEntity
            submitHandler={() => {
                setSaveIntentionState(true);
                modalSaveEntityReminder.displayModal();
            }}
            formTools={formTools}
            singleLink={model.singleLink}
        />
    );

    return (
        <>
            <SingleBeforeUnloadReminder formTools={formTools} saveIntention={saveIntentionState} />
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                footer={Footer}
                singlePageBottom={SinglePageBottom}
                model={model}
                editMode
            />
            <modalSaveEntityReminder.Modal>
                <SingleSaveEntityReminder
                    submitHandler={submitHandler}
                    closeModal={() => {
                        modalSaveEntityReminder.closeModal();
                        setSaveIntentionState(false);
                    }}
                />
            </modalSaveEntityReminder.Modal>
        </>
    );
};
export default EventSingleEdit;
