import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useForm } from '@/src/hooks/form-hook'
import { useHttpClient } from '@/src/hooks/http-hook'

//Components 
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select from '@/src/common/FormElements/Select/Select'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import {lang} from "@/src/common/Data/GlobalConstants";

//contexts
import {AuthContext, useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Form validators
import {VALIDATOR_REQUIRE} from '@/src/utils/validators'

//Styling
import styles from './CreateOrganisationForm.module.scss'



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
                    offers: formState.inputs.offers.value
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

    const offerSelectRequestData = {
        "data": {
            "category": "occupations",
            "name": ""
        }
    };

    return (
        <>
            { isLoading && <Spinner fixed />}

            <form onSubmit={submitHandler} className={`col-12 ${styles["create-organisation-form"]}`}>
                
                <Input 
                    name="name"
                    label="Nom de l'organisation"
                    tip={{
                        header: "À noter",
                        body: "Assurez-vous de bien écrire le nom de l'organisation afin de faciliter les recherches."
                    }}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
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
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
                    placeholder="Exemple : https://siteWeb.com/"
                    formTools={formTools}
                />

                <Input  
                    name="contactPoint"
                    label="Information de contact"
                    placeholder="Adresse courriel, numéro de téléphone, etc..."
                    formTools={formTools}
                />

                <Input  
                    name="fondationDate"
                    label="Date de fondation"
                    type="date"
                    formTools={formTools}
                />

                <Select
                    name="offers"
                    label="Offres de services"
                    request="/taxonomies/list"
                    requestData={offerSelectRequestData}
                    tag="occupations"
                    formTools={formTools}

                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
      
        
        </>
    )

}

export default CreateOrganisationForm 
