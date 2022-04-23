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
import Message from '../../../../app/common/UserNotifications/Message/Message'

//Styling
import styles from './Login.module.scss'

const Login = () => {

    const [messages, setMessages] = useState([])

    console.log(messages)

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Extract the functions inside useHttpClient
    const { isLoading, sendRequest} = useHttpClient();

    const getCurrentTime = () => {
        const d = new Date()
        console.log("current time has been called")
        return d.getTime()
    }

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
            Router.push('/compte')

        } else {

            //Make sure that the form is valid before submitting it
            if(formState.isValid){

                try {
       
                    const formData = {
                        username:  formState.inputs.username.value,
                        password: formState.inputs.password.value //@todo encrypt with app key before sending? or https is enought ?
                    };

                    //Send the request with the specialized hook
                    const response = await sendRequest(
                        "/login",
                        'POST',
                        JSON.stringify(formData),
                        { 'Content-Type': 'application/json' }
                    )

                    //If the answer is positive
                    if(!response.error || response.code < 300 ){

                        //Accept the user
                        auth.login(response.userConnectedToken);

                        //Alert the user
                        setMessages([...messages, { 
                            text: response.message,
                            positive: true, 
                            creationTime: getCurrentTime()                 
                        }])


                    //If it is not positive for any reason
                    } else {                    

                        //Inform the user
                        setMessages([...messages, {
                            text: response.message,
                            positive: false,
                            creationTime: getCurrentTime()                    
                        }])

                    }
                    
                } catch(err) {
                    
                    setMessages([...messages, {
                        text: "Une erreur est survenue. Assurez-vous d'avoir une connexion fonctionnelle",
                        positive: false,
                        creationTime: getCurrentTime()                     
                    }])

                }

            } else {

                /*
                    Send a message if the form is not valid
                */
               setMessages([...messages, {
                    text: "Attention, le formulaire entré n'est pas valide. Assurez-vous de bien remplir tous les champs requis.",
                    positive: false,
                    creationTime: getCurrentTime()                     
                }])
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

            <div className={`${styles["message-section"]}`}>
                {/* Display the messages */}
                { messages.map(message => (
                    <Message 
                        key={ "login-message-" + message.creationTime } 
                        positiveReview={ message.positive } 
                        clean={() => { setMessages(
                            prevState => prevState.filter(i => i !== message)
                            )}}
                    >
                        {message.text}
                    </Message> 
                  )) 
                }
            </div>

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