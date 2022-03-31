import React, { useContext, useState, useEffect, useMemo } from 'react'

import Link from 'next/link'
import Router from 'next/router'

import { AuthContext } from '../../../context/auth-context'

//Validators
import {VALIDATOR_REQUIRE} from '../../../../app/utils/validators'

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../app/hooks/http-hook'

//Form components
import Input from '../../../../app/common/FormElements/Input/Input'
import Button from '../../../../app/common/FormElements/Buttons/Button/Button'
import Message from '../../../../app/common/Message/Message'

//Styling
import styles from './Login.module.scss'

const Login = () => {

    const [message, setMessage] = useState(null)


    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Extract the functions inside useHttpClient
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    /*
        First of all, verify if the user is logged in.
        If he is, then redirect him in the account page
    */
    useEffect(() => {
          if(auth.isLoggedIn) {
            Router.push('/compte')
          }
    }, [auth.isLoggedIn])


    const [formState, inputHandler] = useForm(
        {
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, 
    false)

    //Submit the form
    const authSubmitHandler = async event => {

        event.preventDefault();

        if(auth.isLoggedIn){

            //redirect the user to the account page. For now at least

        } else {

            //Make sure that the form is valid before submitting it
            if(formState.isValid){

                try {

                    const baseApiRoute = 'http://localhost' + ':' + '8000';
                    //const apiPingRoute = baseApiRoute + '/ping';
    
                    const apiDefaultHeaders = {
                        'Origin': 'http://localhost:3000',
                        "Content-Type": "application/json"
                        //"Content-Type": "application/x-www-form-urlencoded"
                    }
        
                    const formData = {
                        username:  formState.inputs.username.value,
                        password: formState.inputs.password.value //@todo encrypt with app key before sending? or https is enought ?
                    };

                    //Send the request with the specialized hook
                    const response = await sendRequest(
                        baseApiRoute + "/login",
                        'POST',
                        JSON.stringify(formData),
                        { 'Content-Type': 'application/json' }
                    )
    
                    //const responseData = await response.json() || {};
                    ///const responseData = JSON.parse(responseDataresponseRaw) || {};
    
                    //If an error has been saved in the hook
                    if(response.error){

                        //Display the error message
                        setMessage({
                            text: response.code,
                            positive: false
                        })

                        throw new Error(response);
                    }

                    const newMessage = {
                        text: response.message,
                        positive: true                    }

                    setMessage(newMessage)

                    console.log(response.userConnectedToken)
                    
                    auth.login(responseData.userConnectedToken);

    
    
    
                } catch(err){
    
                    /*
                        Reaction to define if the user os not autorize
                    */
                    console.log(err);

                    

                }

            } else {

                /*
                    Send a message if the form is not valid
                */
            }

            
        }
    }
/*
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
    })
*/
    return (
        <section className={styles.authPage}>


            {/* Display the messages */}
            { (error || message) && 
                    <Message clearState={() => clearError}>
                        {error}
                    </Message> 
            }

            <form onSubmit={authSubmitHandler}>

                <h3 className="blue" >Connexion</h3>

                <Input
                    id="username"
                    type="text"
                    label="Nom d'utilisateur"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    onInput={inputHandler}
                />   

                <Input
                    id="password"
                    type="password"
                    label="Mot de passe"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un mot de passe valide"
                    onInput={inputHandler}
                />   

                <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>

                <p className={`${styles.formRedirection} col-12`}>Vous n'avez pas encore de compte ? 
                    <span className="blue">
                        <Link href="/compte/inscription"> C'est par ici.</Link>
                    </span>
                </p>
                <p className={`${styles.formRedirection} col-12`}>Vous avez oublié votre mot de passe ?
                    <span className="blue">
                        <Link href="/compte/reinitialiser"> Vous pouvez le réinitialiser </Link>
                    </span>
                </p>
           

            </form>

            
        </section>
    )

}

export default Login;