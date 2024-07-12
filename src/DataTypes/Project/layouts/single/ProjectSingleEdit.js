import React, {useCallback, useContext, useEffect, useState} from 'react';
import Router from 'next/router';

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useRootModal} from '@/src/hooks/useModal/useRootModal';

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import SelectFetch from '@/FormElements/Select/SelectFetch'
import Select2 from '@/FormElements/Select2/Select2'
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta';
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import UpdateTeams from '@/src/DataTypes/Organisation/components/forms/UpdateTeams/UpdateTeams';
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleSaveEntityReminder from '@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder';
import UpdateSocialHandles from '@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles';
import UpdateContactPoint from '@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint';
import UpdateScheduleBudget from '@/src/DataTypes/Project/component/forms/UpdateScheduleBudget';
import UpdateSponsor from '@/src/DataTypes/Project/component/forms/UpdateSponsor';
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import Project from "@/DataTypes/Project/models/Project";
import {replacePathname} from "@/src/helpers/url";

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import Icon from "@/common/widgets/Icon/Icon";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import {TYPE_EQUIPMENT, TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';

const ProjectSingleEdit = (props) => {

    const {
        _id,
        name,
        slug,
        alternateName,
        entityInCharge,
        producer,
        description,
        url,
        contactPoint,
        location,
        team,
        mainImage,
        sponsor,
        scheduleBudget,
        skills,
        domains,
        context,
        meta,
        equipment,
        type,
        createdAt,
        updatedAt,
    } = props.data;

    //Model de project
    let model = new Project(props.data);

    //  STATES change that to a context ?

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Project(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);


    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);
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
    //Modal hook
    const modalSaveEntityReminder = useRootModal();

       //Main form functionalities
       const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: name ?? "",
                isValid: true
            },
            alternateName: {
                value: alternateName ?? "",
                isValid: true
            },
            entityInCharge: {
                value: entityInCharge ?? "",
                isValid: true
            },
            producer: {
                value: producer ?? "",
                isValid: true
            },
            description: {
                value: description ?? "",
                isValid: true
            },
            url: {
                value: url ?? [],
                isValid: true
            },
            contactPoint: {
                value: contactPoint ?? {tel:{num:"", ext:""},email:{address:""},website:{url:""} },
                isValid: true
            },
            location: {
                value: location ?? "",
                isValid: true
            },
            team: {
                value: team ?? [],
                isValid: true
            },
            equipment: {
                value: equipment ?? [],
                isValid: true
            },
            /*mainImage: {
                value: mainImage ?? "",
                isValid: true
            },*/
            sponsor: {
                value: sponsor ?? [],
                isValid: true
            },
            startDate: {
                value: scheduleBudget?.startDate?.split("T")[0] ?? "",
                isValid: true
            },
            endDateEstimate: {
                value: scheduleBudget?.endDateEstimate?.split("T")[0] ?? "",
                isValid: true
            },
            completionDate: {
                value: scheduleBudget?.completionDate?.split("T")[0] ?? "",
                isValid: true
            },
            estimatedTotalBudget: {
                value: scheduleBudget?.estimatedTotalBudget ?? "",
                isValid: true
            },
            eta: {
                value: scheduleBudget?.eta ?? "",
                isValid: true
            },
            timeframe: {
                value: scheduleBudget?.timeframe ?? [],
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
            context: {
                value: context ?? "",
                isValid: true
            }
        },
        //Actions if the form turns out to be positive
        {
            displayResMessage: true,
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }
        }
    )
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                alternateName: formState.inputs.alternateName.value,
                entityInCharge: formState.inputs.entityInCharge?.value?.value ?? null,
                producer: formState.inputs.producer.value?.value ?? null,
                description: formState.inputs.description.value,
                context: (formState.inputs.context.value !== "" && typeof formState.inputs.context.value !== 'undefined' ) ? formState.inputs.context.value : undefined,
                sponsor: formState.inputs.sponsor.value.map( (singleSponsor) => {
                    return {
                        name: singleSponsor.value.name.value,
                        entity: singleSponsor.value.entity.value.value,
                        entityType: "Organisation",
                        subMeta: { order: singleSponsor.order }
                    }
                }),
                scheduleBudget: {
                    startDate: formState.inputs.startDate.value,
                    endDateEstimate: formState.inputs.endDateEstimate.value,
                    completionDate: formState.inputs.completionDate.value,
                    estimatedTotalBudget: formState.inputs.estimatedTotalBudget.value,
                    eta: formState.inputs.eta.value,
                    timeframe: formState.inputs.timeframe.value.map( (singleTimeframe) => {
                        return {
                            step: singleTimeframe.value.step.value,
                            eta: singleTimeframe.value.eta.value == "" ? undefined : singleTimeframe.value.eta.value,
                            budgetRange: singleTimeframe.value.budgetRange.value == "" ? undefined : singleTimeframe.value.budgetRange.value,
                            subMeta: { order: singleTimeframe.order }
                        }
                    }),
                },
                team:formState.inputs.team.value.map(function(singleTeam){
                    return {
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value,
                        subMeta: { order: singleTeam.order }
                    }
                }),
                equipment: formState.inputs?.equipment?.value?.map(elem => elem.value),
                skills: formState.inputs.skills?.value?.length > 0 ? formState.inputs.skills.value.map( (selectOptionSkill) => {
                    return selectOptionSkill.value
                }) : [],
                domains: formState.inputs.domains?.value?.length > 0 ?
                    formState.inputs.domains.value.map( (elem) => {
                        return {
                            domain: elem.value,
                        }
                    })
                    : [],
                contactPoint: formState.inputs.contactPoint.value,
                url: formState.inputs.url.value.map(function(singleUrl){
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order : singleUrl.order }
                    }
                }),
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            }
        }

        //Add data to the formData
        submitRequest(
            "/projects/update",
            'POST',
            formData
        );
    }

    /* Needed for breadCrumb generator */
    const breadcrumbLabels = {
        "contribuer": lang.menuContributeLabel,
        "projets": lang.Projects,
        "slug": model.name ?? '-'
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
    }, [model.title]);


    const title = (
        <Input
            name="name"
            label={"Nom du projet"+lang.required}
            formTools={formTools}
            formClassName="discrete-without-focus form-text-white"
            validationRules={[
                {name: "REQUIRED"}
            ]}
        />);

    const subtitle = (
        <>
            <Input
                name="alternateName"
                label="Nom alternatif"
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
            />
            <Select2
                name="entityInCharge"
                label={lang.entityInCharge}
                formTools={formTools}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />
            {/* Producer */}
            <Select2
                name="producer"
                label={lang.producer}
                formTools={formTools}
                tooltip={{header:"Producteur·rice", body:"Un·e producteur·rice a une forme d'autorité sur le projet et participe à son financement."}}
                creatable={false}
                isMulti={false}

                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />

        </>);


    const ctaHeaderSection = (
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
            <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage}/>
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
                <Button className='fs-6' size="slim" color="success" disabled={!formState.isValid}
                        onClick={modalSaveEntityReminder.displayModal}>
                    <Icon iconName={"save"}/>&nbsp;{lang.capitalize("save")}
                </Button>
                <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                    <Icon iconName={"times"}/>&nbsp;{lang.Cancel}
                </Button>
            </div>
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
        />
    );

    const fullWidthContent = (
        <SingleInfo
            title={lang.about}
        >
            <RichTextarea
                name="description"
                formTools={formTools}
            />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <>
            {/* Sponsor */}
            <SingleInfo
                title={lang.sponsors}
            >
                <UpdateSponsor
                    name="sponsor"
                    formTools={formTools}
                    parentEntity={props.data}
                />
            </SingleInfo>
            { /* team */ }
            <SingleInfo
                title="Membres de l'équipe"
            >
                <UpdateTeams
                    name="team"
                    formTools={formTools}
                    parentEntity={props.data}
                    label="Éditez vos membre d'équipe"
                />
            </SingleInfo>
            { /* scheduleBudget */}
            <SingleInfo
                title="Échéancier et budget"
            >
                <UpdateScheduleBudget
                    name="scheduleBudget"
                    formTools={formTools}
                    parentEntity={props.data}
                />
            </SingleInfo>
            { /* Update the equipment list */ }
            <SingleInfo
                title={lang.equipmentUsed}
            >
                <Select2
                    name="equipment"
                    creatable
                    isMulti
                    formTools={formTools}
                    modalType={TYPE_EQUIPMENT}
                    fetch={"/equipment/list"}
                    searchField={"label"}
                    selectField={"label"}
                />
            </SingleInfo>
        </>
    );
    const contentColumnRight = (
        <>
            <SingleInfo title={lang.contactInformations}>
                <UpdateContactPoint
                    formTools={formTools}
                    name="contactPoint"
                    model={model}
                />
            </SingleInfo>

            <SingleInfo
                title="Informations supplémentaires"
                cardLayout
            >
                {/* Context */}
                <div className="mb-3">
                    <SelectFetch
                        name="context"
                        label={lang.projectContext}
                        formTools={formTools}
                        noValueText={lang.noSelectedOption}
                        fetchOption="context-enum"
                    />
                </div>
                <SingleInfo>
                    <Select2
                        name="skills"
                        label={lang.skillsAndTechnologies}
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_TAXONOMY}
                        allowedCategories={["skills", "technologies"]}
                        isMulti={true}
                        fetch={"/taxonomies/group/skills"}
                        searchField={"name"}
                        selectField={"name"}
                    />
                </SingleInfo>

                <SingleInfo>
                    <Select2
                        name="domains"
                        label={lang.Domains}
                        formTools={formTools}
                        creatable={true}
                        modalType={TYPE_TAXONOMY}
                        allowedCategories={["domains"]}
                        isMulti={true}

                        fetch={"/taxonomies/list"}
                        requestData={{category:"domains", name:""}}
                        searchField={"name"}
                        selectField={"domains"}
                    />
                </SingleInfo>

                <SingleInfo
                    title={lang.externalLinks}
                    isSubtitle
                >
                    { /* Url */}
                    <UpdateSocialHandles
                        name="url"
                        label={lang.url}
                        parentEntity={model}
                        formTools={formTools}
                    />
                </SingleInfo>

            </SingleInfo>
        </>
    );


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

    {/*********** Submit section ***********/}
    const SinglePageBottom = (
        <SubmitEntity submitHandler={modalSaveEntityReminder.displayModal} formState={formState} />
    )

    return (
        <>
            <SingleBase
                breadCrumb={breadCrumb}
                header={header}
                fullWidthContent={fullWidthContent}
                contentColumnLeft={contentColumnLeft}
                contentColumnRight={contentColumnRight}
                singlePageBottom={SinglePageBottom}
                footer={Footer}
                model={model}
            />
            <modalSaveEntityReminder.Modal>
                <SingleSaveEntityReminder
                    submitHandler={submitHandler}
                    closeModal={modalSaveEntityReminder.closeModal}
                />
            </modalSaveEntityReminder.Modal>
        </>
    )
}

export default ProjectSingleEdit;