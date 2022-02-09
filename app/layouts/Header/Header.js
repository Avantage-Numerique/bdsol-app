/*


    Header bar presented on the top of the page
    V.P.R.

    created on 15/10/2021
    

*/

import HamburgerButton from '../../common/buttons/HamburgerButton/HamburgerButton';
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = ( props ) => {

    return (
        <header className={`${styles.header} dark_BG`}>

            {/* Container that fills all the width of the platform and containerr the logo*/}
            <div className={`${styles.headerContent} maxWidthPageContainer`}>
                <div>
                    <Link href="/">
                        <img src="/logo.svg" alt="Logo Avantage Numérique"/>
                    </Link>
                </div>
            </div>

            {/* Container that contain the menu button */}
            <div className={`${styles.navButton} blue_BG`}>
                <HamburgerButton {...props} />
            </div>

        </header>
    )   
}

export default Header;