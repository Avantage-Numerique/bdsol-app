import { useState } from "react"
import Button from '@/src/common/FormElements/Button/Button'
import Icon from "@/src/common/widgets/Icon/Icon";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import Input from "@/src/common/FormElements/Input/Input";
import { MessageContext } from "@/src/common/UserNotifications/Message/Context/Message-Context";

const Account = () => {

    const msg = useContext(MessageContext);
    const [subMenu, setSubMenu] = useState("account");
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            oldPassword: {
                value: '',
                isValid: false
            },
            newPassword: {
                value: '',
                isValid: false
            },
        },
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
        });

    const sendChangePassword = async () => {
        const apiResponse = await submitRequest(
            "/change-password",
            'POST',
            JSON.stringify({data: { oldPassword: formState.inputs.oldPassword.value, newPassword: formState.inputs.newPassword.value }})
        );
        
        if(apiResponse.error){
            msg.addMessage({ 
                text: "Mot de passe incorrect",
                positive: false
            })
        }
        else{
            msg.addMessage({ 
                text: "Mot de passe modifié avec succès",
                positive: true
            })
        }   
    }


const changePassword = (
    <>
        <button onClick={() => setSubMenu("account")}><Icon iconName="undo"/>Retour à la modification du profil</button>
        <h3>Modification du mot de passe</h3>
        <Input
            className="mb-3"
            name="oldPassword"
            label="Mot de passe actuel"
            formTools={formTools}
        />
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
        <Button onClick={sendChangePassword}>Confirmer ma demande de nouveau mot de passe</Button>
    </>
)

const modifEmail = (
    <>
        <button onClick={() => setSubMenu("account")}><Icon iconName="undo"/>Retour à la modification du profil</button>
        <h3>Modifier mon courriel</h3>
        <div>Entrer le courriel utilisé présentement</div>
        <input></input>
        <div>Entrer votre nouveau courriel</div>
        <input></input>
        <btn>Appliquer</btn>
    </>
)

const accountMenu = (
    <>
        <h3>Modifier mon compte</h3>
        <div>
            <Button onClick={() => setSubMenu("changePassword")}>Modifier mon mot de passe</Button>
            {/*
            <Button onClick={() => setSubMenu("modifEmail")}>Modifier mon courriel</Button>
            <Button onClick={() => setSubMenu("closeAccount")}>Fermer mon compte</Button>
            <Button onClick={() => setSubMenu("changePassword")}>Reouvrir mon compte</Button>
            <Button onClick={() => setSubMenu("changePassword")}>Reouvrir mon compte</Button>
            <Button onClick={() => setSubMenu("changePassword")}>Supprimer définitivement mon compte</Button>*/}

        </div>
    </>
)

    return (
        <>
            {subMenu == "account" && accountMenu}
            {subMenu == "changePassword" && changePassword}
            {
            /* {subMenu == "modifEmail" && modifEmail}
             {subMenu == "closeAccount" && changePassword}*/
            }
        </>
    )
}

export default Account