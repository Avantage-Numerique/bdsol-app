/*


    Header bar presented on the top of the page
    V.P.R.

    created on 15/10/2021
    

*/

import { useContext } from 'react'

import AccountTopBar from '../AccountTopBar/AccountTopBar'
import HamburgerButton from '../../common/FormElements/Buttons/HamburgerButton/HamburgerButton';
import Link from 'next/link'

//Authentication context
import { AuthContext } from '../../../authentication/context/auth-context'


//Styling
import styles from './Header.module.scss'

const Header = ( props ) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    return (
        <header className={`${styles.header} ${auth.isLoggedIn && styles.accountBarPresent} dark_BG`}>
            
            { auth.isLoggedIn && <AccountTopBar /> }

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