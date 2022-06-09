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

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Make sure the user is connected to access this page
    useEffect(() => {
        if(!auth.isLoggedIn){
            router.push(redirectPath.current)
        }
    },[auth.isLoggedIn, redirectPath.current])
   


    return (
        <div className={`col-12 ${styles["account-page"]}`}>
            <header className="col-12">
                <div className="maxWidthPageContainer">
                    <h1 className="col-12 blue1">Bienvenue</h1>
                </div>
            </header>
            <div className="maxWidthPageContainer">
                <section className="col-8">
                        <h3>Contenu à venir...</h3>
                </section>
                <aside className="col-3">
                    <h3 className="col-12">
                        Menu
                    </h3>
                    <ul className="col-12">
                        <li onClick={pageLogout}>Se déconnecter</li>
                    </ul>   
                </aside>
            </div>

        </div>
    );
}

export default accountPage