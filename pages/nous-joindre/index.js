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
import PageMeta from "@/src/common/PageMeta/PageMeta";

//Context
import {MessageContext} from "@/src/common/UserNotifications/Message/Context/Message-Context";

//utils
import {lang} from "@/src/common/Data/GlobalConstants";
import logo from '@/public/AVNU_Branding/AVNU-LogoComplet-RVB.png'
import {appConfig} from "@/src/configs/AppConfig";
import {ExternalLink} from "@/common/Components/ExternalLink";

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
                isValid: false
            },
            message: {
                value: '',
                isValid: false
            }
        },
        { displayResMessage: true }
    )

    const sendContactUsMessage = async () => {
        const apiResponse = await sendRequest(
            "/communications/contact-us",
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
                text: "Message envoyé avec succès, merci de vos commentaires!",
                positive: true
            });
            formState.inputs.name.value = "";
            formState.inputs.email.value = "";
            formState.inputs.message.value = "";
        }  
    }

    return (
        <>
            <PageMeta 
                title={lang.contact_us__title}
                description={lang.contact_us__description}
            />
            <PageHeader
                textColor={"text-white"}
                htmlTitle={"Nous joindre"}
                description="Vous avez des questions, des commentaires, une demande de support ou encore un bug à signaler ?<br/><br/>Vous êtes au bon endroit !">
            </PageHeader>
            <section className="row d-flex py-4">
                <section className="col-12 col-md-6">
                    <div>
                        <Image style={{width: "clamp(12rem, 20vw, 30rem)"}} className="h-auto" src={logo} alt="Logo réduit de AVNU"/>
                    </div>
                    <div className="py-4">
                        <div className="py-1"><span className="fw-semibold">Adresse courriel :</span> {appConfig.support.email}</div>
                        <div className="py-1"><span className="fw-semibold">Adresse :</span> {appConfig.support.address}</div>
                        <div className="py-1"><span className="fw-semibold">Numéro de téléphone :</span> {appConfig.support.phone}</div>
                    </div>
                </section>
                <section className="col-12 col-md-6 mt-2">
                    <h3 className="fs-3">Contactez-nous par courriel</h3>
                    <p>Nous vous répondrons le plus rapidement possible.</p>
                    <p>Pour le faire <ExternalLink href={"mailto:"+appConfig.support.email}>depuis votre propre boîte de courrier électronique</ExternalLink></p>

                    <Input
                        className="py-1"
                        name="name"
                        label={"Nom"}
                        formTools={formTools}
                    />
                    <Input
                        className="py-1"
                        name="email"
                        label={lang.email}
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        formTools={formTools}
                    />
                    <RichTextarea
                        className="py-1"
                        name="message"
                        label={lang.message}
                        validationRules={[
                            {name: "REQUIRED"}
                        ]}
                        formTools={formTools}
                    />
                    <div className={"py-1"}>
                        <Button type="button" disabled={!formState.isValid} onClick={sendContactUsMessage}>{lang.sendMessage}</Button>
                    </div>
                </section>

            </section>
        </>
    )
}

export default NousJoindre;