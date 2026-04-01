import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";

//Context
import { useMessages } from "@/src/common/UserNotifications/Message/MessageProvider";

//Hooks
import { useAuth } from "@/auth/context/auth-context";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { useRootModal } from "@/src/hooks/useModal/useRootModal";

//Component
import Select2 from "@/src/common/FormElements/Select2/Select2";
import Input from "@/src/common/FormElements/Input/Input";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";
import { getDefaultUpdateEntityMeta } from "@/src/DataTypes/Meta/EntityMeta";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { SingleEntityMeta } from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import UpdateSkillGroup from "@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup";
import UpdateTeams from "../UpdateTeams/UpdateTeams";
import UpdateEquipment from "@/src/DataTypes/Equipment/components/layouts/UpdateEquipment/UpdateEquipment";
import UpdateSocialHandles from "@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles";
import SingleSaveEntityReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder";
import UpdateContactPoint from "@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint";
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import SingleBaseCTA from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseCTA";

//Utils
import SingleBeforeUnloadReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleBeforeUnloadReminder";
import Organisation from "@/src/DataTypes/Organisation/models/Organisation";
import { replacePathname } from "@/src/helpers/url";
import { lang, modes } from "@/src/common/Data/GlobalConstants";
import { TYPE_PLACE, TYPE_TAXONOMY } from "@/src/DataTypes/Entity/Types";
import { apiDateToDateInput, dateTimeStringToUTC } from "@/common/DateManager/Parse";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import { ShortDescription } from "@/src/DataTypes/common/layouts/ShortDescription/ShortDescription";

