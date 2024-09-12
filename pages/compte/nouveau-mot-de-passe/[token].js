import Button from "@/src/common/FormElements/Button/Button";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import PageHeader from "@/src/layouts/Header/PageHeader";
import Router, { useRouter } from "next/router";
import {useContext, useState, useEffect} from "react";
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";
import {useFormUtils} from "@/src/hooks/useFormUtils/useFormUtils";
import Input from "@/src/common/FormElements/Input/Input";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import AppRoutes from "@/src/Routing/AppRoutes";


/**
 * @param {boolean} verifyState : true means got verified, false means token expired, null means token invalid
 */
const forgottenPasswordReset = props => {
    //Import message context 
    const msg = useContext(MessageContext);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            password: {
                value: "",
                isValid: false
            },
            password2: {
                value: "",
                isValid: false
            },
        }, { displayResMessage: true}
    )

    //Check whether token is valid or expired to facilitate UX and change UI
    const [tokenIsValidState, setTokenIsValidState] = useState(true);
    const router = useRouter();
    useEffect(() => {
        async function checkTokenExistAndUnexpired() {
            const res = await clientSideExternalApiRequest("/reset-password/"+props.token, { method: 'GET'});
            setTokenIsValidState(!res.error)
        }
        checkTokenExistAndUnexpired();
    }, [router.asPath])

    const sendNewPassword = async () => {
        //Make sure that the two passwords matches
        if(formState.inputs.password.value !== formState.inputs.password2.value){
            msg.addMessage({ 
                text: "Les mots de passe entrés ne concordent pas. Veuillez les écrire à nouveau.",
                positive: false 
            })
        }
        else
        {
            const apiResponse = await clientSideExternalApiRequest(
            "/reset-password/"+props.token,
            {
                body: JSON.stringify({data: { password: formState.inputs.password.value }})
            });
            if(apiResponse.error){
                if(apiResponse.code === 200){
                    msg.addMessage({ 
                        text: "Malheureusement, le lien a expiré...",
                        positive: false
                    })
                    Router.push("/compte/reinitialiser")
                }
                else {
                    if(apiResponse.code === 400){
                        msg.addMessage({
                            text: "Lien invalide ou mot de passe invalide",
                            positive: false
                        })
                    }
                    else{
                        msg.addMessage({ 
                            text: "Erreur du serveur, contacter le support au besoin",
                            positive: false 
                        })
                    }
                }
            }
            else {
                msg.addMessage({ 
                    text: "Mot de passe réinitialiser",
                    positive: true
                })
                Router.push("/compte/connexion")
            }
        }
    }
    
    return (
        <>
            <PageMeta 
                title={"Nouveau mot de passe"}
                preventIndexation
            />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                htmlTitle={"Réinitialiser votre mot de passe"}
                //description={"Page de confirmation"}
            />
            {   //Token is not valid show error and redirect button
                !tokenIsValidState &&
                <>
                        <h2>Ce lien est erroné ou n'est plus valide</h2>
                        <Button onClick={() => { Router.push(AppRoutes.resetPassword.asPath) }}>
                            Renvoyer un lien de nouveau mot de passe
                        </Button>
                </>
            }
            {   //Token is valid, show form to proceed with changing password
                tokenIsValidState && (
                <form>
                    <Input
                        name="password"
                        type="password"
                        label="Mot de passe"
                        validationRules={[
                            {name: "REQUIRED"},
                            {name: "MIN_LENGTH", specification: 8}
                        ]}
                        errorText="Veuillez entrer un mot de passe valide"
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
                        errorText="Veuillez entrer un mot de passe valide"
                        formTools={formTools}
                    />
                    <Button type="button" disabled={!formState.isValid} onClick={sendNewPassword}>Changer mon mot de passe</Button>
                </form>
            )}
            
        </>
    )
}

export default forgottenPasswordReset;

export async function getServerSideProps(context) {
    const { token } = context.query;
    return {props: {token : token}}
};


