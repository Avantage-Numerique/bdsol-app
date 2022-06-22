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
        if (menuState === 1){ setMenuState(0) };
        
    }, [router.asPath]);

    return (

        <nav className={`${navStyles.navContainer} ${menuState === 1 && navStyles.displayed}`}>
            <div className={navStyles.maxWidthPageContainer + ' ' + "maxWidthPageContainer"}>
             
                <ul className={`${navStyles.mainMenu} col-9`}>

                    <li className="col-12">
                        <Link href="/">Accueil</Link>
                    </li>

                    <li className={`col-12 ${navStyles["unactive"]}`}>
                        Consulter les données
                    </li>

                    <li className="col-12">
                        <Link href="/contribuer">Contribuer à la base de données</Link>
                    </li>

                    <li className="col-12">
                        <Link href="/a-propos">À propos</Link>
                    </li>

                </ul>

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