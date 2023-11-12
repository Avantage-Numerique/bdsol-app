import React from 'react'
import { useContext } from 'react'
import AuthenticationMessage from '@/auth/components/Commons/AuthenticationMessage/AuthenticationMessage'
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { externalApiRequest } from '@/src/hooks/http-hook'
import Input from '@/src/common/FormElements/Input/Input'
import Button from '@/src/common/FormElements/Button/Button'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

const confirmationForm = () => {

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
        if(apiResponse.error){
            if(apiResponse.code == 200){
                msg.addMessage({ 
                    text: "Veuillez attendre 5 minutes entre l'envoie d'un nouveau courriel",
                    positive: false
                })
            }
            else {
                if(apiResponse.code == 418){
                    //I'm a tea pot
                    msg.addMessage({
                        text: "Le compte est déjà vérifier, vous pouvez vous connecter.",
                        positive: true
                    })
                    Router.push("/compte/connexion")
                }
                else{
                    msg.addMessage({ 
                        text: "Courriel invalide",
                        positive: false 
                    })
                }
            }
        }
        else {
            msg.addMessage({ 
                text: "Un email de confirmation a été envoyé",
                positive: true
            })
        }
    }

    return (
        <div>
            <div className="border-bottom my-4"></div>
            <h3 className="fs-5 text-dark-light">Voulez-vous un nouveau lien de confirmation?</h3>
            <Input 
                name="email"
                className="my-4"
                label="Adresse Courriel"
                validationRules={[
                    {name: "REQUIRED"},
                    {name: "TYPE_EMAIL"}
                ]}
                formTools={formTools}
            />
            <Button type="button" onClick={resendToken}>Envoyer un nouveau lien de confirmation</Button>
        </div>
    )
}

const AConfirmer = () => {

    return (
        <section className='py-4 d-flex justify-content-center'>
            <AuthenticationMessage 
                header="En attente de confirmation" 
                message="Vous devriez recevoir un courriel de confirmation sous peu. Une fois que vous aurez confirmé votre identité, vous pourrez vous connecter à votre compte."
                Added_content={confirmationForm}
            />
        </section>
    );
}

export default AConfirmer