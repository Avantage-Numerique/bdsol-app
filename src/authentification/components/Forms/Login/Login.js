import React, {useContext, useEffect} from 'react';

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
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
import Router from 'next/router'

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
          if(auth.user.isLoggedIn) {
            Router.push('/compte')
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

    return (
        <section className={`header-less-page ${styles.authPage}`}>

            {/* Spinner to display when the app is waiting for the api*/}
            {isLoading && <Spinner />}

            <form onSubmit={authSubmitHandler} className="bg-primary-lighter rounded">
                <div className={"d-flex flex-column"}>
                    <h3 className="text-dark-light mb-4" >Connexion</h3>

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
                        <Button text_color="secondary" href="/compte/inscription"> Créez votre compte</Button>
                    </p>
                    
                    <div className="d-flex flex-wrap">
                        <p className={`fs-6 ${styles.formRedirection}`}>
                            Vous avez oublié votre mot de passe ?
                        </p>
                        <Button className="fs-6" text_color="secondary" href="/compte/reinitialiser"> Réinitialisé votre mot de passe.</Button>
                
                    </div>
                </div>
            </form>
            
        </section>
    )

}

export default Login;