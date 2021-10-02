/*


    Navigation bar displayed in the top of a page 
    V.P.R.
    

*/
import Link from 'next/link'
import navStyles from '../styles/components/Nav.module.scss'

const Nav = ( {children} ) => {

    return (
        <nav className={navStyles.navContainer}>
            <div>
                <h1><span>Ontologie</span> Documentation</h1>
            </div>
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