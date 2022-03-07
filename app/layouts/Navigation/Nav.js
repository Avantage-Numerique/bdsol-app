/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import navStyles from './Nav.module.scss'

const Nav = ( {menuState, setMenuState} ) => {

    //Listen for a page change. If it happens, close the menu
    const router = useRouter();
    
    useEffect(() => {
        //Verify the the menu is open. If it is, then close it
        if (menuState){ setMenuState(!menuState)};
    }, [router.asPath]);

    return (

        <nav className={`${navStyles.navContainer} ${menuState ? navStyles.displayed : " "}`}>
            <div className={navStyles.maxWidthPageContainer + ' ' + "maxWidthPageContainer"}>
             
                <ul className={`${navStyles.mainMenu} col-9`}>
                    <li className="col-12">
                        <Link href="/compte">Autre titre principale</Link>
                    </li>
                    <li className="col-12">
                        <Link href="/documentation">Documentation</Link>
                    </li>
                    <li className="col-12">
                        <Link href="https://avantagenumerique.org/blogue/">Blogue</Link>
                    </li>
                </ul>

                <div className={`${navStyles.accountOption} col-3 sec-color_BG`}>
                    
                    <h3>Compte</h3>                
                    
                    <div className={`${navStyles.line}`}></div>

                    <ul>
                        
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

                <div className={`${navStyles.line}`}></div>

                <ul className={`${navStyles.secondaryMenu} col-12`}>
                    <li>
                        <Link href="https://avantagenumerique.org/le-croissant-boreal/">Le Croissant boréal</Link>
                    </li>
                    <li>
                        <Link href="https://avantagenumerique.org/charte-des-valeurs/">Charte des valeurs</Link>
                    </li>
                    <li>
                        <Link href="https://avantagenumerique.org/notre-equipe/">Notre équipe</Link>
                    </li>
                    <li>
                        <Link href="https://avantagenumerique.org/a-propos/">À propos</Link>
                    </li>
                    <li>
                        <Link href="https://avantagenumerique.org/nous-joindre/">Nous joindre</Link>
                    </li>
                </ul>

            </div>
        </nav>
        
    )   
}

export default Nav;