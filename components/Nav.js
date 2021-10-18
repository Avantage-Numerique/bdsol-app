/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import navStyles from '../styles/components/Nav.module.scss'

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
                <ul>
                    <li>
                        <Link href="/">Accueil</Link>
                    </li>
                    <li>
                        <Link href="/presentation">Présentation</Link>
                    </li>
                    <li>
                        <Link href="/documentation">Documentation</Link>
                    </li>
                </ul>
            </div>
        </nav>

    )   
}

export default Nav;