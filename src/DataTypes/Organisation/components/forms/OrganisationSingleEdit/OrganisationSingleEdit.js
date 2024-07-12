import React, {useCallback, useContext, useEffect, useState} from 'react';
import Router from 'next/router';

//Context
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Hooks
import {useAuth} from '@/auth/context/auth-context';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useRootModal} from '@/src/hooks/useModal/useRootModal';

//Component
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import Select from '@/src/common/FormElements/Select/Select';
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase';
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader';
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo';
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta';
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup';
import UpdateTeams from '../UpdateTeams/UpdateTeams';
import SelectEquipment from '@/src/DataTypes/Equipment/components/layouts/SelectEquipment/SelectEquipment';
import UpdateSocialHandles from '@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles';
import SingleSaveEntityReminder from '@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder';
import UpdateContactPoint from '@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint';

//Utils
import Organisation from '@/src/DataTypes/Organisation/models/Organisation';
import {replacePathname} from "@/src/helpers/url";
import {lang} from "@/src/common/Data/GlobalConstants";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import Icon from "@/common/widgets/Icon/Icon";
import {TYPE_PLACE, TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import {apiDateToDateInput, dateTimeStringToUTC} from "@/common/DateManager/Parse";


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

    const updateEntityModel = useCallback((rawData) => {
        model = new Organisation(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);


    const breadcrumbLabels = {
        "contribuer": lang.menuContributeLabel,
        "organisations": lang.Organisations,
        "slug": `${model.name ?? '-'}`
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
    }, [model.title]);


    //Modal hook
    const modalSaveEntityReminder = useRootModal();

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

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
    {
        name: {
            value: name ?? '',
            isValid: false
        },
        description: {
            value: description ?? '',
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
        fondationDate: {
            value: fondationDate ? apiDateToDateInput(fondationDate) : "",
            isValid: true
        },
        catchphrase: {
            value: catchphrase ?? '',
            isValid: true
        },
        offers: {
            value: offers ?? [],
            isValid: true
        },
        domains: {
            value: domains ?? [],
            isValid: true
        },
        team: {
            value: team ?? [],
            isValid: true
        },
        location: {
            value: location ?? [],
            isValid: true
        },
        equipment: {
            value: equipment ?? [],
            isValid: true
        },
        region: {
            value: model.region ?? "",
            isValid: true
        }
    }, {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                Router.push("/"+replacePathname(model.singleRoute.pathname, {slug: response.data.slug}))
            }

    })

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                id: _id,
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value,
                url: formState.inputs.url.value.map(function(singleUrl){
                    return {
                        label: singleUrl.value.label.value,
                        url: singleUrl.value.url.value,
                        subMeta: { order : singleUrl.order }
                    }
                }),
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: dateTimeStringToUTC(formState.inputs.fondationDate.value),
                offers: formState.inputs.offers.value.map(function(singleOffer){
                    return {
                        groupName: singleOffer.value.groupName.value,
                        skills: singleOffer.value.skills.value.map( (skill) => { return skill.value }),
                        subMeta: {order: singleOffer.order},
                    }
                }),
                catchphrase: formState.inputs.catchphrase.value,
                domains: formState.inputs.domains?.value?.length > 0 ?
                    formState.inputs.domains.value.map( (elem) => {
                        return {
                            domain: elem.value,
                        }
                    })
                    : [],
                equipment: formState.inputs.equipment.value.map(elem => {
                    return {
                        equipment: elem.value.equipment.value.value,
                        qty: parseInt(elem.value.qty.value),
                        subMeta: {order: elem.order},
                    }
                }),
                team:formState.inputs.team.value.map(function(singleTeam){
                    return {
                        member: singleTeam.value.member.value.value,
                        role: singleTeam.value.role.value,
                        subMeta: {order: singleTeam.order},
                    }
                }),
                location: formState.inputs.location?.value?.length > 0 ?
                    formState.inputs.location.value.map(function(singlePlace){
                        return singlePlace.value
                    })
                    : [],
                region: formState.inputs.region.value,
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            `/organisations/update`,
            'POST',
            formData
        );
    }

    /*****************************
     *  Sections
     ***************************/

    const title = (
        <Input 
            name="name"
            placeholder="Nom de l'organisation"
            label={"Nom de l'organisation"+lang.required}
            formClassName="discrete-without-focus form-text-white"
            validationRules={[
                {name: "REQUIRED"}
            ]}
            formTools={formTools}
        />);

    const subtitle = (
        <Input
            name="catchphrase"
            formClassName="discrete-without-focus form-text-white"
            label={lang.catchphrase}
            formTools={formTools}
        />);
    
    const ctaHeaderSection = (
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
            <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 gap-md-3 gap-lg-4">
                <Button className='fs-6' size="slim" color="success" disabled={!formState.isValid} onClick={modalSaveEntityReminder.displayModal}>
                    <Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}
                </Button>
                <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                    <Icon iconName={"times"} />&nbsp;{lang.Cancel}
                </Button>
            </div>
        </div>
    );

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
            classNameTitle="mb-0"
        >
            <RichTextarea
                className="py-3"
                name="description"
                formTools={formTools}
            />
        </SingleInfo>
    );

    const contentColumnLeft = (
        <>
            <SingleInfo
                title={lang.organisationOffer}
            >
                <UpdateSkillGroup
                    parentEntity={props.data}
                    formTools={formTools}
                    name="offers"
                    labelInput={lang.organisationSkills}
                    labelSelect={lang.organisationSkillsAssociated}
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
                />
            </SingleInfo>
            { /* Equipment */}
            <SingleInfo
                title={lang.EquipmentsOwned}
            >
                <SelectEquipment 
                    name="equipment"
                    formTools={formTools}
                    parentEntity={props.data}
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
                <Select 
                    name="region"
                    label="Faites-vous partie du croissant boréal?"
                    formTools={formTools}
                    noValueText="Choisissez une région"
                    tip={
                        {
                            header : "Badge",
                            body: "Ce champs permet d'obtenir le badge 'Croissant Boréal' qui indique que vous faites partie de celui-ci."
                        }
                    }
                    options={[
                        {label: "Autre", value: "other"},
                        {label: "Abitibi-Témiscamingue", value: "abitibi-temiscamingue"},
                        {label: "Nord de l'Ontario", value: "north Ontario"},
                        {label: "Baies-James", value: "baies-james"}
                    ]}
                    //defaultValue="Autre"
                />
                <SingleInfo>
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

                        placeholder={lang.domainsInputPlaceholder}
                        fetch={"/taxonomies/list"}
                        requestData={{category:"domains", name:""}}
                        searchField={"name"}
                        selectField={"domains"}
                    />
                </SingleInfo>

                <SingleInfo>
                    <Input
                        name="fondationDate"
                        label="Date de fondation"
                        type="date"
                        formTools={formTools}
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
                footer={Footer}
                singlePageBottom={SinglePageBottom}
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
export default OrganisationSingleEdit 
