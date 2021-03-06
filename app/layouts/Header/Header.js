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

    //Destructuring to acces those elements easier
    const { menuState, setMenuState } = props

    return (
        <header className={`${styles.header} dark_BG`}>

            {/* Container that fills all the width of the platform and containerr the logo*/}
            <div className={`${styles["header__content"]} maxWidthPageContainer`}>
                <div>
                    <Link href="/">
                        <img src="/logo.svg" alt="Logo Avantage Numérique"/>
                    </Link>
                </div>
            </div>

            {/* Container that contain the menu button */}
            <div className={`${styles["navigation-options"]}`}>

                {/* Button for the connection menu */}
                <div className={`${styles["account-menu-container"]}`}>
                    <button onClick={ () => setMenuState(menuState !== 2 ? 2 : 0) }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.89">
                            <path d="M61.44,0a61.3,61.3,0,0,1,23.5,4.66l.11,0A61.38,61.38,0,0,1,104.88,18h0A61.47,61.47,0,0,1,118.22,85l0,.11a61.54,61.54,0,0,1-13.3,19.83h0a61.47,61.47,0,0,1-66.94,13.34l-.11,0A61.51,61.51,0,0,1,18,104.89v0A61.46,61.46,0,0,1,4.66,37.94l0-.11A61.51,61.51,0,0,1,18,18h0A61.26,61.26,0,0,1,61.44,0ZM17,94.47l.24-.14C23.13,91,38.49,90,44.87,85.5a19.74,19.74,0,0,0,1.46-2.83c.73-1.67,1.4-3.5,1.82-4.74a58.44,58.44,0,0,1-4.77-6.8l-4.83-7.69a14.14,14.14,0,0,1-2.74-7,5.46,5.46,0,0,1,.48-2.52A4.61,4.61,0,0,1,38,52a4.94,4.94,0,0,1,1.17-.59,121.67,121.67,0,0,1-.23-13.82,19.15,19.15,0,0,1,.59-3.13A18.51,18.51,0,0,1,47.64,24a25.58,25.58,0,0,1,6.84-3c1.54-.44-1.31-5.34.28-5.51,7.67-.79,20.08,6.22,25.44,12a18.74,18.74,0,0,1,4.73,11.84l-.3,12.54h0a3.47,3.47,0,0,1,2.54,2.63c.39,1.53,0,3.67-1.33,6.6h0a1.19,1.19,0,0,1-.08.16l-5.51,9.07a47.21,47.21,0,0,1-6.75,9.31l.74,1.06a32.18,32.18,0,0,0,3.6,4.63.79.79,0,0,1,.12.15c6.34,4.48,21.77,5.57,27.69,8.87l.24.14a55.38,55.38,0,1,0-88.9,0Z"/>
                        </svg>
                    </button>
                </div>
                {/* Button for the main menu */}
                <div className={`${styles["ham-menu-container"]} blue_BG`}>
                    <HamburgerButton {...props} />
                </div>
            </div>

        </header>
    )   
}

export default Header;