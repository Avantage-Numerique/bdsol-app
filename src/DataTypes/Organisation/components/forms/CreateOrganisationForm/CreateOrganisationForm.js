import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import {lang} from "@/src/common/Data/GlobalConstants";
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Hooks
import {useAuth} from '@/auth/context/auth-context';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import { useModal } from '@/src/hooks/useModal/useModal';

//Component
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm';
import Modal from '@/src/hooks/useModal/Modal/Modal';

import {getDefaultCreateEntityStatus, getDefaultUpdateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag';
import styles from './CreateOrganisationForm.module.scss'
import {getDateFromIsoString} from "@/src/utils/DateHelper";


const CreateOrganisationForm = (props) => {

    //Modal hook
    const modal = useModal()

    const submitUri = props.uri ?? "create";

    const positiveRequestActions= props.positiveRequestActions;

    const initialValues = props.initValues ? {...props.initValues} : {
        name: '',
        description: '',
        url: '',
        contactPoint: '',
        fondationDate: '',
        catchphrase: '',
        offers: [],
        team: [],
    }

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
            value: initialValues.name,
            isValid: false
        },
        description: {
            value: initialValues.description,
            isValid: true
        },
        url: {
            value: initialValues.url,
            isValid: true
        },
        contactPoint: {
            value: initialValues.contactPoint,
            isValid: true
        },
        fondationDate: {
            value: getDateFromIsoString(initialValues.fondationDate),
            isValid: true
        },
        catchphrase: {
            value: initialValues.catchphrase,
            isValid: true
        },
        domains: {
            value: initialValues.domains,
            isValid: true
        }
    },
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        })

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const formData = {
            "data": {
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value,
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: formState.inputs.fondationDate.value,
                catchphrase: formState.inputs.catchphrase.value,
                domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user),
                "status": submitUri === "create" ? getDefaultCreateEntityStatus(auth.user) : getDefaultUpdateEntityStatus(auth.user)
            }
        };

        if (submitUri === "update") {
            formData.data.id = initialValues._id
        }

        //Send the request with the specialized hook
        submitRequest(
            `/organisations/${submitUri}`,
            'POST',
            formData
        );
    }
    
    return (
        <>
            <form onSubmit={submitHandler} className={`col-12 ${styles["create-organisation-form"]}`}>
                <FormUI />
                <Input 
                    name="name"
                    label="Nom de l'organisation"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                />

                <RichTextarea
                    name="description"
                    label="Description"
                    formTools={formTools}
                />

                <Input
                    name="url"
                    label="Hyperlien"
                    type="url"
                    pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                    placeholder="Une url avec le https, exemple : https://siteWeb.com"
                    formTools={formTools}
                />

                <Input
                    name="contactPoint"
                    label="Information de contact"
                    tip={{
                        header: "À noter",
                        body: "Cette information vise à offrir une option pour rejoindre un représentant de l'organisation."
                    }}
                    placeholder="Adresse courriel, numéro de téléphone, etc..."
                    formTools={formTools}
                />

                <Input
                    name="fondationDate"
                    label="Date de fondation"
                    type="date"
                    formTools={formTools}
                />

                <Input
                    name="catchphrase"
                    label={lang.catchphrase}
                    formTools={formTools}
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


                <blockquote>
                    * Note : {lang.organisationUploadMediaMainImage}
                </blockquote>

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
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
export default CreateOrganisationForm 
