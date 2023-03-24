import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import Button from '@/src/common/FormElements/Button/Button';
import Input from '@/src/common/FormElements/Input/Input';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';
import {lang} from "@/src/common/Data/GlobalConstants";
import {useAuth} from '@/auth/context/auth-context';
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context';
import PersonRoleTemplate from '@/src/DataTypes/Person/Template/PersonRoleTemplate';
import Repeater from '@/src/common/Containers/Repeater/Repeater';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import {getDefaultCreateEntityStatus, getDefaultUpdateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag';
import styles from './CreateOrganisationForm.module.scss'
import {getDateFromIsoString} from "@/src/utils/DateHelper";


const CreateOrganisationForm = (props) => {

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
    const { FormUI, submitRequest, formState, formTools, transmuteTaxonomyTargetInput } = useFormUtils(
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
        offers: {
            value: initialValues.offers,
            isValid: true
        },
        domains: {
            value: initialValues.domains,
            isValid: true
        },
        team: {
            value: initialValues.team,
            isValid: true
        },
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
                offers: getSelectedToFormData(formState.inputs.offers.value, "offer", auth.user),
                domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user),
                team: formState.inputs.team.value,
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
                    label="Services offerts"
                    searchField="name"
                    fetch="/taxonomies/list"
                    requestData={{category:"occupations", name:""}}
                    name="offers"
                    idField="offer"
                    placeholder={lang.occupationsPlaceholder}
                    formTools={formTools}
                />

                <Select2Tag
                    label={lang.Domains}
                    searchField="name"
                    fetch="/taxonomies/list"
                    slug={"domains"}
                    requestData={{category:"domains", name:""}}
                    name="domains"
                    idField="domain"
                    placeholder={lang.domainsInputPlaceholder}
                    formTools={formTools}
                />

                <Repeater
                    name="team"
                    label="Membres de l'organisation"
                    addButtonLabel="Ajouter un membre"
                    noComponentLabel="Aucun membre ajouté"
                    formTools={formTools}
                    maxRepeat="6"
                    >
                    
                    <Input/>
                </Repeater>


                <blockquote>
                    * Note : {lang.organisationUploadMediaMainImage}
                </blockquote>

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
      
        
        </>
    )

}
export default CreateOrganisationForm 
