import React, {useCallback, useContext, useEffect, useState} from 'react'
import Router from 'next/router'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useRootModal} from '@/src/hooks/useModal/useRootModal'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import Select2 from '@/src/common/FormElements/Select2/Select2'
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta'
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import SingleSaveEntityReminder from '@/src/DataTypes/common/layouts/SingleSaveEntityReminder/SingleSaveEntityReminder'
import UpdateSocialHandles from '@/src/DataTypes/common/Forms/UpdateSocialHandles/UpdateSocialHandles'
import Select from '@/src/common/FormElements/Select/Select'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';
import { lang } from '@/src/common/Data/GlobalConstants'

//FormData
import {getDefaultUpdateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup'
import Person from "@/DataTypes/Person/models/Person";
import {replacePathname} from "@/src/helpers/url";
import Icon from "@/common/widgets/Icon/Icon";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types'
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";
import UpdateContactPoint from '@/src/DataTypes/common/Forms/UpdateContactPoint/UpdateContactPoint'


const PersonSingleEdit = ({ positiveRequestActions, ...props}) => {

    //Person data extract
    const {
        _id,
        lastName,
        firstName,
        nickname,
        description,
        occupations,
        domains,
        mainImage,
        slug,
        catchphrase,
        meta,
        type,
        fullName,
        createdAt,
        contactPoint,
        url,
        updatedAt
    } = props?.data;

    //Model de project
    let model = new Person(props.data);

    //  STATES

    const [currentMainImage, setCurrentMainImage] = useState(model.mainImage);
    const [currentModel, setCurrentModel] = useState(model);

    const updateEntityModel = useCallback((rawData) => {
        model = new Person(rawData);
        setCurrentMainImage(model.mainImage);
    }, [setCurrentModel]);

    const updateModelMainImage = useCallback((mainImage) => {
        setCurrentMainImage(mainImage);
        model.mainImage = mainImage;
        setCurrentModel(model);
    }, [setCurrentModel]);


    //Modal hook
    const modalSaveEntityReminder = useRootModal();

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    /*
    //Import modal context 
    const { modalTools } = useContext(ModalContext);
    //Declare the variable holding
    let newModal;    
    //New Modal
    useEffect(() => {
        newModal = modalTools.addNew({
            UI: taxoModal(),
            key: "329v0csw"
        })
        newModal.display()
    }, []) 
    */

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
            firstName: {
                value: firstName ?? "",
                isValid: false
            },
            lastName: {
                value: lastName ?? "",
                isValid: false
            },
            nickName: {
                value: nickname ?? "",
                isValid: true
            },
            description: {
                value: description ?? "",
                isValid: true
            },
            catchphrase: {
                value: catchphrase ?? "",
                isValid: true
            },
            occupations: {
                value: occupations ?? [],
                isValid: true
            },
            domains: {
                value: domains ?? [],
                isValid: true
            },
            contactPoint: {
                value: contactPoint ?? {tel:{num:"", ext:""},email:{address:""},website:{url:""} },
                isValid: true
            },
            url: {
                value: url ?? [],
                isValid: true
            },
            region: {
                value: model.region ?? "",
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
                lastName: formState.inputs.lastName.value,
                firstName:  formState.inputs.firstName.value,
                nickname: formState.inputs.nickName.value,
                description: formState.inputs.description.value,
                catchphrase: formState.inputs.catchphrase.value,
                occupations: formState.inputs.occupations.value.map(function(singleOccupation){
                    return {
                        groupName: singleOccupation.value.groupName.value,
                        skills: singleOccupation.value.skills.value.map( (skill) => { return skill.value }),
                        subMeta: { order : singleOccupation.order }
                    }
                }),
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
                region: formState.inputs.region.value,
                meta: getDefaultUpdateEntityMeta(auth.user, model.meta.requestedBy),
            }
        };

        submitRequest(
            `/persons/update`,
            'POST',
            JSON.stringify(formData)
        );
    }


    const breadcrumbLabels = {
        "contribuer": lang.menuContributeLabel,
        "personnes": lang.Persons,
        "slug": `${model.firstName ?? ""} ${model.lastName ?? "-"}`
    };

    const breadcrumbsRoutes = {
        route: model.singleEditRoute,
        labels: breadcrumbLabels,
    }

    const [breadCrumb, setBreadCrumb] = useState(breadcrumbsRoutes);
    useEffect(() => {
        setBreadCrumb(breadcrumbsRoutes)
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
                label={"Prénom"+lang.required}
                className="col-12 col-sm-6 col-md-4"
                formClassName="discrete-without-focus form-text-white"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            <Input 
                name="lastName"
                label={"Nom"+lang.required}
                className="col-12 col-sm-6 col-md-4"
                formClassName="discrete-without-focus form-text-white"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
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
    
    const ctaHeaderSection = (
        <div className="d-flex flex-wrap align-items-end gap-2 gap-md-3 gap-lg-4">
            <MainImageDisplay buttonClasses="fs-6" mainImage={currentMainImage} entity={currentModel} setter={updateModelMainImage} />
            <Button className='fs-6' size="slim" color="success" disabled={!formState.isValid} onClick={modalSaveEntityReminder.displayModal}>
                <Icon iconName={"save"} />&nbsp;{lang.capitalize("save")}
            </Button>
            <Button className='fs-6' size="slim" color="primary-light" href={model.singleLink}>
                <Icon iconName={"times"} />&nbsp;{lang.capitalize("CancelChanges")}
            </Button>
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
        </SingleBaseHeader>
    );

    const fullWidthContent = (
        <SingleInfo
            title={lang.about}
        >
            <RichTextarea
                className="my-3"
                name="description"
                //label="Biographie / description"
                formTools={formTools}
            />
        </SingleInfo>
    )

    const contentColumnLeft = (
        <SingleInfo
            title={lang.skillsAndTechnologies}
        >
            <UpdateSkillGroup
                parentEntity={props.data}
                formTools={formTools}  
                name="occupations"
                labelInput={lang.expertiseField}
                labelSelect={lang.skillsAndTechnologiesAssociated}
            />
        </SingleInfo>
    )

    const contentColumnRight = (
        <>
            <SingleInfo title={lang.contactInformations}>
                <UpdateContactPoint
                    formTools={formTools}
                    name="contactPoint"
                    model={model}
                />
            </SingleInfo>
            <SingleInfo>
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
            </SingleInfo>

            <SingleInfo title={lang.Domains}>
                <Select2
                    name="domains"
                    //label={lang.Domains}
                    formTools={formTools}
                    creatable={true}
                    modalType={TYPE_TAXONOMY}
                    isMulti={true}
                    fetch={"/taxonomies/list"}
                    requestData={{category:"domains", name:""}}
                    searchField={"name"}
                    selectField={"domains"}
                />
            </SingleInfo>

            <SingleInfo
                title={lang.externalLinks}
            >
                { /* Url */}
                <UpdateSocialHandles
                    name="url"
                    label={lang.url}
                    parentEntity={model}
                    formTools={formTools}
                />
            </SingleInfo>
        </>
    )

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
    );
}

export default PersonSingleEdit
