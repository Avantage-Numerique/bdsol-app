import React from 'react'
import { useContext } from 'react'
import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { externalApiRequest } from '@/src/hooks/http-hook'
import Input from '@/src/common/FormElements/Input/Input'
import Button from '@/src/common/FormElements/Button/Button'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

const AConfirmer = () => {

    const msg = useContext(MessageContext);
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            email: {
                value: "",
                isValid: false
            },
        }, { displayResMessage: true}
    )

    //Function copy/pasted from /verifier-compte/[token].js
    //Possibilities of removing email input and ajust formState to the user that just registered if it's the case
    const resendToken = async () => {
        const apiResponse = await externalApiRequest(
            "/verify-account/resend",
            {
                body: JSON.stringify({data: { email: formState.inputs.email.value }}),
            }
        );
        msg.addMessage({ 
            text: "Un email de confirmation a été envoyé s'il s'agit d'un courriel associé à un compte",
            positive: true
        })
    }

    return (
        <>
            <section className='py-4'>
                <AuthenticationMessage 
                    header="En attente de confirmation" 
                    message="Vous devriez recevoir un courriel de confirmation sous peu. Une fois que vous aurez confirmé votre identité, vous pourrez vous connecter à votre compte."
                />
            </section>
            <div>
                <div>Voulez-vous un nouveau lien de confirmation?</div>
                <Input 
                    name="email"
                    label="Adresse Courriel"
                    formClassName="discrete-without-focus form-text-white h2"
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    formTools={formTools}
                />
                <Button type="button" onClick={resendToken}>Envoyer un nouveau lien de confirmation</Button>
                <p>*Noter qu'il y a un délai de 5 minutes pour un envoi vers une même adresse courriel</p>
            </div>
        </>
    );
}

export default AConfirmer