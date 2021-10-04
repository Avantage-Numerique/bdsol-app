/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import Link from 'next/link'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = ( {children} ) => {

    return (
        <nav className={navStyles.navContainer}>
            <div className={navStyles.maxWidthPageContainer + ' ' + "maxWidthPageContainer"}>
            <div>
                <h1>Ontologie - documentation</h1>
                <img src="/logo.svg" alt="Logo Avantage Numérique"/>
            </div>
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