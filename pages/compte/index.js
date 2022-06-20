import { useContext, useEffect, useRef } from 'react'
import {useRouter}  from 'next/router';

//Context
import { AuthContext } from '../../authentication/context/auth-context'

//Components

//Hooks
import { useSessionHook } from '../../authentication/hooks/useSessionHook'

//Styling
import styles from './accountPage.module.scss'


const accountPage = () => {

    //Default redirection path
    const redirectPath = useRef('/compte/connexion')

    //Access router
    const router = useRouter()

    //Access logout function
    const { logout } = useSessionHook();

    //Create specific logout function for this page
    const pageLogout = () => {
        redirectPath.current = "/" //Redirect to home page instead of login
        logout()
    }

    const pageModifProfile = () => {};

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Make sure the user is connected to access this page
    useEffect(() => {
        if(!auth.isLoggedIn){
            router.push(redirectPath.current)
        }
    },[auth.isLoggedIn, redirectPath.current])
   
    const histObject = [
        {
            date:"2010-05-05",
            modif:"Création d'une Personne 'Shawnee Jacque-Godard'",
            detail:"nom: Jacque-Godard, prenom: Shawnee, surnom:DrummerGod, description:Something"
        },
        {
            date:"2011-05-05",
            modif:"Création d'une Organisation 'Le band a shawnee?'",
            detail:"nom: Le band a shawnee, roto..."
        },
        {
            date:"2012-12-23",
            modif:"Création d'un projet 'Le drum à shawnee'",
            detail:"nom: Le drum à shawnee, roto..."
        }
    ];

    //const history = toArray(histObject).map((histArray) => {
    const history = histObject.map((hist) => {
        //const menuTitle = (<h3>Historique de modification</h3>);
        const list = (
            <>
            <div>{hist.date}</div>
            <div>{hist.modif}</div>
            <div onClick={function() {alert(hist.detail.toString())}}>Détails</div>
            </>
        );
        return list;
    })

    const preferences = () => {
        return (
            <>
                <h3>Préférences</h3>
                <div>ma préférence de couleur</div>
                <div>ma préférence de langue</div>
            </>)
    }

    const showAvatar = () => {
        if (auth.avatar == undefined || auth.avatar.toString() == "")
            return <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80px" length="80px"></img>;
        else
            return <img src={auth.avatar} alt="Ton avatar" width="80px" length="80px"></img>;
    }

    return (
        <div className={`col-12 ${styles["account-page"]}`}>

            <header className="col-12">
                <div className="maxWidthPageContainer">
                    <h1 className="col-12 blue1">Bienvenue { auth.username }</h1>
                </div>
            </header>

            <div className="maxWidthPageContainer">

                <section className="col-8">
                    <h3>Historique de modification</h3>
                    <div className={`${styles["grid-history"]}`}>
                        {history}
                    </div>
                    <br></br>
                </section>

                <aside className="col-3">
                    <h3 className={`col-12 ${styles["side-menu"]}`}>
                        Menu
                    </h3>
                    <table className={`col-12 ${styles["side-menu"]}`}>
                        
                        <tr>
                            <th>
                                {showAvatar}
                            </th>
                            <th onClick={pageModifProfile}>
                                { auth.name }
                                <br></br>
                                { auth.username }
                                <br></br><br></br>
                                Modifier mon profil
                            </th>
                        </tr>
                    </table>
                        <li className={`${styles["side-menu"]}`}>Préférences</li>
                        <li className={`${styles["side-menu"]}`}>Historique de modification</li>
                        <li className={`${styles["side-menu"]}`} onClick={logout}>Se déconnecter</li>
                </aside>           
            </div>
        </div>
    );
}

export default accountPage