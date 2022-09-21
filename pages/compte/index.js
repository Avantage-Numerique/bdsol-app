import React, {useContext, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router';

import {useHttpClient} from '../../app/hooks/http-hook'

//Context
import {AuthContext, useAuth} from '../../authentication/context/auth-context'

//Components
import UserHistoryGrid from '../../DataTypes/UserHistory/UserHistoryGrid';
import Button from '../../app/common/FormElements/Buttons/Button/Button';

//Hooks
import {useSessionHook} from '../../authentication/hooks/useSessionHook'


//Styling
import styles from './accountPage.module.scss'
import Profile from '../../app/common/Containers/UserAccount/Profile/profile';
import Preferences from '../../app/common/Containers/UserAccount/Preferences/preferences';
import Help from '../../app/common/Containers/UserAccount/Help/help';
import useAuthentification from "../../authentication/hooks/useAuthentification";


const accountPage = () => {

    /*const useAuthenficiation = useAuthentification({
        redirectTo: "/compte/connexion",
        redirectIfFound: true,
    });*/

    //Import the authentication context to make sure the user is connected
    const auth = useAuth();

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

    //UseState
    const [leftMenu, setLeftMenu] = useState("help");

    //Make sure the user is connected to access this page
    /*useEffect(() => {
        if (!auth.isLoggedIn) {
            router.push(redirectPath.current)
        }
    }, [auth.isLoggedIn, redirectPath.current]);*/

    const dateLanguage = 'en-CA';

    return (
        <div className={`col-12 ${styles["account-page"]}`}>

            <header className="col-12">
                <div className="maxWidthPageContainer">
                    <h1 className="col-12 blue1">Bienvenue {auth.user.username}</h1>
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
                                    { (auth.user.avatar === undefined || auth.user.avatar === null || auth.user.avatar.toString() === "") ?
                                        <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80px" height="80px"></img>
                                        : <img src={auth.user.avatar} alt="Ton avatar" width="80px" height="80px"></img>
                                    }
                                </div>
                                <div>
                                    <span>{auth.user.name}</span><br></br>
                                    <span>{auth.user.username}</span><br></br>
                                    <span>Membre depuis le {new Date(auth.user.createdAt).toLocaleDateString(dateLanguage)}</span><br></br>
                                </div>
                            </div>

                            <Button key="modif" onClick={() => setLeftMenu("profile")}>Modifier mon profil</Button>
                            <Button key="pref" onClick={() => setLeftMenu("preferences")}>Préférences</Button>
                            <Button key="historique" onClick={() => setLeftMenu("history")}>Historique de modification</Button>
                            <Button key="help" onClick={() => setLeftMenu("help")}>Aide</Button>
                            <Button key="logout" onClick={logout}>Se déconnecter</Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default accountPage