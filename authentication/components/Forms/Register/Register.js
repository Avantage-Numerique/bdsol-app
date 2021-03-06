import React, { useContext,useEffect } from 'react'
import Router from 'next/router'


//Validators
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../../../app/utils/validators'

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../app/hooks/http-hook'
import { useSessionHook } from '../../../hooks/useSessionHook'

//Form components
import Input from '../../../../app/common/FormElements/Input/Input'
import Button from '../../../../app/common/FormElements/Buttons/Button/Button'
import Spinner from '../../../../app/common/widgets/spinner/Spinner'

//context
import { MessageContext } from '../../../../app/common/UserNotifications/Message/Context/Message-Context'
import { AuthContext } from '../../../context/auth-context'

//Styling
import styles from './Register.module.scss'

const Register = () => {

    //State that hold the form data
    const [formState, inputHandler] = useForm(

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
    const auth = useContext(AuthContext);

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
                text: "Vous avez d??j?? un compte.",
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
                    

                    console.log(response)

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
                    text: "Les mots de passe entr??s ne concordent pas. Veuillez les ??crire ?? nouveau.",
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

            <form className={`${styles["registration-form"]}`} onSubmit={submitHandler}>  

                <h3 className="blue">Cr??ation de compte</h3>

                <Input
                    name="name"
                    type="text"
                    label="Nom"
                    validators={[]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    onInput={inputHandler}
                /> 

                <Input
                    name="username"
                    type="text"
                    label="Nom d'utilisateur"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    onInput={inputHandler}
                />   

                <Input
                    name="email"
                    type="email"
                    label="Courriel"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Veuillez entrer une adresse courriel valide"
                    onInput={inputHandler}
                /> 

                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un mot de passe valide"
                    onInput={inputHandler}
                /> 

                <Input
                    name="password2"
                    type="password"
                    label="Confirmation du mot de passe "
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un mot de passe valide"
                    onInput={inputHandler}
                />   

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>
            </form>
            
        </>
    )

}

export default Register;