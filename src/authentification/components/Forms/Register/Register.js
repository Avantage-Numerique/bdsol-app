import React, {useContext, useEffect, useState} from 'react'
import Router from 'next/router'

//Custom hooks
import {useHttpClient} from '@/src/hooks/http-hook'
import {useSessionHook} from '@/auth/hooks/useSessionHook'
import {useAuth} from '@/auth/context/auth-context'
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'

//Form components
import Input from '@/src/common/FormElements/Input/Input'
import Button from '@/src/common/FormElements/Button/Button'
import Spinner from '@/src/common/widgets/spinner/Spinner'
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'
import {RouteLink} from '@/src/common/Components/RouteLink'

const Register = () => {

    const [isTOSAccepted, setIsTOSAccepted] = useState(false)
    //State that hold the form data
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(

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
            firstName: {
                value: '',
                isValid: true
            },
            lastName: {
                value: '',
                isValid: true
            }
        },
        {callbackFunction: () => login({
            "username": formState.inputs.username.value,
            "password": formState.inputs.password.value
        })}
        )

    //Import message context 
    const msg = useContext(MessageContext);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    const { login } = useSessionHook()

    //Extract the functions inside useHttpClient
    const {isLoading} = useHttpClient();

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
                        "firstName": formState.inputs.firstName.value,
                        "lastName": formState.inputs.lastName.value,
                        "name": formState.inputs.firstName.value + " " + formState.inputs.lastName.value,//that ways, should be handle by the api.//kept that way because of the future, user may want to update this on their account.
                        "tos": { accepted: isTOSAccepted}
                    }
                };

                //Send the request with the specialized hook
                const registerRes = await submitRequest(
                    "/register",
                    'POST',
                    newUser
                );
                if(!registerRes.error){
                    msg.addMessage({
                        text: "Soumission de création de compte effectuée",
                        positive: true
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

            <form className="bg-primary-lighter rounded form-box-shadow p-4" onSubmit={submitHandler}>

                <h3 className="text-dark-light mb-4">Création de compte</h3>
                <FormUI />

                <Input
                    name="username"
                    type="text"
                    label="Nom d'utilisateur"
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "TYPE_ALPHANUMERIC"},
                        {name: "MAX_LENGTH", specification: 16},
                        {name: "MIN_LENGTH", specification: 3}
                    ]}
                    formTools={formTools}
                />   
                <Input
                    name="firstName"
                    type="text"
                    label="Prénom"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                /> 
                <Input
                    name="lastName"
                    type="text"
                    label="Nom"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                /> 
                <Input
                    name="email"
                    type="email"
                    label="Courriel"
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "TYPE_EMAIL"}
                    ]}
                    formTools={formTools}
                /> 

                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "MIN_LENGTH", specification: 8}
                    ]}
                    formTools={formTools}
                />

                <Input
                    name="password2"
                    type="password"
                    label="Confirmation du mot de passe"
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "MIN_LENGTH", specification: 8}
                    ]}
                    formTools={formTools}
                />

                <div className="py-2 row form-check flex-nowrap d-flex no-wrap">
                    <input
                        readOnly
                        className="form-check-input col-4"
                        role="button"
                        type="checkbox"
                        onClick={() => {setIsTOSAccepted(!isTOSAccepted)}}
                        checked={isTOSAccepted}
                    />
                    <span className="form-check-label col-8">J'accepte les <RouteLink target="_blank" routeName={"termOfUse"}/></span>
                </div>

                <div className="col-12">
                    <Button type="submit" disabled={(!(formState.isValid) || !isTOSAccepted)}>Soumettre</Button>
                </div>
            </form>
            
        </>
    )

}

export default Register;