//hook
import {useContext} from "react";
import {useFormUtils} from "@/src/hooks/useFormUtils/useFormUtils";
import {useHttpClient} from "@/src/hooks/http-hook";

//Component
import PageHeader from "@/src/layouts/Header/PageHeader";
import Image from "next/image";
import Button from "@/src/common/FormElements/Button/Button";
import Input from "@/src/common/FormElements/Input/Input";
import RichTextarea from "@/src/common/FormElements/RichTextArea/RichTextarea";

//Context
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";

//utils
import {lang} from "@/src/common/Data/GlobalConstants";
import logo from '@/public/AVNU_Branding/AVNU-LogoComplet-RVB.png'
import {appConfig} from "@/src/configs/AppConfig";

const NousJoindre = () => {

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
                textColor={"text-white"}
                htmlTitle={"Nous joindre"}
                description="Vous avez des questions ou commentaires?<br/>Vous êtes au bon endroit !">
            </PageHeader>
            <section className="row d-flex py-4">
                <section className="col-6">
                    <div>
                        <Image width="320" height="120" src={logo} alt="Logo réduit de AVNU"/>
                    </div>
                    <div className="py-4">
                        <div className="py-2">Adresse courriel : {appConfig.support.email}</div>
                        <div className="py-2">Adresse : {appConfig.support.address}</div>
                        <div className="py-2">Numéro de téléphone : {appConfig.support.phone}</div>
                        
                        <Button className="my-2"href={"mailto:"+appConfig.support.email}>Nous contacter par courriel</Button>
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