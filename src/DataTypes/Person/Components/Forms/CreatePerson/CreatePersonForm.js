import React from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useModal } from '@/src/hooks/useModal/useModal'

//Components
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select2 from '@/src/common/FormElements/Select2/Select2'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'


const CreatePersonForm = () => {
    
    //Authentication ref
    const auth = useAuth();

    //Modal hook
    const { modal, Modal, displayModal, closeModal } = useModal()

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
            }
        },
        {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );
/*
    const [modal, setModal] = useState({
        display: false,
        //Values to be passed from the person form to the taxonomy form
        enteredValues: {
            name: ''            //Only the name of the taxonomy
        },
        callback: () => {}
    })
*/

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            "data": {
                "lastName": formState.inputs.lastName.value,
                "firstName":  formState.inputs.firstName.value, 
                "nickname": formState.inputs.nickName.value,
                "description": formState.inputs.description.value,
                "occupations": formState.inputs.occupations.value,

                "status": {
                    "state": "Pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id
                }//Hardcoded status to send at creation (Temporary, until we moderate it with the API)
            }
        };

        //Send the request with the specialized hook
        submitRequest(
            "/persons/create",
            'POST',
            formData
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
            <form onSubmit={submitHandler} className={`${styles["create-person-form"]}`}>

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

                <Select2
                    name="occupations"
                    searchField="name"
                    label={lang.Occupations}
                    request="/taxonomies"
                    requestData={occupationSelectRequestData}
                    tag="occupations"
                    placeholder={lang.occupationsPlaceholder}
                    formTools={formTools}
                    displayModal={displayModal}
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
