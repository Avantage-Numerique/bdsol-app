import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";

//Custom hooks
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { useRootModal } from "@/src/hooks/useModal/useRootModal";

//components
import Input from "@/FormElements/Input/Input";
import { lang, modes } from "@/src/common/Data/GlobalConstants";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import { SingleEntityMeta } from "@/src/DataTypes/Meta/components/SingleEntityMeta";
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleSaveEntityReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder";
import SingleBaseCTA from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseCTA";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";

//FormData
import { getDefaultUpdateEntityMeta } from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from "@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader";
import SingleBase from "@/src/DataTypes/common/layouts/single/SingleBase";
import { replacePathname } from "@/src/helpers/url";
import { TYPE_TAXONOMY } from "@/src/DataTypes/Entity/Types";
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import Equipment from "../../../models/Equipment";
import UpdateSocialHandles from "../../../../common/Forms/UpdateSocialHandles/UpdateSocialHandles";
import SingleBeforeUnloadReminder from "@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleBeforeUnloadReminder";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";

const EquipmentSingleEdit = ({ positiveRequestActions, ...props }) => {
    //Model de project
    let model = new Equipment(props.data);

    //  STATES

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback(
        (rawData) => {
            model = new Equipment(rawData);
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
            equipmentType: {
                value: model?.equipmentType ?? "",
                isValid: false,
            },
            label: {
                value: model?.label ?? "",
                isValid: false,
            },
            description: {
                value: model?.description ?? "",
                isValid: true,
            },
            brand: {
                value: model?.brand ?? "",
                isValid: true,
            },
            modelName: {
                value: model?.modelName ?? "",
                isValid: true,
            },
            url: {
                value: model?.url ?? [],
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
                id: model._id,
                equipmentType: formState.inputs.equipmentType.value.value,
                label: formState.inputs.label.value,
                description: formState.inputs.description.value,
                brand: formState.inputs.brand.value,
                modelName: formState.inputs.modelName.value,
                url: formState.inputs.url.value.map(function (singleUrl) {
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order: singleUrl.order },
                    };
                }),

                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            },
        };

        if (model._id !== undefined) {
            formData.data.id = model._id;
            submitRequest(`/equipment/update`, "POST", JSON.stringify(formData));
        } else {
            submitRequest(`/equipment/create`, "POST", JSON.stringify(formData));
        }
    };

    const breadcrumbLabels = {
        contribuer: lang.menuContributeLabel,
        equipements: lang.Equipments,
        slug: `${model.title ?? "-"}`,
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
        <div>
            <Select2
                name="equipmentType"
                label={lang.capitalize(lang.equipmentType) + lang.required}
                formTools={formTools}
                creatable={true}
                modalType={TYPE_TAXONOMY}
                allowedCategories={["equipmentType"]}
                isMulti={false}
                placeholder={lang.equipmentTypePlaceholder}
                fetch={"/taxonomies/list"}
                requestData={{ category: "equipmentType", name: "" }}
                searchField={"name"}
                selectField={"name"}
                validationRules={[{ name: "REQUIRED" }]}
            />
            <Input
                name="label"
                label={lang.label + lang.required}
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
                placeholder={lang.labelPlaceholder}
                validationRules={[{ name: "REQUIRED" }]}
            />
        </div>
    );
    const subtitle = <></>;

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
        <SingleInfo title={lang.description} classNameTitle="mb-0" noCardLayout>
            <RichTextarea className="py-3" name="description" formTools={formTools} />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <SingleInfo title={lang.productInformations}>
            <Input name="brand" label={lang.brand} formTools={formTools} />
            <Input name="modelName" label={lang.modelName} formTools={formTools} />
        </SingleInfo>
    );

    const contentColumnRight = (
        <SingleInfo title={lang.externalLinks}>
            <UpdateSocialHandles name="url" parentEntity={model} formTools={formTools} />
        </SingleInfo>
    );

    const footer = (
        <>
            <SingleInfo title={lang.seoSection}>
                <ShortDescription formTools={formTools} name="shortDescription" model={model} />
            </SingleInfo>
            {(model.createdAt || model.updatedAt || model.meta) && (
                <SingleInfo title={lang.entityMetadata} className="pt-3">
                    {/*********** Entity data ***********/}
                    <SingleEntityMeta createdAt={model.createdAt} updatedAt={model.updatedAt} meta={model.meta} />
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
                footer={footer}
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

export default EquipmentSingleEdit;
