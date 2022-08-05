import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth-context'

//Validators
import {VALIDATOR_REQUIRE} from '../../../../app/utils/validators'

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook'

//Form components
import Input from '../../../../app/common/FormElements/Input/Input'
import Button from '../../../../app/common/FormElements/Buttons/Button/Button'

//Styling
import styles from './ResetPassword.module.scss'

const ResetPassword = () => {

    const [formState, inputHandler] = useForm(
        {
        email: {
            value: '',
            isValid: false
        }
    }, 
    false)


    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);


    //Submit the form
    const authSubmitHandler = async event => {

        event.preventDefault();
        //console.log(event.target.userName.value);

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
                        email:  event.target.email.value
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
        <section className={styles.resetPassword}>

            <form onSubmit={authSubmitHandler}>

                <h3 className="text-primary" >Réinitialiser votre mot de passe</h3>
                <p>Entrer une adresse courriel pour récupérer votre mot de passe.</p>

                <Input
                    name="email"
                    type="email"
                    label="Adresse courriel"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer une adresse courriel valide"
                    onInput={inputHandler}
                />     

                <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
           
            </form>

            
        </section>
    )

}

export default ResetPassword;