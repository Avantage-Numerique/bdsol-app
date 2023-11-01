//hook
import { useContext } from "react";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { useHttpClient } from "@/src/hooks/http-hook";

//Component
import PageHeader from "@/src/layouts/Header/PageHeader";
import Image from "next/image";
import Button from "@/src/common/FormElements/Button/Button";
import Input from "@/src/common/FormElements/Input/Input";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";

//Context
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";

//utils
import { lang } from "@/src/common/Data/GlobalConstants";
import logo from '@/public/logos-avnu/AVNU-LogoComplet-RVB.png'

const NousJoindre = () => {

    const avnuSupportEmail = "support@avnu.ca"
    const {sendRequest} = useHttpClient()
    const msg = useContext(MessageContext);


    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: true
            },
            message: {
                value: '',
                isValid: true
            }
        },
        { displayResMessage: true }
    )

    const sendContactUsMessage = async () => {
        const apiResponse = await sendRequest(
            "/communications/create",
            'POST',
            JSON.stringify(
                {
                    data: {
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        message: formState.inputs.message.value,
                    }
                }
            ),
            {'Content-Type': 'application/json'}
        );
        
        if(apiResponse.error){
            msg.addMessage({ 
                text: "Échec de l'envoi du message",
                positive: false
            })
        }
        else{
            msg.addMessage({ 
                text: "Message envoyé avec succès, merci de vos commentaire!",
                positive: true
            });
            formState.inputs.name.value = "";
            formState.inputs.email.value = "";
            formState.inputs.message.value = "";
        }  
    }

    return (
        <>
            <PageHeader
                bg={"bg-purplelight"}
                textColor={"text-white"}
                htmlTitle={"Nous joindre"}
                description="Vous avez des questions ou commentaires?<br/>Vous êtes au bon endroit !">
            </PageHeader>
            <section className="row d-flex py-4">
                <section className="col-6">
                    <div>
                        <Image width="280" height="120" src={logo} alt="Logo réduit de AVNU"/>
                    </div>
                    <div className="py-4">
                        {<div className="py-4">Adresse courriel : {`${avnuSupportEmail}`}</div>
                        }
                        <Button href={"mailto:"+avnuSupportEmail}>Nous contacter par courriel</Button>
                    </div>
                </section>
                <section className="col-6">
                    <div>Pour toutes questions, commentaires, signalements de bogues, ou demandes de support.</div>
                    <div className="border-bottom">Nous vous réponderons le plus rapidement possible.</div>
                    <Input
                        className="mb-3 py-4"
                        name="name"
                        label={"Nom"}
                        formTools={formTools}
                    />
                    <Input
                        className="mb-3"
                        name="email"
                        label={lang.email}
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        formTools={formTools}
                    />
                    <RichTextarea
                        className="mb-3 mt-2"
                        name="message"
                        label={lang.message}
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        formTools={formTools}
                    />
                    <Button type="button" onClick={sendContactUsMessage}>{lang.sendMessage}</Button>
                </section>

            </section>
        </>
    )
}

export default NousJoindre;