const OrganisationSingleEdit = (props) => {
    //Organisation data extract
    const {
        _id,
        name,
        description,
        url,
        contactPoint,
        fondationDate = null,
        offers,
        domains,
        team,
        mainImage,
        slug,
        equipment,
        catchphrase,
        meta,
        location,
        type,
        createdAt,
        updatedAt,
    } = Object(props.data);

    //  Model de project
    let model = new Organisation(props.data);
    /*
     *  1. Change the link getter in ctaHeaderSection components.
     *  1.1 Change the button save and visualize.
     *  2. Add states setter
     *  2.1 Change the const to let for model.
     *  3. Pass new params to components.
     *  4. Test
     *  5. redo
     */

    //  STATES change that to a context ?

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback(
        (rawData) => {
            model = new Organisation(rawData);
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

    const breadcrumbLabels = {
        contribuer: lang.menuContributeLabel,
        organisations: lang.Organisations,
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

    //Modal hook
    const modalSaveEntityReminder = useRootModal();

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context
    const msg = useMessages(); //useContext(MessageContext);

    //Save intention for SingleBeforeUnloadReminder
    const [saveIntentionState, setSaveIntentionState] = useState(false);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: name ?? "",
                isValid: false,
                invalidMsg: "Nom de l'organisation",
            },
            description: {
                value: description ?? "",
                isValid: true,
            },
            shortDescription: {
                value: model.shortDescription ?? "",
                isValid: true,
            },
            url: {
                value: url ?? [],
                isValid: true,
                invalidMsg: "Liens externes",
            },
            contactPoint: {
                value: contactPoint ?? {
                    tel: { num: "", ext: "" },
                    email: { address: "" },
                    website: { url: "" },
                },
                isValid: true,
            },
            fondationDate: {
                value: fondationDate ? apiDateToDateInput(fondationDate) : "",
                isValid: true,
            },
            catchphrase: {
                value: catchphrase ?? "",
                isValid: true,
            },
            offers: {
                value: offers ?? [],
                isValid: true,
                invalidMsg: "Offres de service",
            },
            domains: {
                value: domains ?? [],
                isValid: true,
            },
            team: {
                value: team ?? [],
                isValid: true,
            },
            location: {
                value: location ?? [],
                isValid: true,
            },
            equipment: {
                value: equipment ?? [],
                isValid: true,
            },
            region: {
                value: model.region ?? "",
                isValid: true,
            },
        },
        {
            displayResMessage: true, //Display a message to the user to confirm the succes
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

    //Function to submit the form
    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = {
            data: {
                name: formState.inputs.name.value,
                description: formState.inputs.description.value,
                shortDescription: formState.inputs.shortDescription.value,
                url: formState.inputs.url.value.map(function (singleUrl) {
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order: singleUrl.order },
                    };
                }),
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: dateTimeStringToUTC(formState.inputs.fondationDate.value),
                offers: formState.inputs.offers.value.map(function (singleOffer) {
                    return {
                        groupName: singleOffer.value.groupName.value,
                        skills: singleOffer.value.skills.value.map((skill) => {
                            return skill.value;
                        }),
                        subMeta: { order: singleOffer.order },
                    };
                }),
                catchphrase: formState.inputs.catchphrase.value,
                domains:
                    formState.inputs.domains?.value?.length > 0
                        ? formState.inputs.domains.value.map((elem) => {
                              return {
                                  domain: elem.value,
                              };
                          })
                        : [],
                equipment: formState.inputs.equipment.value.map((elem) => {
                    return {
                        equipment: elem.value.equipment.value.value,
                        qty: parseInt(elem.value.qty.value),
                        subMeta: { order: elem.order },
                    };
                }),
                team: formState.inputs.team.value.map(function (singleTeam) {
                    return {
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value,
                        subMeta: { order: singleTeam.order },
                    };
                }),
                location:
                    formState.inputs.location?.value?.length > 0
                        ? formState.inputs.location.value.map(function (singlePlace) {
                              return singlePlace.value;
                          })
                        : [],
                region:
                    formState.inputs.region.value && formState.inputs.region.value !== ""
                        ? formState.inputs.region.value
                        : "",
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            },
        };

        if (_id !== undefined) {
            formData.data.id = _id;
            submitRequest(`/organisations/update`, "POST", JSON.stringify(formData));
        } else {
            submitRequest(`/organisations/create`, "POST", JSON.stringify(formData));
        }
    };

    /*****************************
     *  Sections
     ***************************/

    const title = (
        <Input
            name="name"
            placeholder="Nom de l'organisation"
            label={"Nom de l'organisation" + lang.required}
            formClassName="discrete-without-focus form-text-white"
            validationRules={[{ name: "REQUIRED" }, { name: "MIN_LENGTH", specification: 2 }]}
            formTools={formTools}
        />
    );

    const subtitle = (
        <Input
            name="catchphrase"
            formClassName="discrete-without-focus form-text-white"
            label={lang.catchphrase}
            formTools={formTools}
        />
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
        <SingleInfo title={lang.about} classNameTitle="mb-0" noCardLayout>
            <RichTextarea className="py-3" name="description" formTools={formTools} />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <>
            <SingleInfo title={lang.organisationOffer}>
                <UpdateSkillGroup
                    parentEntity={props.data}
                    formTools={formTools}
                    name="offers"
                    labelInput={lang.organisationSkills}
                    labelSelect={lang.organisationSkillsAssociated}
                />
            </SingleInfo>

            {/* team */}
            <SingleInfo title="Membres de l'équipe">
                <UpdateTeams name="team" formTools={formTools} parentEntity={props.data} />
            </SingleInfo>
            {/* Equipment */}
            <SingleInfo title={lang.EquipmentsOwned}>
                <UpdateEquipment name="equipment" formTools={formTools} parentEntity={props.data} />
            </SingleInfo>
        </>
    );

    const contentColumnRight = (
        <>
            <SingleInfo title={lang.contactInformations}>
                <UpdateContactPoint formTools={formTools} name="contactPoint" model={model} />
            </SingleInfo>

            <SingleInfo title="Informations supplémentaires">
                <SelectFetch
                    name="region"
                    label="Faites-vous partie du Croissant boréal?"
                    formTools={formTools}
                    noValueText="Choisissez une région"
                    fetchOption="region-enum"
                    tip={{
                        header: "Badge",
                        body: "Ce champs permet d'obtenir le badge 'Croissant boréal' qui indique que vous faites partie de celui-ci.",
                    }}
                />

                <Select2
                    name="location"
                    label={lang.location}
                    formTools={formTools}
                    creatable={true}
                    modalType={TYPE_PLACE}
                    isMulti={true}
                    fetch={"/places/list"}
                    searchField={["address", "name"]}
                    //selectField={"address"}
                />

                <Select2
                    name="domains"
                    label={lang.Domains}
                    formTools={formTools}
                    creatable={true}
                    modalType={TYPE_TAXONOMY}
                    allowedCategories={["domains"]}
                    isMulti={true}
                    placeholder={lang.domainsInputPlaceholder}
                    fetch={"/taxonomies/list"}
                    requestData={{ category: "domains", name: "" }}
                    searchField={"name"}
                    selectField={"domains"}
                />

                <Input name="fondationDate" label="Date de fondation" type="date" formTools={formTools} />

                <SingleInfo title={lang.externalLinks} isSubtitle noCardLayout>
                    {/* Url */}
                    <UpdateSocialHandles name="url" label={lang.url} parentEntity={model} formTools={formTools} />
                </SingleInfo>
            </SingleInfo>
        </>
    );

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
export default OrganisationSingleEdit;
