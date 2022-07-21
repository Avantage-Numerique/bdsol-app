import React, {useContext, useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router';

import {useHttpClient} from '../../app/hooks/http-hook'

//Context
import {AuthContext} from '../../authentication/context/auth-context'

//Components

//Hooks
import {useSessionHook} from '../../authentication/hooks/useSessionHook'


//Styling
import styles from './accountPage.module.scss'
import Button from "../../app/common/FormElements/Buttons/Button/Button";

//useHttpClient don't work in the NExtjs context of getServerSideProps. export async function getServerSideProps(context)
/*export async function getServerSideProps(context)
{
    const loggedInUser = {
        username: 'datageek'
    }
    const usersHistory = await sendApiRequest(
        "/userhistory/list",
        'POST',
        JSON.stringify(loggedInUser),
        {'Content-Type': 'application/json'}
    );
    return {
        props: {usersHistory}, // will be passed to the page component as props
    }
}*/

const accountPage = () => {

    //Default redirection path
    const redirectPath = useRef('/compte/connexion');

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

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
    const [leftMenu, setLeftMenu] = useState("history");

    //Make sure the user is connected to access this page
    useEffect(() => {
        if (!auth.isLoggedIn) {
            router.push(redirectPath.current)
        }
    }, [auth.isLoggedIn, redirectPath.current]);


    //Data history
    const formData = {
        "data": {
            "username": auth.username
        }
    };
    const [usersHistory, setUsersHistory] = useState([]);

    useEffect(() => {
        const getUsersHistory = async () => {
            const usersHistory =  await sendRequest(
                "/userhistory/list",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            );
            setUsersHistory(usersHistory);
        }
        if(auth.isLoggedIn) getUsersHistory();

    }, [auth.isLoggedIn]);


    //temp
    const histObject = [
        {
            date: "2010-05-05",
            modif: "Création d'une Personne 'Shawnee Jacque-Godard'",
            detail: "nom: Jacque-Godard, prenom: Shawnee, surnom:DrummerGod, description:Something"
        },
        {
            date: "2011-05-05",
            modif: "Création d'une Organisation 'Le band a shawnee?'",
            detail: "nom: Le band a shawnee, roto..."
        },
        {
            date: "2012-12-23",
            modif: "Création d'un projet 'Le drum à shawnee'",
            detail: "nom: Le drum à shawnee, roto..."
        }
    ];

    /*const historyGrid = historyRes.data.map((hist) => {
        const list = (
            <>
            <div>{hist.modifDate}</div>
            <div>{hist.action} {hist.modifiedEntity}</div>
            <div onClick={function() {alert(hist)}}>Détails</div>
            </>
        );
    })*/

    const HistorySubView = (props) => {

        if (usersHistory
            && !usersHistory.error
            && usersHistory.data
            && usersHistory.data.length > 0)
        {

            const dateLanguage = 'fr-CA';
            return (
                <>
                    <div key={`${styles["history-table"]}`} className={`${styles["history-table"]}`}>
                        {usersHistory.data.map( modification =>
                            <div key={modification._id.toString()}>
                                {modification._id.toString()}
                                <div>{new Date(modification.modifDate).toLocaleDateString(dateLanguage)} {new Date(modification.modifDate).toLocaleTimeString(dateLanguage)}</div>
                                <div>{modification.action}</div>
                                <div>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</div>
                                <div>
                                    <Button slim key={modification._id.toString() + "BTN"} onClick={function () {
                                        alert(modification.fields.toString())
                                    }}>Détails</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )
        }
    }


    const history = (
        <>
            <h3>Historique de modification</h3>
            <div className={`${styles["grid-history"]}`}>
                <HistorySubView />
            </div>
        </>
    )

    const profile = (
        <>
            <h3>Modification du profil</h3>
            <button onClick={() => setLeftMenu("modifPassword")}>Modifier mon mot de passe</button>
            <div>2e chose à modifier</div>
            <div>3e chose à modifier</div>
        </>
    )

    const preferences = (
        <>
            <h3>Préférences</h3>
            <div>ma préférence de couleur</div>
            <div>ma préférence de langue</div>
        </>
    )

    const modifPassword = (
        <>
            <h3>Modification du mot de passe</h3>
            <button onClick={() => setLeftMenu("profile")}>Retour au modification du profil</button>
            <div>Entrer votre mot de passe actuel</div>
            <div>Entrer votre nouveau mot de passe</div>
        </>
    )

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
                        {leftMenu === "history" && history}
                        {leftMenu === "preferences" && preferences}
                        {leftMenu === "profile" && profile}
                        {leftMenu === "modifPassword" && modifPassword}
                    </div>
                </section>

                <aside className={"col-3"}>
                    <div className={"side-menu"}>
                        <h3 className={`col-12`}>
                            Menu
                        </h3>
                        <div>
                            <div className={`${styles["user-card"]}`}>
                                <div>
                                    { (auth.avatar === null || auth.avatar.toString() === "") ?
                                        <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80px" height="80px"></img>
                                        : <img src={auth.avatar} alt="Ton avatar" width="80px" height="80px"></img>
                                    }
                                </div>
                                <div onClick={pageModifProfile}>
                                    <span>{auth.name}</span>
                                    <span>{auth.username}</span>
                                    <button onClick={() => setLeftMenu("profile")}>Modifier mon profil</button>
                                </div>
                            </div>
                        </div>

                        <ul>
                            <li key="pref" className={`${styles["side-menu"]}`}
                                onClick={() => setLeftMenu("preferences")}>Préférences
                            </li>
                            <li key="historique" className={`${styles["side-menu"]}`} onClick={() => setLeftMenu("history")}>Historique de
                                modification
                            </li>
                            <li key="logout" className={`${styles["side-menu"]}`} onClick={logout}>Se déconnecter</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default accountPage