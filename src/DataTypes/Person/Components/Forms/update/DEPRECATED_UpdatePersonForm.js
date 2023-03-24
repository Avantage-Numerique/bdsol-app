import React from "react";
//Hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import { useModal } from '@/src/hooks/useModal/useModal';
import {useAuth} from "@/auth/context/auth-context";

import {lang} from "@/src/common/Data/GlobalConstants";
import styles from './UpdatePersonForm.module.scss';

//Component
import Modal from "@/src/hooks/useModal/Modal/Modal";
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm';

//FormData
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag';


const DEPRECATED_UpdatePersonForm = ({initValues, positiveRequestActions}) => {

    //Authentication ref
    const auth = useAuth();

    //Modal hook
    const modal = useModal()

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools, transmuteTaxonomyTargetInput } = useFormUtils(
        {
            _id: {
                value: initValues._id ? initValues._id : "",
                isValid: true
            },
            firstName: {
                value: initValues.firstName ? initValues.firstName : "",
                isValid: false
            },
            lastName: {
                value: initValues.lastName ? initValues.lastName : "",
                isValid: false
            }, 
            nickName: {
                value: initValues.nickname ? initValues.nickname : "",
                isValid: true
            },
            description: {
                value: initValues.description ? initValues.description : "",
                isValid: true
            },
            catchphrase: {
                value: initValues.catchphrase ? initValues.catchphrase : "",
                isValid: true
            },
            occupations: {
                value: initValues.occupations ? initValues.occupations : [],
                isValid: true
            },
            domains: {
                value: initValues.domains ? initValues.domains : [],
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
                    id: formState.inputs._id.value,
                    lastName: formState.inputs.lastName.value,
                    firstName:  formState.inputs.firstName.value, 
                    nickname: formState.inputs.nickName.value,
                    description: formState.inputs.description.value,
                    catchphrase: formState.inputs.catchphrase.value,
                    occupations: getSelectedToFormData(formState.inputs.occupations.value, "occupation", auth.user),
                    domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user)
                }
            };

            //Send the request with the specialized hook
            submitRequest(
                "/persons/update",
                'POST',
                formData
            );

        }

    return (
        <>
            <form onSubmit={submitHandler} className={`${styles["update-form"]}`}>

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
                    formTools={formTools}
                />
                
                <RichTextarea 
                    name="description"
                    label="Biographie / description"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                />

                <Input
                    name="catchphrase"
                    label={lang.catchphrase}
                    formTools={formTools}
                />

                <Select2Tag
                    label={lang.Occupations}
                    searchField="name"
                    fetch="/taxonomies/list"
                    requestData={{category:"occupations", name:""}}
                    name="occupations"
                    idField="occupation"
                    placeholder={lang.occupationsPlaceholder}
                    formTools={formTools}
                    creatableModal={modal}
                    />

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

                <Button type="submit" disabled={!formState.isValid}>{lang.submit}</Button>

            </form>

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
    )
}

export default DEPRECATED_UpdatePersonForm
