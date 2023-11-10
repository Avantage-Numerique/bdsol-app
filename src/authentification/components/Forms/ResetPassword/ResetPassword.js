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
import { externalApiRequest } from '@/src/hooks/http-hook'

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
            const apiResponse = await externalApiRequest(
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
        <section className={styles.resetPassword}>
            <form>
                <div className={"d-flex flex-column"}>

                    <h3 className="text-primary">Réinitialiser votre mot de passe</h3>
                    <p>Entrer une adresse courriel pour récupérer votre mot de passe.</p>

                    <Input
                        name="email"
                        type="email"
                        label="Adresse courriel"
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        errorText="Veuillez entrer une adresse courriel valide"
                        formTools={formTools}
                        className={"pb-3"}
                        />
                    <div>
                        <Button type="button" onClick={submitHandler} disabled={!formState.isValid}>Soumettre</Button>
                    </div>
                    <p>*Noter qu'il y a un délai de 5 minutes pour un envoi vers une même adresse courriel</p>
                </div>
            </form>
        </section>
    )

}

export default ResetPassword;