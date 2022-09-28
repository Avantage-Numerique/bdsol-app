import { useState } from "react"


const Profile = () => {

//UseState
const [subMenu, setSubMenu] = useState("profile");

const modifPassword = (
    <>
        <h3>Modification du mot de passe</h3>
        <button onClick={() => setSubMenu("profile")}>Retour au modification du profil</button>
        <div>Entrer votre mot de passe actuel</div>
        <div>Entrer votre nouveau mot de passe</div>
    </>
)

const profileMenu = (
    <>
        <h3>Modification du profil</h3>
        <button onClick={() => setSubMenu("modifPassword")}>Modifier mon mot de passe</button>
        <div>2e chose à modifier</div>
        <div>3e chose à modifier</div>
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