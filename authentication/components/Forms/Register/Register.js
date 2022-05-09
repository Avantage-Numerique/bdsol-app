import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth-context'

//Validators
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../../../app/utils/validators'

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook'

//Form components
import Input from '../../../../app/common/FormElements/Input/Input'
import Button from '../../../../app/common/FormElements/Buttons/Button/Button'

//Styling
import styles from './Register.module.scss'

const Register = () => {

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


    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);


    //Submit the form
    const submitHandler = async event => {

        event.preventDefault();

        if(auth.isLoggedIn){

            //Display a message to let the user know that he is already logged in

        } else {

            try{

                const response = await fetch('https://api.avantagenumerique.org/o/v1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        //name: event.target.userName.value,
                        email:  event.target.email.value,
                        password: event.target.password.value
                    })
                });

                const responseData = await response.json();

                //If 400 or 500 type of response, throw an error
                if(!response.ok){
                    throw new Error(responseData.message);
                }
                
                auth.login(responseData.token);


            } catch(err){
                console.log(err);
            }
        }
    }
/*
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
    })
*/
    return (
        <section className={styles.registerPage}>

            <form onSubmit={submitHandler}>

                <h3 className="blue" >Création de compte</h3>

                <Input
                    name="firstname"
                    type="text"
                    label="Prénom"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    onInput={inputHandler}
                />   

                <Input
                    name="lastname"
                    type="text"
                    label="Nom"
                    validators={[VALIDATOR_REQUIRE()]}
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
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Veuillez entrer un mot de passe valide"
                    onInput={inputHandler}
                />   

                <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>

            </form>

            { auth.isLoggedIn && <button onClick={auth.logout()}>Logout</button>}
            
        </section>
    )

}

export default Register;