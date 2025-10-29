import Button from "@/src/common/FormElements/Button/Button";
import { clientSideExternalApiRequest } from "@/src/hooks/http-hook";
import PageHeader from "@/src/layouts/Header/PageHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import Input from "@/src/common/FormElements/Input/Input";
import PageMeta from "@/src/common/PageMeta/PageMeta";
import Spinner from "@/src/common/widgets/spinner/Spinner";
import { useMessages } from "@/common/UserNotifications/Message/MessageProvider";

/**
 *
 * @param props
 * @returns {JSX.Element}
 */
const VerifyAccount = (props) => {
    //Import message context
    const msg = useMessages();

    const VERIFYING_TOKEN = "VERIFYING";
    const WRONG_TOKEN = "WRONG";
    const EXPIRED_TOKEN = "EXPIRED";
    const CONFIRMED_TOKEN = "CONFIRMED";

    const verifyingStates = {
        [VERIFYING_TOKEN]: {
            name: VERIFYING_TOKEN,
            title: "Vérification du compte",
            content: "...",
        },
        [WRONG_TOKEN]: {
            name: WRONG_TOKEN,
            title: "Ce lien est erroné",
            content: "Réessayer à nouveau",
        },
        [EXPIRED_TOKEN]: {
            name: EXPIRED_TOKEN,
            title: "Oups, le lien a expiré.",
            content: "Voulez-vous un nouveau lien de confirmation?",
        },
        [CONFIRMED_TOKEN]: {
            name: CONFIRMED_TOKEN,
            title: "Votre compte a bien été vérifié!",
            content: "Vous pouvez maintenant vous connecter",
        },
    };

    const [verifyState, setVerifyState] = useState(verifyingStates[VERIFYING_TOKEN]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    //Main form functionalities
    const { formState, formTools } = useFormUtils(
        {
            email: {
                value: "",
                isValid: false,
            },
        },
        { displayResMessage: true }
    );

    const verifyToken = async (token) => {
        const response = await clientSideExternalApiRequest(`/verify-account/${token}`, { method: "GET" });
        if (!response.error && response.code === 200) {
            //If no error, then account got verified
            setVerifyState(verifyingStates[CONFIRMED_TOKEN]);
        } else {
            //API return error but status 200 when token is correct length or exist but is now expired
            if (response.code === 200)
                //Token expired
                setVerifyState(verifyingStates[EXPIRED_TOKEN]);
            else
                //Already verified account
                //Token is invalid (not right lenght or doesn't exists)
                setVerifyState(verifyingStates[WRONG_TOKEN]);
        }
        setIsLoading(false);
    };

    /**
     * Send the token to the user email.
     * @returns {Promise<void>}
     */
    const resendToken = async () => {
        const apiResponse = await clientSideExternalApiRequest("/verify-account/resend", {
            body: JSON.stringify({
                data: { email: formState.inputs.email.value },
            }),
        });
        if (apiResponse.error) {
            if (apiResponse.code === 200) {
                msg.addMessage({
                    text: "Veuillez attendre 5 minutes entre l'envoie d'un nouveau courriel",
                    theme: "negative",
                });
            } else {
                if (apiResponse.code === 418) {
                    //I'm a tea pot
                    msg.addMessage({
                        text: "Le compte est déjà vérifier, vous pouvez vous connecter.",
                        theme: "positive",
                    });
                    router.push("/compte/connexion");
                } else {
                    msg.addMessage({
                        text: "Courriel invalide",
                        theme: "negative",
                    });
                }
            }
        } else {
            msg.addMessage({
                text: "Un email de confirmation a été envoyé",
                theme: "positive",
            });
            router.push("/compte/a-confirmer");
        }
    };

    useEffect(() => {
        if (!router.isReady) return; // wait for router
        const { token } = router.query;
        setIsLoading(true);

        //Sends request to verifyAccount
        verifyToken(token);
    }, [router.isReady]);

    return (
        <div>
            <PageMeta title={"Vérification de compte"} preventIndexation />
            <PageHeader
                bg={"bg-primary-lighter"}
                textColor={"text-white"}
                title={`${verifyState.title || "Page de confirmation de compte"}`}
                subTitle={`${verifyState.content || ""}`}
            />
            <div className={"my-5"}>
                {isLoading && (
                    <div className={"my-5"}>
                        <Spinner reverse />
                    </div>
                )}

                {!isLoading && verifyState.name === WRONG_TOKEN && (
                    <p>
                        Ce lien de confirmation ne fonctionne pas. Retourner voir dans votre courriel pour bien copier
                        le lien.
                    </p>
                )}
                {!isLoading && verifyState.name === EXPIRED_TOKEN && (
                    <form className={"my-5"}>
                        <Input
                            name="email"
                            label="Adresse Courriel"
                            formClassName="discrete-without-focus form-text-white h2"
                            validationRules={[{ name: "REQUIRED" }]}
                            formTools={formTools}
                        />
                        <Button type="button" onClick={resendToken}>
                            Envoyer un nouveau lien de confirmation
                        </Button>
                    </form>
                )}

                {!isLoading && verifyState.name === CONFIRMED_TOKEN && (
                    <div className={"my-5"}>
                        <Button className="my-3" href="/compte/connexion">
                            Se connecter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyAccount;
