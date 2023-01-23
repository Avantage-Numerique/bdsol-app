import React, { useState } from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import FileInput from '@/src/common/FormElements/FileInput/FileInput'
import Modal from '@/src/common/Containers/Modal/Modal'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import TaxonomyTagListTemplate from '@/src/DataTypes/Taxonomy/Template/TaxonomyTagListTemplate'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'

const CreatePersonForm = () => {
    const auth = useAuth();
    
    const [modal, setModal] = useState({
        display: false,
        //Values to be passed from the person form to the taxonomy form
        enteredValues: {
            name: ''            //Only the name of the taxonomy
        },
        callback: () => {}
    })

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
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
        mainImage: {
            value: "",
            isValid: true
        }
    }
    );

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        console.log(formState.inputs.mainImage.value);
        //const rawFromData = new FormData();
        const formData = {
            'data': {
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
            }
        };
        formData.mainImage = formState.inputs.mainImage.value;
        console.log(formData.mainImage);

        //rawFromData.append('data', JSON.stringify(formData));
        //rawFromData.append('mainImage', formState.inputs.mainImage.value);

        console.log(formData);

        //Send the request with the specialized hook
        submitRequest(
            "/persons/create",
            'POST',
            formData,
            {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
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

                <FileInput
                    name="mainImage"
                    label="Image principale"
                    accept="image/*"
                    formTools={formTools}
                    validationRules={[
                        {name: "FILE_MAX_SIZE", specification: 2}
                    ]}
                />

                <TaxonomyTagListTemplate
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

            { modal && modal.display &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col"}>
                                <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                            </div>
                            <div className="col-auto px-0">
                                <Button onClick={() => {setModal(prev => ({...prev, display: false}))}}>Fermer</Button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["hor-line"]}`}></div>
                    <CreateTaxonomyForm 
                        name={modal.enteredValues.name ? modal.enteredValues.name : ''}   //Prefilled value
                        category="occupations"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {
                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.callback(requestResponse.data)
                                //Close the modal 
                                setModal(prev => ({...prev, display: false}))
                            }
                        }}
                    />
                </Modal>
            }
        </>
    );
}

export default CreatePersonForm
