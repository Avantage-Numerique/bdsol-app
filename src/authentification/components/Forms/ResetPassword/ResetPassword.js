import {useAuth} from '@/auth/context/auth-context'

//Custom hooks / Context
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useContext } from 'react'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'


//Form components
import Input from '@/src/common/FormElements/Input/Input'
import Button from '@/src/common/FormElements/Button/Button'

//Styling
import styles from './ResetPassword.module.scss'
import { clientSideExternalApiRequest } from '@/src/hooks/http-hook'

const ResetPassword = () => {

    const msg = useContext(MessageContext);

    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            email: {
                value: '',
                isValid: false
        }
    },
    {
        displayResMessage: true,     //Display a message to the user to confirm the succes
    });

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Submit the form
    const submitHandler = async event => {

        event.preventDefault();

        if(auth.user.isLoggedIn){
            //Display a message to let the user know that he is already logged in
            msg.addMessage({ 
                text: "Vous êtes présentement connecté",
                positive: true
            })
        }
        else {
            const apiResponse = await clientSideExternalApiRequest(
                "/reset-password",
                { body: JSON.stringify({data: { email: formState.inputs.email.value }})}
            );

            msg.addMessage({
                text: "Un email sera envoyé s'il est associé à un compte.",
                positive: true
            })
        }  
    }

    return (
        <section className={`header-less-page  ${styles.resetPassword}`}>
            <form className="bg-primary-lighter rounded form-box-shadow">
                <div className={"d-flex flex-column"}>

                    <h3 className="text-dark-light mb-4">Réinitialiser votre mot de passe ou récupérer votre nom d'utilisateur.</h3>
                    <p>Entrer l'adresse courriel associé à votre compte.</p>
                    <FormUI />
                    <Input
                        name="email"
                        type="email"
                        label="Adresse courriel"
                        validationRules={[
                            {name: "REQUIRED"},
                            {name: "TYPE_EMAIL"}
                        ]}
                        formTools={formTools}
                    />
                    <div className="mt-3">
                        <Button type="button" onClick={submitHandler} disabled={!formState.isValid}>Soumettre</Button>
                    </div>
                    <p>*Si vous n'avez pas reçu le courriel, vérifier vos courriel indésirable, sinon veuillez attendre 5 minutes avant de soumettre à nouveau.</p>
                </div>
            </form>
        </section>
    )

}

export default ResetPassword;