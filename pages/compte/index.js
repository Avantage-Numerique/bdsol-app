import React, {useContext, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router';

import {useHttpClient} from '../../app/hooks/http-hook'

//Context
import {AuthContext} from '../../authentication/context/auth-context'

//Components
import UserHistoryGrid from '../../DataTypes/UserHistory/UserHistoryGrid';

//Hooks
import {useSessionHook} from '../../authentication/hooks/useSessionHook'


//Styling
import styles from './accountPage.module.scss'
import Profile from '../../app/common/Containers/UserAccount/Profile/profile';
import Preferences from '../../app/common/Containers/UserAccount/Preferences/preferences';
import Help from '../../app/common/Containers/UserAccount/Help/help';


const accountPage = () => {

    //Default redirection path
    const redirectPath = useRef('/compte/connexion');

    //Access router
    const router = useRouter();

    //Access logout function
    const {logout} = useSessionHook();

    //Create specific logout function for this page
    const pageLogout = () => {
        redirectPath.current = "/"; //Redirect to home page instead of login
        logout();
    }

    const pageModifProfile = () => {};

    //Import the authentication context to make sure the user is connected
    const auth = useContext(AuthContext);

    //UseState
    const [leftMenu, setLeftMenu] = useState("help");

    //Make sure the user is connected to access this page
    useEffect(() => {
        if (!auth.isLoggedIn) {
            router.push(redirectPath.current)
        }
    }, [auth.isLoggedIn, redirectPath.current]);

    const modifPassword = (
        <>
            <h3>Modification du mot de passe</h3>
            <button onClick={() => setLeftMenu("profile")}>Retour au modification du profil</button>
            <div>Entrer votre mot de passe actuel</div>
            <div>Entrer votre nouveau mot de passe</div>
        </>
    )

    const dateLanguage = 'en-CA';

    return (
        <div className={`col-12 ${styles["account-page"]}`}>

            <header className="col-12">
                <div className="maxWidthPageContainer">
                    <h1 className="col-12 blue1">Bienvenue {auth.username}</h1>
                </div>
            </header>

            <div className="maxWidthPageContainer">

                <section className={"col-9"}>
                    <div className={"account-page-content"}>
                        {leftMenu === "history" && <UserHistoryGrid/>}
                        {leftMenu === "preferences" && <Preferences/>}
                        {leftMenu === "profile" && <Profile/>}
                        {leftMenu == "help" && <Help/>}
                    </div>
                </section>

                <aside className={"col-3"}>
                    <div className={"side-menu"}>
                        <h3 className={`col-12`}>
                            Menu
                        </h3>
                            <div className={`${styles["user-card"]}`}>
                                <div>
                                    { (auth.avatar === null || auth.avatar.toString() === "") ?
                                        <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80px" height="80px"></img>
                                        : <img src={auth.avatar} alt="Ton avatar" width="80px" height="80px"></img>
                                    }
                                </div>
                                <div>
                                    <span>{auth.name}</span><br></br>
                                    <span>{auth.username}</span><br></br>
                                    <span>Membre depuis le {new Date(auth.createdAt).toLocaleDateString(dateLanguage)}</span><br></br>
                                </div>
                            </div>

                        <ul>
                            <li key="modif" className={`${styles["side-menu-control"]}`} onClick={() => setLeftMenu("profile")}>Modifier mon profil</li>
                            <li key="pref" className={`${styles["side-menu-control"]}`}
                                onClick={() => setLeftMenu("preferences")}>Préférences
                            </li>
                            <li key="historique" className={`${styles["side-menu-control"]}`} onClick={() => setLeftMenu("history")}>Historique de
                                modification
                            </li>
                            <li key="help" className={`${styles["side-menu-control"]}`} onClick={() => setLeftMenu("help")}>Aide</li>
                            <li key="logout" className={`${styles["side-menu-control"]}`} onClick={logout}>Se déconnecter</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default accountPage