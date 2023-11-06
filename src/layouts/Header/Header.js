import { useEffect, useState } from 'react'
import Image from "next/image"; 
import Link from 'next/link';

//Components 
import HamburgerButton from '@/src/common/FormElements/HamburgerButton/HamburgerButton';
import ConnectionBanner from "@/src/layouts/ConnexionBanner/ConnectionBanner";
import SearchBar from '@/src/common/Components/SearchBar';
import Icon from "@/common/widgets/Icon/Icon";

//Contextes
import {useAuth} from '@/auth/context/auth-context';

//Utils 
import {lang} from "@/common/Data/GlobalConstants";

//Styling
import styles from './Header.module.scss'
import logo from '@/public/logos-avnu/AVNU-LogoReduit-RVB.png'



const Header = (props) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Destructuring to acces those elements easier
    const { menuState, setMenuState } = props

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

            <div className="container-fluid h-100">
                <div className="row h-100 align-items-center">
                    <div className="col">
                        {/* Container that fills all the width of the platform and contain the logo*/}
                        <div className={`${styles["header__content"]} header-center d-flex justify-content-start align-items-center text-light h-100`} onClick={ () => setMenuState(0) }>
                            <Link href="/" className={"fs-5 px-5"}>
                                <Image src={logo} alt="Logo réduit de AVNU"/>
                            </Link>
                        </div>
                    </div>

                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <div className={`${styles["searchbar-menu-container"]} align-items-center justify-content-center`}>
                                        <SearchBar id="searchbar-layout" clearAfterSearch="true" small />
                                    </div>
                                </div>
                                {auth.user.isLoggedIn &&
                                    <div className={"col-2 d-flex-content-center"}>
                                        <div className="d-grid w-100" onClick={ () => setMenuState(0) }>
                                            <Link href={"/contribuer"} className={"btn btn-outline-light"}>
                                                 <Icon iconName="plus-circle" /> {lang.menuContributeLabel}
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col g-0 h-100">
                        <div className={"d-flex justify-content-end h-100"}>
                            { !auth.user.isLoggedIn &&
                                <ul className={`nav flex-nowrap align-items-center`} onClick={ () => setMenuState(0) }>
                                    <li>
                                        <a href="/compte/inscription" className={"nav-link text-black"}>{lang.menuSubscribeLabel}</a>
                                    </li>
                                    <li>
                                        <a href="/compte/connexion" className={`nav-link text-black`}><Icon iconName="sign-in-alt" className={"la-lg"} /> {lang.menuConnectLabel}</a>
                                    </li>
                                </ul>
                            }
                            { auth.user.isLoggedIn &&
                                <div className={`bg-primary d-flex align-items-center h-100 ${styles["account-menu-container"]}`}>
                                    <button
                                        className={`${styles["account-menu-container__button"]} bg-secondary`}
                                        onClick={() => setMenuState(menuState !== 2 ? 2 : 0) }>

                                        {(auth.user.avatar === undefined || auth.user.avatar === null || auth.user.avatar.toString() === "") ?
                                            <img className={`${styles["user-img"]} img-fluid`}
                                                 src="/general_images/default-avatar.webp"
                                                 alt="Aucune image de profil"/>
                                            :
                                            <img
                                                className={`${styles["user-img"]} img-fluid`}
                                                src={auth.user.avatar}
                                                alt="Votre avatar"
                                            />
                                        }
                                    </button>
                                </div>
                            }

                            {/* Button for the main menu */}
                            <div className={`${styles["ham-menu-container"]}`}>
                                <HamburgerButton {...props} />
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