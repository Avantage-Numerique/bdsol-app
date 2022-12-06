import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useHttpClient } from '@/src/hooks/http-hook'

//Components 
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select2 from '@/src/common/FormElements/Select2/Select2'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import {lang} from "@/src/common/Data/GlobalConstants";

//contexts
import {AuthContext, useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateOrganisationForm.module.scss'



const CreateOrganisationForm = () => {

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
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: true
        },
        url: {
            value: '',
            isValid: true
        },
        contactPoint: {
            value: '', 
            isValid: true
        },
        fondationDate: {
            value: '',
            isValid: true
        },
        offers: {
            value: [],
            isValid: true
        },
        team: {
            value: [],
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

        const formData = {

            "data": {
                name: formState.inputs.name.value,
                description:  formState.inputs.description.value, 
                url: formState.inputs.url.value,
                contactPoint: formState.inputs.contactPoint.value,
                fondationDate: formState.inputs.fondationDate.value,
                offers: formState.inputs.offers.value,
                team: formState.inputs.team.value,
                
                "status": {
                    "state": "Pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id
                }//Hardcoded status to send at creation (Temporary, until we moderate it with the API)
            } 

        };

        //Send the request with the specialized hook
        submitRequest(
            "/organisations/create",
            'POST',
            formData
        );

    }

    const offerSelectRequestData = {
        "data": {
            "category": "occupations",
            "name": ""
        }
    };
    const teamSelectRequestData = {
        "data": {
            "firstName": ""
        }
    };

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
                    placeholder="Exemple : https://siteWeb.com/"
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

                <Select2
                    name="offers"
                    searchField="name"
                    label="Offres de services"
                    request="/taxonomies"
                    requestData={offerSelectRequestData}
                    tag="occupations"
                    formTools={formTools}
                    placeholder="Directeur-trice artistique ..."
                />

                <Select2
                    name="team"
                    searchField="firstName"
                    label="Membre de l'équipe"
                    request="/persons"
                    requestData={teamSelectRequestData}
                    //tag="occupations"
                    formTools={formTools}
                    placeholder="Jean-Marc Parent ..."
                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
      
        
        </>
    )

}
export default CreateOrganisationForm 
