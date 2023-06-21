import { useState } from "react"
import Button from '@/src/common/FormElements/Button/Button'

const Profile = () => {

//UseState
const [subMenu, setSubMenu] = useState("profile");

const modifPassword = (
    <>
        <h3>Modification du mot de passe</h3>
        <Button onClick={() => setSubMenu("profile")}>Retour à la modification du profil</Button>
        <div>Entrer votre mot de passe actuel</div>
        <div>Entrer votre nouveau mot de passe</div>
    </>
)

const profileMenu = (
    <>
        <h3>Modification du profil</h3>
        <Button onClick={() => setSubMenu("modifPassword")}>Modifier mon mot de passe</Button>
    </>
)

    return (
        <>
            {subMenu == "profile" && profileMenu}
            {subMenu == "modifPassword" && modifPassword}
        </>
    )
}

export default Profile