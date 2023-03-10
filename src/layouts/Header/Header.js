import HamburgerButton from '@/src/common/FormElements/HamburgerButton/HamburgerButton';
import Link from 'next/link';
import {useAuth} from '@/auth/context/auth-context';
import styles from './Header.module.scss'
import ConnectionBanner from "@/src/layouts/ConnexionBanner/ConnectionBanner";
import SearchBar from '@/src/common/Components/SearchBar';
import {lang} from "@/common/Data/GlobalConstants";


const Header = (props) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Destructuring to acces those elements easier
    const { menuState, setMenuState } = props

    return (
        <header className={`main-nav ${styles.header} bg-dark sticky-top`}>

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {/* Container that fills all the width of the platform and contain the logo*/}
                        <div className={`${styles["header__content"]} header-center`} onClick={ () => setMenuState(0) }>
                            <Link href="/">
                                <img src="/logo.svg" alt="Logo Avantage Numérique" />
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
                                    <div className={"col d-flex-content-center"}>
                                            <div className="d-grid w-100" onClick={ () => setMenuState(0) }>
                                                <a href="/contribuer" className={"btn btn-outline-light"}><i className="las la-plus-circle"></i> {lang.menuContributeLabel}</a>
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
                                        <a href="/compte/inscription" className={"nav-link"}>{lang.menuSubscribeLabel}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/compte/connexion" className={`nav-link`}><i
                                            className="las la-sign-in-alt la-lg"></i> {lang.menuConnectLabel}</a>
                                    </li>
                                </ul>
                            }
                            { auth.user.isLoggedIn &&
                                <div className={`bg-primary d-flex align-items-center ${styles["account-menu-container"]}`}>
                                    <button
                                        className={`${styles["account-menu-container__button"]}`}
                                        onClick={() => setMenuState(menuState !== 2 ? 2 : 0) }>

                                        {(auth.user.avatar === undefined || auth.user.avatar === null || auth.user.avatar.toString() === "") ?
                                            <img className={`${styles["user-img"]} img-fluid`}
                                                 src="https://freesvg.org/img/1389952697.png"
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
                            <div className={`${styles["ham-menu-container"]} bg-primary`}>
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