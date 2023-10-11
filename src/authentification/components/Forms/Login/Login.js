import React, {useContext, useEffect} from 'react';

import Link from 'next/link';

//Context
import {useAuth} from '@/auth/context/auth-context';
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context';

//Custom hooks
import {useForm} from '@/src/hooks/form-hook';
import {useSessionHook} from '@/auth/hooks/useSessionHook';


//Form components
import Input from '@/src/common/FormElements/Input/Input';
import Button from '@/src/common/FormElements/Button/Button';
import Spinner from '@/src/common/widgets/spinner/Spinner';

//Styling
import styles from './Login.module.scss';

const Login = () => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();
    const msg = useContext(MessageContext);

    //Extract the functions inside the session hook
    const { login, isLoading } = useSessionHook();

    /*
        First of all, verify if the user is logged in.
        If he isn't, then redirect him in the account page
    */
    useEffect(() => {
          if(auth.isLoggedIn) {
            //Router.push('/compte')
          }
    }, [auth.isLoggedIn])


    const [formState, formTools] = useForm(
        {
        username: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        }
    }, 
    false)


    //Submit the form
    const authSubmitHandler = async event => {

        event.preventDefault();

        if(auth.isLoggedIn){

            //redirect the user to the account page. 
            //Router.push('/compte');

        } else {

            //Make sure that the form is valid before submitting it
            if(formState.isValid){

                const formData = {
                    username:  formState.inputs.username.value,
                    password: formState.inputs.password.value //@todo encrypt with app key before sending? or https is enought ?
                };
                
                //Call the login hook responsible for the connection
                await login(formData);

            } else {
                /*
                    Send a message if the form is not valid
                */
                msg.addMessage({ 
                    text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                    positive: false 
                });
            }
        }
    }

    return (
        <section className={styles.authPage}>

            {/* Spinner to display when the app is waiting for the api*/}
            {isLoading && <Spinner />}

            <form onSubmit={authSubmitHandler}>
                <div className={"d-flex flex-column"}>
                    <h3 className="text-primary" >Connexion</h3>

                    <Input
                        name="username"
                        type="text"
                        label="Nom d'utilisateur"
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        errorText="Veuillez entrer un nom d'utilisateur valide"
                        formTools={formTools}
                        className={"pb-3"}
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
                        className={"pb-3"}
                    />

                    <div className={"pb-3"}>
                        <Button type="submit" size="slim" disabled={!formState.isValid}>Me connecter</Button>
                    </div>

                    <p className={`${styles.formRedirection} pb-1`}>
                        <Link href="/compte/inscription"> Créez votre compte</Link>
                    </p>

                    <p className={`${styles.formRedirection}`}>
                        Vous avez oublié votre mot de passe ?
                        <Link href="/compte/reinitialiser"> Réinitialisé votre mot de passe.</Link>
                    </p>
                </div>
            </form>
            
        </section>
    )

}

export default Login;