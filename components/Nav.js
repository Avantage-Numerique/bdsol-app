/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = ( {children} ) => {

    return (
        <nav className={navStyles.navContainer}>
            <h1><span>Ontologie</span> Documentation</h1>
            <ul>
                <li>
                    <Link href="/">Accueil</Link>
                </li>
                <li>
                    <Link href="/documentation">Documentation</Link>
                </li>
            </ul>
        </nav>
    )   
}

export default Nav;