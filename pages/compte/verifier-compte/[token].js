import Button from "@/src/common/FormElements/Button/Button";
import {externalApiRequest} from "@/src/hooks/http-hook";
import PageHeader from "@/src/layouts/Header/PageHeader";
import Router from "next/router";
import {useContext} from "react";
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";
import {useFormUtils} from "@/src/hooks/useFormUtils/useFormUtils";
import Input from "@/src/common/FormElements/Input/Input";


/**
 * @param {boolean} verifyState : true means got verified, false means token expired, null means token invalid
 */
const verifyAccount = props => {
    //Import message context 
    const msg = useContext(MessageContext);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            email: {
                value: "",
                isValid: false
            },
        }, { displayResMessage: true}
    )

    const resendToken = async () => {
        const apiResponse = await externalApiRequest(
            "/verify-account/resend",
            {
                body: JSON.stringify({data: { email: formState.inputs.email.value }}),
            }
        );
        if(apiResponse.error){
            if(apiResponse.code === 200){
                msg.addMessage({ 
                    text: "Veuillez attendre 5 minutes entre l'envoie d'un nouveau courriel",
                    positive: false
                })
            }
            else {
                if(apiResponse.code === 418){
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
            Router.push("/compte/a-confirmer")
        }
    }
    
    return (
        <form>
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Page de confirmation de compte"}
                //description={"Page de confirmation"}
            />
            {
                props.verifyState == null &&
                <>
                    <h2>Ce lien est erroné</h2>
                    <div>Réessayer à nouveau</div>
                </>
            }
            {
                props.verifyState === false &&
                <>
                    <h2>Malheureusement, le lien a expiré...</h2>
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
                </>
            }
            {
                props.verifyState === true &&
                <>
                    <h2>Votre compte a bien été vérifié!</h2>
                    <div>Vous pouvez maintenant vous connecter</div>
                    <Button className="my-3" href="/compte/connexion">Se connecter</Button>
                </>
            }
        </form>
    )
}

export default verifyAccount;

export async function getServerSideProps(context) {
    const { token } = context.query;
    let verifyState;
    
    //Sends request to verifyAccount
    const response = await externalApiRequest(
        `/verify-account/${token}`,
        { method: 'GET' }
    );

    if(!response.error && response.code === 200){
        //If no error, then account got verified
        verifyState = true;
    }
    else {
        if(response.code === 200)
            verifyState = false;

        else
            //Already verified account
            //Token is invalid (not right lenght or doesn't exists)
            verifyState = null;
    }

    return {props: {verifyState : verifyState}}
};


