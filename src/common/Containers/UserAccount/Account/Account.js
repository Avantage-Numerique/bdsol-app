import { useState } from "react"
import Button from '@/src/common/FormElements/Button/Button'
import Icon from "@/src/common/widgets/Icon/Icon";

const Account = () => {

//UseState
const [subMenu, setSubMenu] = useState("account");

const modifPassword = (
    <>
        <button onClick={() => setSubMenu("account")}><Icon iconName="undo"/>Retour à la modification du profil</button>
        <h3>Modification du mot de passe</h3>
        <div>Entrer votre mot de passe actuel</div>
        <input></input>
        <div>Entrer votre nouveau mot de passe</div>
        <input></input>
        <btn>Appliquer</btn>
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
            <Button onClick={() => setSubMenu("modifPassword")}>Modifier mon mot de passe</Button>
            <Button onClick={() => setSubMenu("modifEmail")}>Modifier mon courriel</Button>
            {/*<Button onClick={() => setSubMenu("closeAccount")}>Fermer mon compte</Button>
            <Button onClick={() => setSubMenu("modifPassword")}>Reouvrir mon compte</Button>
            <Button onClick={() => setSubMenu("modifPassword")}>Reouvrir mon compte</Button>
            <Button onClick={() => setSubMenu("modifPassword")}>Supprimer définitivement mon compte</Button>*/}

        </div>
    </>
)

    return (
        <>
            {subMenu == "account" && accountMenu}
            {subMenu == "modifPassword" && modifPassword}
            {subMenu == "modifEmail" && modifEmail}
            {subMenu == "closeAccount" && modifPassword}
        </>
    )
}

export default Account