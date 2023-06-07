import React from 'react'
import Link from 'next/link'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useModal } from '@/src/hooks/useModal/useModal'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag'
import Modal from '@/src/hooks/useModal/Modal/Modal'
import SingleInfo from '@/src/DataTypes/common/layouts/SingleInfo/SingleInfo'
import { SingleEntityStatus } from '@/src/DataTypes/Status/Components/SingleEntityStatus'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'

//FormData
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag'
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'
import UpdateSkillGroup from '@/src/DataTypes/common/Forms/UpdateSkillGroup/UpdateSkillGroup'
import Person from "@/DataTypes/Person/Models/Person";
import {replacePathname} from "@/src/helpers/url";

const PersonSingleEdit = ({initValues, positiveRequestActions, ...props}) => {

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
        status,
        type,
        fullName,
        createdAt,
        updatedAt
    } = props?.data;

    //Model de project
    const model = new Person(props.data);
    //Redirection link to the view page
    const link = "/"+replacePathname(model.singleRoute.pathname, {slug: model.slug});
    

    const submitUri = props.uri ?? "create";

    //Authentication ref
    const auth = useAuth();

    //Modal hook
    const modal = useModal()

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
            }
        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );
    

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            data: {
                lastName: formState.inputs.lastName.value,
                firstName:  formState.inputs.firstName.value,
                nickname: formState.inputs.nickName.value,
                description: formState.inputs.description.value,
                catchphrase: formState.inputs.catchphrase.value,
                occupations: formState.inputs.occupations.value.map(function(occ){
                    return {
                        status: occ.status,
                        occupation: occ.value.occupation.value,
                        skills: occ.value.skills.value.map(skill => skill.skill._id)
                    }
                }),
                domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user),
                status: getDefaultCreateEntityStatus(auth.user),
            }
        };

        if (submitUri === "update") {
            formData.data.id = initValues._id
        }

       await submitRequest(
            `/persons/${submitUri}`,
            'POST',
            JSON.stringify(formData)
        );
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
        <div className="d-flex flex-column align-items-end">
            <Button disabled={!formState.isValid} onClick={submitHandler}>Soumettre les modifications</Button>
            <Link href={link} >
                <button type="button" className="btn underlined-button text-white">Retour en visualisation</button>
            </Link>
        </div>
    )
    const header = ( 
        <SingleBaseHeader 
            title={title} 
            type={type} 
            subtitle={subtitle} 
            mainImage={mainImage}
            buttonSection={ctaHeaderSection}
        /> 
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
            />
        </>
    )

    const contentColumnRight = (
        <>
            <Select2Tag
                label={lang.Domains}
                searchField="name"
                fetch="/taxonomies/list"
                requestData={{category:"domains", name:""}}
                name="domains"
                idField="domain"
                placeholder={lang.domainsInputPlaceholder}
                formTools={formTools}
                creatableModal={modal}
            />
        </>
    )

    const footer = (
        <div className="border-top border-bottom pt-3">
            {
                status?.state &&
                    <SingleInfo
                        title="Statut de l'entité">
                        <p>{status.state === 'accepted' ? "Acceptée" : "En attente d'approbation"}</p>
                    </SingleInfo>
            }
            {
                (createdAt || updatedAt || status) &&
                <SingleEntityStatus createdAt={createdAt} updatedAt={updatedAt} status={status} />
            }
        </div>
    )

    return (
        <>
        
          {/*   <form 
                onSubmit={submitHandler} 
                className={`${styles["create-person-form"]}`}
            >
            */}
                <SingleBase
                    header={header}
                    fullWidthContent={fullWidthContent}
                    contentColumnLeft={contentColumnLeft}
                    contentColumnRight={contentColumnRight}
                    footer={footer}
                />

                <div className="d-flex pt-4 align-items-end flex-column">
                    <Button disabled={!formState.isValid} onClick={submitHandler}>
                        Soumettre
                    </Button>
                    {
                        !formState.isValid &&
                        <p className="p-2 mt-2 col-md-4 border border-danger rounded"><small>Attention, l'un des champs dans cette page n'est pas entré correctement et vous empêche de sauvegarder vos modifications.</small></p>
                    }
                </div>
             {/* </form> */}

            { modal.modal.display &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={modal.closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    <div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm 
                        name={modal.modal.enteredValues.name ? modal.modal.enteredValues.name : ''}   //Prefilled value
                        category="skills"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                modal.closeModal()
                            }
                        }}
                    />

                </Modal>
            }
        </>
    );
}

export default PersonSingleEdit
