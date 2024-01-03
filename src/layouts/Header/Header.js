
import { useEffect, useState } from 'react'
import Image from "next/image"; 
import Link from 'next/link';

//Components 
import HamburgerButton from '@/src/common/FormElements/HamburgerButton/HamburgerButton';
import ConnectionBanner from "@/src/layouts/ConnexionBanner/ConnectionBanner";
import SearchBar from '@/src/common/Components/SearchBar';
import Nav from '@/layouts/Navigation/MainNav/Nav'
import Button from "@/FormElements/Button/Button";

//Contextes
import {useAuth} from '@/auth/context/auth-context';

//Utils 
import {lang} from "@/common/Data/GlobalConstants";

//Styling
import styles from './Header.module.scss'
import logo from '@/public/AVNU_Branding/AVNU-LogoReduit-RVB.png'



const Header = (props) => {

    //Navigation menu state
    const [menuState, setMenuState] = useState(false);

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Window scrolling position 
    const [windowScrollTop, setWindowScrollTop] = useState(true)

    const updateHeaderState = () => {
        if(windowScrollTop)
            if(window.scrollY > 0)
                setWindowScrollTop(false)

        if(!windowScrollTop)
            if(window.scrollY < 5)
                setWindowScrollTop(true)
    }

    useEffect(() => {
        document.addEventListener('scroll', updateHeaderState);
        return () => document.removeEventListener('scroll', updateHeaderState);
    });

    return (
        <header className={`main-nav ${styles.header} ${!windowScrollTop && styles["scroll-inner-page"]}`}>
            <Nav menuState={menuState} setMenuState={setMenuState} />

            <div className="container-fluid h-100">
                <div className="row h-100 align-items-center">
                    <div className="col">
                        {/* Container that fills all the width of the platform and contain the logo*/}
                        <div className={`${styles["header__content"]} header-center d-flex justify-content-start align-items-center text-light h-100`} onClick={ () => setMenuState(0) }>
                            <Link href="/" className={`fs-5 ms-2 ps-2 ${styles["item-displayed-in-menu"]}`}>
                                <Image src={logo} alt="Logo réduit de AVNU"/>
                            </Link>
                        </div>
                    </div>

                    <div className="col-5 d-none d-sm-flex justify-content-center align-items-center">
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <div className={`${styles["searchbar-menu-container"]} align-items-center justify-content-center`}>
                                        <SearchBar id="searchbar-layout" clearAfterSearch="true" small />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col g-0 h-100">
                        <div className={"d-flex justify-content-end h-100"}>
                            { !auth.user.isLoggedIn &&
                                <ul className={`nav flex-nowrap align-items-center h-100`} onClick={ () => setMenuState(false) }>
                                    <li>
                                        <a href="/compte/inscription" className={"nav-link text-black d-none d-md-block text-nowrap"}>{lang.menuSubscribeLabel}</a>
                                    </li>
                                    <li>
                                        <a href="/compte/connexion" className={`nav-link text-black text-nowrap`}>{lang.menuConnectLabel}</a>
                                    </li>
                                </ul>
                            }
                            {auth.user.isLoggedIn &&
                                <div className={"d-flex-content-center"}>
                                    <Button
                                        size="slim"
                                        className="rounded shadow-sm"
                                        href="/contribuer"
                                    >
                                        Contribuer
                                    </Button>
                                </div>
                            }
                            {/* Button for the main menu */}
                            <div className={`${styles["ham-menu-container"]} ${styles["item-displayed-in-menu"]}`}>
                                <HamburgerButton {...props} setMenuState={setMenuState} menuState={menuState}  />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <ConnectionBanner />
        </header>
    )
}

export default Header;