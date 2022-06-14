import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useForm } from '../../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../../app/hooks/http-hook'

//Components
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import RichTextarea from '../../../../../app/common/FormElements/RichTextArea/RichTextarea'
import Spinner from '../../../../../app/common/widgets/spinner/Spinner'

//contexts
import { AuthContext } from '../../../../../authentication/context/auth-context'
import { MessageContext } from '../../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Form validators
import {VALIDATOR_REQUIRE} from '../../../../../app/utils/validators'

//Styling
import styles from './CreatePersonForm.module.scss'

const CreatePersonForm = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    /*
        First of all, verify if the user is logged in.
        If he isn't, then redirect him in the connexion page
    */
   
   useEffect(() => {
        if(!auth.isLoggedIn) {

            msg.addMessage({ 
                text: "Vous devez être connecté pour pouvoir ajouter une entité à la base de données.",
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.isLoggedIn])
    

    //Extract the functions inside useHttpClient
    const { isLoading, sendRequest} = useHttpClient();

    //Custom hook to manage the validity of the form 
    const [formState, inputHandler] = useForm(
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
        biography: {
            value: '',
            isValid: true
        }

    }, 
    false)

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();
        
        //Make sure that the form is valid before submitting it
        if(formState.isValid){


            /*
                Data must have this shape 
                https://github.com/Avantage-Numerique/bdsol-api/blob/master/api/doc/Personnes.md
            */

            //There is no try/catch here because it is all handle by the custom hook

            const formData = {
                "data": {
                    "nom": formState.inputs.lastName.value,
                    "prenom":  formState.inputs.firstName.value, 
                    "surnom": formState.inputs.nickName.value,
                    "description": formState.inputs.biography.value 
                }
            };

            //Send the request with the specialized hook
            const response = await sendRequest(
                "/personnes/create",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            )

            //If the answer is positive
            if(!response.error){

                //Alert the user
                msg.addMessage({ 
                    text: response.message,
                    positive: true 
                })

            //If it is not positive for any reason
            } else {                    
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }

        } else {

            //The form is not valid. 
            //Inform the user
            msg.addMessage({ 
                text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                positive: false
            })

        }

    }

    return (
        <>
            { isLoading && <Spinner fixed />}

            <form onSubmit={submitHandler} className={`col-12 ${styles["create-person-form"]}`}>

                <Input 
                    name="firstName"
                    label="Prénom"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
                    onInput={inputHandler}
                />

                <Input 
                    name="lastName"
                    label="Nom"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
                    onInput={inputHandler}
                />

                <Input  
                    name="nickName"
                    label="Surnom"
                    onInput={inputHandler}
                />

                <RichTextarea 
                    name="biography"
                    label="Biographie"
                    onInput={inputHandler}
                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>

            </form>
        </>
    )
}

export default CreatePersonForm