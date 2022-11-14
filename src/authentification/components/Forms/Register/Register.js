import React, { useContext,useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useForm } from '@/src/hooks/form-hook'
import { useHttpClient } from '@/src/hooks/http-hook'
import { useSessionHook } from '@/auth/hooks/useSessionHook'
import { useAuth } from '@/auth/context/auth-context'

//Form components
import Input from '@/src/common/FormElements/Input/Input'
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'


//Styling
import styles from './Register.module.scss'

const Register = () => {

    //State that hold the form data
    const [formState, formTools] = useForm(

        {
            username: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            password2: {
                value: '',
                isValid: false
            },
            avatar: {
                value: '',
                isValid: true
            },
            name: {
                value: '',
                isValid: true
            }
        
        }, 
    false)

    //Import message context 
    const msg = useContext(MessageContext);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    const { login } = useSessionHook()

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    /*
        First of all, verify if the user is logged in.
        If he is, then redirect him in the account page
    */
   useEffect(() => {
        if(auth.isLoggedIn) {
            Router.push('/compte')
        }
    }, [auth.isLoggedIn])


    //Submit the form
    const submitHandler = async event => {

        event.preventDefault();

        if(auth.isLoggedIn){

            //Notify the user
            msg.addMessage({ 
                text: "Vous avez déjà un compte.",
                positive: false 
            })

        } else {

            //Make sure that the two passwords matches
            if(formState.inputs.password.value === formState.inputs.password2.value){

                const newUser = {
                    "data": {
                        "username": formState.inputs.username.value,
                        "email": formState.inputs.email.value,
                        "password": formState.inputs.password.value,
                        "avatar": formState.inputs.avatar.value,
                        "name": formState.inputs.name.value
                    }
                };

                //Send the request with the specialized hook
                const response = await sendRequest(
                    "/register",
                    'POST',
                    JSON.stringify(newUser),
                    { 'Content-Type': 'application/json' }
                )

                /*
                    Display the proper message relative to the api response
                */
            
                //If positive
                if(!response.error){

                    /******
                     *    
                     *    WARNING 
                     * 
                     *    This is temporary, just to prevent the user from having to login after creating its account
                     *    BUT IT IS REALLY NOT OPTIMISED
                     * 
                     *******/
                    login({
                        "username": formState.inputs.username.value,
                        "password": formState.inputs.password.value
                    })

                    //Notify the user
                    msg.addMessage({ 
                        text: response.message,
                        positive: true 
                    })



                //If negative
                } else {                    
                    msg.addMessage({ 
                        text: response.message,
                        positive: false 
                    })
                }


            } else {

                //The two passwords do not match. 
                //Inform the user
                msg.addMessage({ 
                    text: "Les mots de passe entrés ne concordent pas. Veuillez les écrire à nouveau.",
                    positive: false 
                })

            }  

        }
    }
/*
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
    })
*/
    return (
        <>

            { isLoading && <Spinner />}

            <form className={`${styles["registration-form"]} auth-form-container`} onSubmit={submitHandler}>

                <h3 className="text-primary">Création de compte</h3>
                
                <Input
                    name="username"
                    type="text"
                    label="Nom d'utilisateur"
                    placeholder="Visible par tous"
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "TYPE_ALPHANUMERIC"}
                    ]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    formTools={formTools}
                />   
                <Input
                    name="name"
                    type="text"
                    label="Prénom et nom"
                    validators={[]}
                    placeholder="Invisible aux usagers"
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    formTools={formTools}
                /> 
                <Input
                    name="email"
                    type="email"
                    label="Courriel"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    errorText="Veuillez entrer une adresse courriel valide"
                    formTools={formTools}
                /> 

                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    errorText="Veuillez entrer un mot de passe valide"
                    formTools={formTools}
                /> 

                <Input
                    name="password2"
                    type="password"
                    label="Confirmation du mot de passe "
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    errorText="Veuillez entrer un mot de passe valide"
                    formTools={formTools}
                />   

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
            
        </>
    )

}

export default Register;