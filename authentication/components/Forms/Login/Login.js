import React, { useContext, useEffect } from 'react';

import Link from 'next/link';
import Router from 'next/router';

//Context
import { AuthContext } from '../../../context/auth-context';
import { MessageContext } from '../../../../app/common/UserNotifications/Message/Context/Message-Context';

//Validators
import {VALIDATOR_REQUIRE} from '../../../../app/utils/validators';

//Custom hooks
import { useForm } from '../../../../app/hooks/form-hook';
import { useSessionHook } from '../../../hooks/useSessionHook';

//Form components
import Input from '../../../../app/common/FormElements/Input/Input';
import Button from '../../../../app/common/FormElements/Buttons/Button/Button';
import Spinner from '../../../../app/common/widgets/spinner/Spinner';

//Styling
import styles from './Login.module.scss';

const Login = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);
    const msg = useContext(MessageContext);

    //Extract the functions inside the session hook
    const { login, isLoading } = useSessionHook()

    /*
        First of all, verify if the user is logged in.
        If he isn't, then redirect him in the account page
    */
    useEffect(() => {
          if(auth.isLoggedIn) {
            Router.push('/compte')
          }
    }, [auth.isLoggedIn])


    const [formState, formTools] = useForm(
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

            //redirect the user to the account page. 
            Router.push('/compte')

        } else {

            //Make sure that the form is valid before submitting it
            if(formState.isValid){

                const formData = {
                    username:  formState.inputs.username.value,
                    password: formState.inputs.password.value //@todo encrypt with app key before sending? or https is enought ?
                };

                //Call the login hook responsible for the connection
                login(formData)


                    
            } else {

                /*
                    Send a message if the form is not valid
                */
                msg.addMessage({ 
                    text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                    positive: false 
                 })
            }

            
        }
    }

    return (
        <section className={styles.authPage}>

            {/* Spinner to display when the app is waiting for the api*/}
            {isLoading && <Spinner />}

            <form onSubmit={authSubmitHandler}>

                <h3 className="blue" >Connexion</h3>

                <Input
                    name="username"
                    type="text"
                    label="Nom d'utilisateur"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un nom d'utilisateur valide"
                    formTools={formTools}
                />   

                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veuillez entrer un mot de passe valide"
                    formTools={formTools}
                />   

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>

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