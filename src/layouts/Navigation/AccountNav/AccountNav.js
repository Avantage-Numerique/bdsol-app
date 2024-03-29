/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import { useEffect } from 'react'
import { useRouter } from 'next/router'

//Import the authentication context
import {useAuth} from '@/auth/context/auth-context'

//Log options
import { useSessionHook } from '@/auth/hooks/useSessionHook'

import Link from 'next/link'
import navStyles from './AccountNav.module.scss'
import {lang} from "@/src/common/Data/GlobalConstants";

const AccountNav = ( {menuState, setMenuState} ) => {

    const { logout } = useSessionHook();

    //Import the authentication context to know if the user is connected
    const auth = useAuth();

    //Listen for a page change. If it happens, close the menu
    const router = useRouter();

    const deconnection = () => {
        logout();
    }
    
    useEffect(() => {
        //Verify the the menu is open. If it is, then close it
        if (menuState === 2){ setMenuState(0) }
        
    }, [router.asPath]);

    const closeMenu = () => { setMenuState(0) }

    return (
        <nav className={`${navStyles.navContainer} ${menuState === 2 && navStyles.displayed}`}>
            <div className={"maxWidthPageContainer"}>

                <h3 className="col-9">{lang.menuTitleMemberMenu}</h3>

                <ul className={`col-9`}>

                    {/* Options if the user is NOT logged in */}
                    { !auth.user.isLoggedIn &&
                        <>
                            <li onClick={closeMenu} className="col-12">
                                <Link href="/compte/connexion">{lang.menuLabelConnect || "Connexion"}</Link>
                            </li>
                            <li onClick={closeMenu} className="col-12">
                                <Link href="/compte/inscription">{lang.menuLabelCreateAccount || "Créer votre compte"}</Link>
                            </li>
                        </>
                    }

                    {/* Options if the user is logged in */}
                    { auth.user.isLoggedIn &&
                        <>
                            <li onClick={closeMenu} className="col-12">
                                <Link href="/compte">{lang.menuLabelToDashboard || "Tableau de bord"}</Link>
                            </li>
                            
                            <li onClick={closeMenu} className="col-12">
                                <button onClick={deconnection}>{lang.menuLabelToDisconnect || "Déconnecter"}</button>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )   
}

export default AccountNav;