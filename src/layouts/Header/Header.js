import HamburgerButton from '@/src/common/FormElements/HamburgerButton/HamburgerButton';
import Link from 'next/link';
import {useAuth} from '@/auth/context/auth-context';
import styles from './Header.module.scss'
import ConnectionBanner from "@/src/layouts/ConnexionBanner/ConnectionBanner";
import SearchBar from '@/src/common/Components/SearchBar';
import {lang} from "@/common/Data/GlobalConstants";
import Icon from "@/common/widgets/Icon/Icon";
import Image from "next/image"; 
import logo from '@/public/logos-avnu/AVNU-LogoReduit-RVB.png'

const Header = (props) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Destructuring to acces those elements easier
    const { menuState, setMenuState } = props

    return (
        <header className={`main-nav ${styles.header} sticky-top bg-primary-dark`}>

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {/* Container that fills all the width of the platform and contain the logo*/}
                        <div className={`${styles["header__content"]} header-center d-flex justify-content-start align-items-center text-light`} onClick={ () => setMenuState(0) }>
                            <Link href="/" className={"fs-5 px-5"}>
                                <Image src={logo} alt="Logo réduit de AVNU"/>
                            </Link>
                        </div>
                    </div>

                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <div className={`${styles["searchbar-menu-container"]} align-items-center`}>
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

                    <div className="col g-0">
                        <div className={"d-flex justify-content-end"}>
                            { !auth.user.isLoggedIn &&
                                <ul className={`nav align-items-center`} onClick={ () => setMenuState(0) }>
                                    <li className="nav-item">
                                        <a href="/compte/inscription" className={"nav-link text-black"}>{lang.menuSubscribeLabel}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/compte/connexion" className={`nav-link text-black`}><Icon iconName="sign-in-alt" className={"la-lg"} /> {lang.menuConnectLabel}</a>
                                    </li>
                                </ul>
                            }
                            { auth.user.isLoggedIn &&
                                <div className={`bg-primary d-flex align-items-center ${styles["account-menu-container"]}`}>
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