import React, { useContext } from 'react'
import { AuthContext } from '../../../context/auth-context'
import Link from 'next/link'

//Validators
import {VALIDATOR_REQUIRE} from '../../../../app/utils/validators'

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook'

//Form components
import Input from '../../../../app/common/FormElements/Input/Input'
import Button from '../../../../app/common/FormElements/Buttons/Button/Button'

//Styling
import styles from './Login.module.scss'

const Login = () => {

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

                auth.isLoggedIn = true;


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
        <section className={styles.authPage}>

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