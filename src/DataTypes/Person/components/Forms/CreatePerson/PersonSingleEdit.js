import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Router from 'next/router'
import Link from 'next/link'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'
import {useModal} from '@/src/hooks/useModal/useModal'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import CreateTaxonomyForm from '@/DataTypes/Taxonomy/components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import Select2 from '@/src/common/FormElements/Select2/Select2'
import Modal from '@/src/hooks/useModal/Modal/Modal'
import {SingleEntityMeta} from '@/src/DataTypes/Meta/components/SingleEntityMeta'
import SelectEquipment from '@/src/DataTypes/Equipment/components/layouts/SelectEquipment/SelectEquipment';

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Styling
import styles from './CreatePersonForm.module.scss'

//FormData
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup'
import Person from "@/DataTypes/Person/models/Person";
import {replacePathname} from "@/src/helpers/url";
import Icon from "@/common/widgets/Icon/Icon";
import MainImageDisplay from "@/DataTypes/common/layouts/single/defaultSections/MainImageDisplay/MainImageDisplay";
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types'
import SubmitEntity from "@/DataTypes/common/Forms/SingleEdit/SubmitEntity";


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
        equipment,
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
    const {displayModal, modal, closeModal, Modal} = useModal();

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
    //not used : transmuteTaxonomyTargetInput
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
            equipment: {
                value: equipment ?? [],
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
                meta: getDefaultCreateEntityMeta(auth.user),
            }
        };

        submitRequest(
            `/persons/update`,
            'POST',
            JSON.stringify(formData)
        );
    }

    /* Needed for breadCrumb generator */
    const getLabelGenerator = useCallback((param, query) => {
        return {
            "contribuer": lang.menuContributeLabel,
            "personnes": lang.Persons,
            "slug": `${model.firstName ?? ""} ${model.lastName ?? "-"}`
        }[param];
    }, []);

    /*****************************
     * 
     * 
     *  Sections
     * 
     * 
     ***************************/
    const breadCrumb = {
        route: model.singleEditRoute,
        getLabelGenerator: getLabelGenerator
    }

    const title = (
        <div className="row">
            <Input 
                name="firstName"
                label="Prénom"
                className="col-12 col-md-6"
                formClassName="discrete-without-focus form-text-white h2"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            <Input 
                name="lastName"
                label="Nom"
                className="col-12 col-md-6"
                formClassName="discrete-without-focus form-text-white h2"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />
        </div>
    );
    const subtitle = (
        <>
            <Input  
                name="nickName"
                label="Surnom"
                formClassName="discrete-without-focus form-text-white"
                formTools={formTools}
            />

            <Input
                name="catchphrase"
                formClassName="discrete-without-focus form-text-white"
                label={lang.catchphrase}
                formTools={formTools}
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
        <>
            <RichTextarea
                className="my-3"
                name="description"
                label="Biographie / description"
                formTools={formTools}
            />
        </>)

    const contentColumnLeft = (
        <>
            <UpdateSkillGroup
                parentEntity={props.data}
                formTools={formTools}
                name="occupations"
                label="Éditez vos groupes de compétences"
                createOptionFunction={displayModalForSkills}
            />
            { /* Equipment */}
            <SelectEquipment 
                name="equipment"
                formTools={formTools}
                parentEntity={props.data}
                label={lang.EditEquipment}
            />
        </>
    )

    const contentColumnRight = (
        <>
            <Select2
                name="domains"
                label={lang.Domains}
                formTools={formTools}
                creatable={true}
                modalType={TYPE_TAXONOMY}
                isMulti={true}
                createOptionFunction={displayModalForDomains}

                fetch={"/taxonomies/list"}
                requestData={{category:"domains", name:""}}
                searchField={"name"}
                selectField={"domains"}
            />
        </>
    )

    const footer = (
        <>
            {
                (createdAt || updatedAt || meta) &&
                <SingleEntityMeta createdAt={createdAt} updatedAt={updatedAt} meta={meta} />
            }
        </>
    )


    const modalCategoryMode = useRef("skills")
    function displayModalForSkills(elem) {
        modalCategoryMode.current = "skills";
        modal.enteredValues.name = elem;
        displayModal();
    }
    function displayModalForDomains(elem) {
        modalCategoryMode.current = "domains";
        modal.enteredValues.name = elem;
        displayModal();
    }
/*
    function taxoModal() {
        return (
            <>
                <header className={`d-flex`}>
                    <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                    <Button onClick={() => newModal.close()}>Fermer</Button>
                </header>               
                
                <div className={`my-4 border-bottom`}></div>

                <CreateTaxonomyForm
                    name={modal.enteredValues.name ?? ''}   //Prefilled value
                    initValues={ {name:modal.enteredValues.name} }
                    category={modalCategoryMode.current}
                    positiveRequestActions={{
                        //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                        callbackFunction: requestResponse => {

                            //Here could be a call back function to execute 
                            
                            //Close the modal 
                            newModal.close()
                        }
                    }}
                />
            </>
        )
    }
*/

    return (
        <>
        
          {/*   <form 
                onSubmit={submitHandler} 
                className={`${styles["create-person-form"]}`}
            >
            */}
                <SingleBase
                    breadCrumb={breadCrumb}
                    header={header}
                    fullWidthContent={fullWidthContent}
                    contentColumnLeft={contentColumnLeft}
                    contentColumnRight={contentColumnRight}
                    footer={footer}
                />
                <SubmitEntity submitHandler={submitHandler} formState={formState} />

             {/* </form> */}

            { modal.display && false &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    <div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm
                        name={modal.enteredValues.name ?? ''}   //Prefilled value
                        initValues={ {name:modal.enteredValues.name} }
                        category={modalCategoryMode.current}
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                //modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                closeModal()
                            }
                        }}
                    />

                </Modal>
            }
        </>
    );
}

export default PersonSingleEdit
