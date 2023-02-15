import React from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useModal } from '@/src/hooks/useModal/useModal'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import TaxonomySelectTagListTemplate from '@/src/DataTypes/Taxonomy/Template/TaxonomySelectTagListTemplate'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

const CreatePersonForm = () => {
    
    //Authentication ref
    const auth = useAuth();

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools, transmuteTaxonomyTargetInput } = useFormUtils(
        {
            firstName: {
                value: '',
                isValid: false
            },
            lastName: {
                value: '',
                isValid: false
            }, 
            nickName: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: true
            },
            occupations: {
                value: [],
                isValid: true
            },

        },
        {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );
    

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            "data": {
                "lastName": formState.inputs.lastName.value,
                "firstName":  formState.inputs.firstName.value,
                "nickname": formState.inputs.nickName.value,
                "description": formState.inputs.description.value,
                "occupations": transmuteTaxonomyTargetInput({
                    inputs: formState.inputs["occupations"],
                    fieldName:"occupation",
                    user: auth.user
                }),
                "status": getDefaultCreateEntityStatus(auth.user),
            }
        };

        /*

            CODE TO REPRODUCE INTO THE RIGHT UI
            Upload a media file will be seperate from the creation of an account

        */

        /*

        const rawFromData = new FormData();
        const formData = {
            "lastName": formState.inputs.lastName.value,
            "firstName":  formState.inputs.firstName.value,
            "nickname": formState.inputs.nickName.value,
            "description": formState.inputs.description.value,
            "occupations": formState.inputs.occupations.value,
            "status": {
                "state": "pending",
                "requestedBy": auth.user.id,
                "lastModifiedBy": auth.user.id
            },
            "media": {
                "title": "allo",
                "alt": "picasso",
                "description": "une patate",
                "path": "toDetermine",
                "licence": "Public Domain (CC0)",
                "fileType": "image",
            }
            //Hardcoded status to send at creation (Temporary, until we moderate it with the API)
        };
        rawFromData.append("mainImage", formState.inputs.mainImage.value);
        rawFromData.append("data", JSON.stringify(formData));

        //rawFromData.append('data', JSON.stringify(formData));
        //rawFromData.append('mainImage', formState.inputs.mainImage.value);

        */
        //Send the request with the specialized hook
        /*
        await submitRequest(
            "/persons/create",
            'POST',
            formData,
            {
                //'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            {
                isBodyJson: false
            }
        );
        */
       await submitRequest(
            "/persons/create",
            'POST',
            JSON.stringify(formData)
        );
    }

    /*
        Categorie : nom de la taxonomie
        Name : Filtre à appliquer
    */
    const occupationSelectRequestData = {
        "data": {
            "category": "occupations",
            "name": ""
        }
    };


    return (
        <>
            <form 
                onSubmit={submitHandler} 
                className={`${styles["create-person-form"]}`}
                encType='multipart/form-data'
            >

                <FormUI />
                <Input 
                    name="firstName"
                    label="Prénom"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />

                <Input 
                    name="lastName"
                    label="Nom"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />

                <Input  
                    name="nickName"
                    label="Surnom"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                />
                
                <RichTextarea 
                    name="description"
                    label="Biographie / description"
                    formTools={formTools}
                />

                {/* 
                <FileInput
                    name="mainImage"
                    label="Image principale"
                    accept="image/*"
                    formTools={formTools}
                    validationRules={[
                        {name: "FILE_MAX_SIZE", specification: 2}
                    ]}
                />
                */}

                <TaxonomySelectTagListTemplate
                    tag="occupations"
                    searchField="name"
                    name="occupations"
                    label={lang.Occupations}
                    idField="occupation"
                    category="occupations"
                    placeholder={lang.occupationsPlaceholder}
                    formTools={formTools}
                    //taxonomyList={[...list]}
                    />

                <Button type="submit" disabled={!formState.isValid}>{lang.submit}</Button>

            </form>

            { modal.display &&
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
                        name={modal.enteredValues.name ? modal.enteredValues.name : ''}   //Prefilled value
                        category="occupations"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.callback(requestResponse.data._id)
                                
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

export default CreatePersonForm
