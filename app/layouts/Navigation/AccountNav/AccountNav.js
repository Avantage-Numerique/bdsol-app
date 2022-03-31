/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import navStyles from './AccountNav.module.scss'

const AccountNav = ( {menuState, setMenuState} ) => {

    //Listen for a page change. If it happens, close the menu
    const router = useRouter();
    
    useEffect(() => {
        //Verify the the menu is open. If it is, then close it
        if (menuState === 2){ setMenuState(0) };
        
    }, [router.asPath]);

    return (

        <nav className={`${navStyles.navContainer} ${menuState === 2 && navStyles.displayed}`}>
            <div className={"maxWidthPageContainer"}>

                <h3 className="col-9">Menu de membre</h3>
             
                <ul className={`col-9`}>
                    <li className="col-12">
                        <Link href="/compte">Espace membre</Link>
                    </li>
                    <li className="col-12">
                        <Link href="/compte/connexion">Se connecter</Link>
                    </li>
                    <li className="col-12">
                        <Link href="/compte/inscription">Créer un compte</Link>
                    </li>
                </ul>

         
            </div>
        </nav>
        
    )   
}

export default AccountNav;