import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//Components 
import Button from '@/src/common/FormElements/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import {lang} from "@/src/common/Data/GlobalConstants";

//contexts
import {useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateOrganisationForm.module.scss'
import PersonRoleTemplate from '@/src/DataTypes/Person/Template/PersonRoleTemplate'
import Repeater from '@/src/common/Containers/Repeater/Repeater'
import TaxonomySelectTagListTemplate from '@/src/DataTypes/Taxonomy/Template/TaxonomySelectTagListTemplate'
import {getDefaultUpdateEntityStatus} from "@/DataTypes/Status/EntityStatus";


const CreateOrganisationForm = (props) => {

    const submitUri = props.uri ?? "create";

    const initialValues = props.initValues ? {...props.initValues} : {
        name: '',
        description: '',
        url: '',
        contactPoint: '',
        fondationDate: '',
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
            value: initialValues.fondationDate,
            isValid: true
        },
        offers: {
            value: initialValues.offers,
            isValid: true
        },
        team: {
            value: initialValues.team,
            isValid: true
        },
    },
    {
        clearForm: true,            //Clear the form
        displayResMessage: true     //Display a message to the user to confirm the succes
    })

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();

        const taxonomySubmitValue = [];
        const taxonomyFormStateValue = "offer";
        const taxonomyFormStateField = "offers";
        formState.inputs[taxonomyFormStateField].value.forEach( (elem) => {
            taxonomySubmitValue.push({
                [taxonomyFormStateValue]: elem[taxonomyFormStateValue]._id,
                status: getDefaultUpdateEntityStatus(auth.user)
            })
        });

        const formData = {

            "data": {
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value,
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: formState.inputs.fondationDate.value,
                offers: taxonomySubmitValue,
                team: formState.inputs.team.value,

                "status": {
                    "state": "pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id
                }//Hardcoded status to send at creation (Temporary, until we moderate it with the API)
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

                <TaxonomySelectTagListTemplate
                    tag="occupations"
                    name="offers"
                    idField="offer"
                    label="Offres de services"
                    category="occupations"
                    placeholder="Directeur-trice artistique ..."
                    formTools={formTools}
                    //taxonomyList={[...list]}
                    />

                <Repeater
                    name="team"
                    label="Membre de l'équipe"
                    addButtonLabel="Ajouter un membre"
                    noComponentLabel="Aucun membre ajouté"
                    formTools={formTools}
                    //maxRepeat="5"
                    >
                    
                    <PersonRoleTemplate
                        name="team"
                        label="Membre de l'équipe"
                        placeholder="Jean-Marc Parent ..."
                        //personList={[...list]}
                    />
                </Repeater>

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
      
        
        </>
    )

}
export default CreateOrganisationForm 
