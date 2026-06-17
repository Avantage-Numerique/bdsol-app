import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";

//Custom hooks
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { useRootModal } from "@/src/hooks/useModal/useRootModal";
import SingleBeforeUnloadReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleBeforeUnloadReminder";

//components
import Input from "@/FormElements/Input/Input";
import RichTextarea from "@/FormElements/RichTextArea/RichTextarea";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import { SingleEntityMeta } from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleSaveEntityReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder";
import UpdateSocialHandles from "@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import { lang, modes } from "@/src/common/Data/GlobalConstants";

//FormData
import { getDefaultUpdateEntityMeta } from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import UpdateSkillGroup from "@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup";
import Person from "@/DataTypes/Person/models/Person";
import { replacePathname } from "@/src/helpers/url";
import { TYPE_TAXONOMY } from "@/src/DataTypes/Entity/Types";
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import UpdateContactPoint from "@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint";
import SingleBaseCTA from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseCTA";

import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";
import SelectFetch from "@/src/common/FormElements/Select/SelectFetch";
import { ShortDescription } from "@/src/DataTypes/common/layouts/ShortDescription/ShortDescription";
import UpdateSameAs from "@/src/DataTypes/common/Forms/UpdateSameAs/UpdateSameAs";

const PersonSingleEdit = ({ positiveRequestActions, ...props }) => {
    //Person data extract
    const { _id, meta, createdAt, updatedAt } = props.data;

    //Model de project
    let model = new Person(props.data);

    //  STATES
    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback(
        (rawData) => {
            model = new Person(rawData);
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

    //Modal hook
    const modalSaveEntityReminder = useRootModal();

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context
    const msg = useMessages();

    //Save intention for SingleBeforeUnloadReminder
    const [saveIntentionState, setSaveIntentionState] = useState(false);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            firstName: {
                value: model.firstName ?? "",
                isValid: false,
            },
            lastName: {
                value: model.lastName ?? "",
                isValid: false,
            },
            nickName: {
                value: model.nickname ?? "",
                isValid: true,
            },
            description: {
                value: model.description ?? "",
                isValid: true,
            },
            shortDescription: {
                value: model.shortDescription ?? "",
                isValid: true,
            },
            catchphrase: {
                value: model.catchphrase ?? "",
                isValid: true,
            },
            occupations: {
                value: model.occupations ?? [],
                isValid: true,
                invalidMsg: "Compétences et technologies",
            },
            domains: {
                value: model.domains ?? [],
                isValid: true,
            },
            contactPoint: {
                value: model?.contactPoint ?? {
                    tel: { num: "", ext: "" },
                    email: { address: "" },
                    website: { url: "" },
                },
                isValid: true,
            },
            url: {
                value: model?.url ?? [],
                isValid: true,
                invalidMsg: "Liens externes",
            },
            region: {
                value: model?.region ?? "",
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

    //Submit the form
    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = {
            data: {
                lastName: formState.inputs.lastName.value,
                firstName: formState.inputs.firstName.value,
                nickname: formState.inputs.nickName.value,
                description: formState.inputs.description.value,
                shortDescription: formState.inputs.shortDescription.value,
                catchphrase: formState.inputs.catchphrase.value,
                occupations: formState.inputs.occupations.value.map(function (singleOccupation) {
                    return {
                        groupName: singleOccupation.value.groupName.value,
                        skills: singleOccupation.value.skills.value.map((skill) => {
                            return skill.value;
                        }),
                        subMeta: { order: singleOccupation.order },
                    };
                }),
                domains:
                    formState.inputs.domains?.value?.length > 0
                        ? formState.inputs.domains.value.map((elem) => {
                              if (elem !== undefined) {
                                  return {
                                      domain: elem.value,
                                  };
                              }
                              return {};
                          })
                        : [],
                contactPoint: formState.inputs.contactPoint.value,
                url: formState.inputs.url.value.map(function (singleUrl) {
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order: singleUrl.order },
                    };
                }),
                region:
                    formState.inputs.region.value && formState.inputs.region.value !== ""
                        ? formState.inputs.region.value
                        : "",
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            },
        };

        if (_id !== undefined) {
            formData.data.id = _id;
            submitRequest(`/persons/update`, "POST", JSON.stringify(formData));
        } else {
            submitRequest(`/persons/create`, "POST", JSON.stringify(formData));
        }
    };

    const breadcrumbLabels = {
        contribuer: lang.menuContributeLabel,
        personnes: lang.Persons,
        slug: `${model.firstName ?? ""} ${model.lastName ?? "-"}`,
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    };

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes);
    }, [model.title]);

    /*****************************
     *
     *
     *  Sections
     *
     *
     ***************************/

    const title = (
        <div className="row">
            <Input
                name="firstName"
                label={"Prénom" + lang.required}
                className="col-12 col-sm-6 col-md-4"
                formClassName="discrete-without-focus form-text-white"
                validationRules={[{ name: "REQUIRED" }, { name: "MIN_LENGTH", specification: 2 }]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            <Input
                name="lastName"
                label={"Nom" + lang.required}
                className="col-12 col-sm-6 col-md-4"
                formClassName="discrete-without-focus form-text-white"
                validationRules={[{ name: "REQUIRED" }, { name: "MIN_LENGTH", specification: 2 }]}
                errorText="Cette information est requise"
                formTools={formTools}
            />
            <Input
                name="nickName"
                label="Surnom"
                className="col-12 col-sm-6 col-md-4"
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
            />
        </div>
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
            mainImageSetter={updateModelMainImage}
            ctaSection={ctaSection}
            entity={model}
            mode={modes.CONTRIBUTING}
        ></SingleBaseHeader>
    );

    const fullWidthContent = (
        <SingleInfo title={lang.about} noCardLayout>
            <RichTextarea
                className="my-3"
                name="description"
                //label="Biographie / description"
                formTools={formTools}
            />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <SingleInfo title={lang.skillsAndTechnologies}>
            <UpdateSkillGroup
                parentEntity={props.data}
                formTools={formTools}
                name="occupations"
                labelInput={lang.expertiseField}
                labelSelect={lang.skillsAndTechnologiesAssociated}
            />
        </SingleInfo>
    );

    const contentColumnRight = (
        <>
            <SingleInfo title={lang.contactInformations}>
                <UpdateContactPoint formTools={formTools} name="contactPoint" model={model} />

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
            </SingleInfo>

            <SingleInfo title={lang.Domains}>
                <Select2
                    name="domains"
                    //label={lang.Domains}
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

            <SingleInfo title={lang.externalLinks}>
                {/* Url */}
                <UpdateSocialHandles name="url" label={lang.url} parentEntity={model} formTools={formTools} />
            </SingleInfo>
        </>
    );

    const Footer = (
        <>
            <SingleInfo title={lang.seoSection}>
                <UpdateSameAs label={lang.sameAs} name="sameAs" parentEntity={model} formTools={formTools} />
                <ShortDescription formTools={formTools} name="shortDescription" model={model} />
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

export default PersonSingleEdit;
