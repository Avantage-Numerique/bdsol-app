import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useForm } from '@/src/hooks/form-hook'
import { useHttpClient } from '@/src/hooks/http-hook'

//Components 
import Button from '@/src/common/FormElements/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import FileInput from '@/src/common/FormElements/FileInput/FileInput'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import {lang} from "@/src/common/Data/GlobalConstants";

//contexts
import {useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateOrganisationForm.module.scss'
import PersonRoleTemplate from '@/src/DataTypes/Person/Template/PersonRoleTemplate'
import Repeater from '@/src/common/Containers/Repeater/Repeater'
import TaxonomyTagListTemplate from '@/src/DataTypes/Taxonomy/Template/TaxonomyTagListTemplate'



const CreateOrganisationForm = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const { isLoading, sendRequest} = useHttpClient();

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

    //State of the form
    const [formState, formTools] = useForm(
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
        }
    },
    false)

    //Function to submit the form
    const submitHandler = async event => {

        event.preventDefault();
        
        //Make sure that the form is valid before submitting it
        if(formState.isValid){

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
                        "state": "pending",
                        "requestedBy": auth.user.id,
                        "lastModifiedBy": auth.user.id
                    }//Hardcoded status to send at creation (Temporary, until we moderate it with the API)
                } 

            };

            //Send the request with the specialized hook
            const response = await sendRequest(
                "/organisations/create",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            );

            /* 
                Display a message relatively to the form validity
            */

            //Positive answer
            if(!response.error){

                msg.addMessage({ 
                    text: response.message,
                    positive: true 
                })

            //Negative answer
            } else {                    
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }

        } else {

            //Something happened and the server didn't returned and answer
            msg.addMessage({ 
                text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                positive: false
            })
        }
    }
    
    return (
        <>
            { isLoading && <Spinner fixed />}

            <form onSubmit={submitHandler} className={`col-12 ${styles["create-organisation-form"]}`}>

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

                <TaxonomyTagListTemplate
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
