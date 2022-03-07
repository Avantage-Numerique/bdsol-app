/*


    Header bar presented on the top of the page
    V.P.R.

    created on 15/10/2021
    

*/

import { useState } from 'react'

import AccountTopBar from '../AccountTopBar/AccountTopBar'
import HamburgerButton from '../../common/FormElements/Buttons/HamburgerButton/HamburgerButton';
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = ( props ) => {

    const [displayTopBar, setDisplayTopBar] = useState(true);

    return (
        <header className={`${styles.header} ${displayTopBar && styles.accountBarPresent} dark_BG`}>
            
            { displayTopBar && <AccountTopBar /> }

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