import React, { useContext } from 'react'

//Custom hooks
import { useForm } from '../../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../../app/hooks/http-hook'

//Components 
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import RichTextarea from '../../../../../app/common/FormElements/RichTextArea/RichTextarea'

//contexts
import { AuthContext } from '../../../../../authentication/context/auth-context'
import { MessageContext } from '../../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Form validators
import {VALIDATOR_REQUIRE} from '../../../../../app/utils/validators'

//Styling
import styles from './CreateOrganisationForm.module.scss'



const CreateOrganisationForm = () => {

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const { isLoading, sendRequest} = useHttpClient();

    //State of the form
    const [formState, inputHandler] = useForm(
    {
        name: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        url: {
            value: '',
            isValid: true
        },
        contactPoint: {
            value: '', 
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
                    nom: formState.inputs.name.value,
                    description:  formState.inputs.description.value, 
                    url: formState.inputs.url.value,
                    contactPoint: formState.inputs.contactPoint.value 
                } 

            };

            //Send the request with the specialized hook
            const response = await sendRequest(
                "/organisations/create",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            )

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

        <form onSubmit={submitHandler} className={`col-12 ${styles["create-organisation-form"]}`}>
            
            <Input 
                name="name"
                label="Nom de l'organisation"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Cette information est requise"
                onInput={inputHandler}
            />

            <RichTextarea 
                name="description"
                label="Description"
                onInput={inputHandler}
            />

            <Input 
                name="url"
                label="Hyperlien"
                type="url"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Cette information est requise"
                onInput={inputHandler}
            />

            <Input  
                name="contactPoint"
                label="Information de contact"
                onInput={inputHandler}
            />

            <div className="col-12">
                <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
            </div>
        </form>
      
        
      
    )

}

export default CreateOrganisationForm 
