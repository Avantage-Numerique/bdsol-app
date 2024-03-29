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
        if (menuState === 1){ setMenuState(0) }
    }, [router.asPath]);

    const closeMenu = () => { setMenuState(0) }

    return (

        <nav className={`${navStyles.navContainer} ${menuState === 1 && navStyles.displayed} bg-primary`}>
            <div className={navStyles.maxWidthPageContainer + ' ' + "maxWidthPageContainer"}>
             
                <ul className={`${navStyles.mainMenu}`}>

                    <li onClick={closeMenu}>
                        <Link href="/">Accueil</Link>
                    </li>

                    <li onClick={closeMenu}>
                        <Link href="/categories">Consulter les données</Link>
                    </li>

                    <li onClick={closeMenu}>
                        <Link href="/contribuer">Contribuer à la base de données</Link>
                    </li>

                    <li onClick={closeMenu}>
                        <Link href="/faq/a-propos">À propos de nous</Link>
                    </li>
                    <li onClick={closeMenu}>
                        <Link href="/faq">FAQ</Link>
                    </li>

                </ul>

                <div className={`${navStyles.line}`}></div>

                <ul className={`${navStyles.secondaryMenu} d-flex flex-column`}>
                    <li>
                        <a target="_blank" href="https://avantagenumerique.org/le-croissant-boreal/">Le Croissant boréal</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://avantagenumerique.org/charte-des-valeurs/">Charte des valeurs</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://avantagenumerique.org/notre-equipe/">Notre équipe</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://avantagenumerique.org/a-propos">À propos d'Avantage Numérique</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://avantagenumerique.org/nous-joindre/">Nous joindre</a>
                    </li>
                </ul>

            </div>
        </nav>
        
    )   
}

export default Nav;