/*
    Navigation bar displayed in the top of a page 
    V.P.R.
*/
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
//Components
import Button from '@/src/common/FormElements/Button/Button'

//Styling
import styles from './Nav.module.scss'
import organizationPresentationImg from '@/public/general_images/Fusée_Planetes_Pointilles2_90deg.svg'

//Entities
import Person from "@/DataTypes/Person/models/Person";
import Organisation from "@/DataTypes/Organisation/models/Organisation";
import Project from "@/DataTypes/Project/models/Project";
import Event from "@/DataTypes/Event/models/Event";
import Equipment from "@/DataTypes/Equipment/models/Equipment";

//Contextes & hooks
import {useAuth} from '@/auth/context/auth-context';
import {useSessionHook} from '@/auth/hooks/useSessionHook'

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import AppRoutes from '@/src/Routing/AppRoutes'
import MainNavButton from "@/layouts/Navigation/MainNav/MainNavButton";
import SearchBar from "@/common/Components/SearchBar";

const Nav = ( {menuState, setMenuState} ) => {

    //Listen for a page change. If it happens, close the menu
    const router = useRouter();
    //Import the authentication context to know if the user is connected
    const auth = useAuth();
    //Extract logout function
    const { logout } = useSessionHook();
    
    //When the page change, close the menu
    useEffect(() => {
        //Verify the the menu is open. If it is, then close it
        if (menuState){
            setMenuState(false);
        }
    }, [router.asPath]);

    /**
     * Handle all the MainNavButton, check if we've click the current pagge. And force the close menu state.
     * The use Effect still applies.
     * @param path
     */
    const navLinkHandler = (path) => {
        if (router.asPath === path) {
            setMenuState(false);
        }
    };

    const toggleScrollableBody = () => {
        if(menuState === undefined)
            return
        if (typeof document === 'undefined') 
            return 
        if(document.body.classList.contains('menu-open')){
            if(!menuState)
                //Remove the class
                document.body.classList.remove('menu-open')
        } else {
            if(menuState)
                //Remove the class
                document.body.classList.add('menu-open')
        }
    }

    useEffect(() => {
        toggleScrollableBody()
    }, [])
    toggleScrollableBody()

    return (

        <nav className={`${styles.navContainer} ${menuState && styles.displayed} bg-primary-lighter`}>
            <div className="position-relative h-100">
                <div className={`${styles["top-covering-color"]}`}></div>
                <figure className={`${styles["bg-img-container"]} d-none d-sm-block`}>
                    <Image className={`position-absolute ${styles["bg-img"]}`} src={organizationPresentationImg} alt={"Fusée avec le canard d'AVNU qui se déplace dans l'espace."} /> 
                </figure>
                <div className={`container ${styles["main-section"]}`}>
                    <div className={`row ${styles["limited-width"]} d-md-none`}>
                        <div className="col">
                            <section className={`${styles["nav-section"]} search-bar-main-nav`}>
                                <SearchBar id="searchbar-layout" clearAfterSearch="true" small/>
                            </section>
                        </div>
                    </div>
                    <div className={`row ${styles["limited-width"]}`}>
                        <div className="col">

                            <section className={`${styles["nav-section"]}`}>
                                <MainNavButton className="fs-3 h2" route={AppRoutes.consult} handler={navLinkHandler}
                                               label={"Consulter les données"}/>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <MainNavButton className="fs-3 h2" route={AppRoutes.contribute} handler={navLinkHandler}
                                               label={"Ajouter des données"}/>
                                <ul className={`${styles["button-list"]}`}>
                                    <li>
                                        <MainNavButton route={AppRoutes.organisationsCreate}
                                                       iconClassName={`${Organisation.icon} ${styles["entity-icon"]}`}
                                                       handler={navLinkHandler}/>
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.personCreate}
                                                       iconClassName={`${Person.icon} ${styles["entity-icon"]}`}
                                                       handler={navLinkHandler}/>
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.projectCreate}
                                                       iconClassName={`${Project.icon} ${styles["entity-icon"]}`}
                                                       handler={navLinkHandler}/>
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.eventCreate}
                                                       iconClassName={`${Event.icon} ${styles["entity-icon"]}`}
                                                       handler={navLinkHandler}/>
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.equipmentCreate}
                                                       iconClassName={`${Equipment.icon} ${styles["entity-icon"]}`}
                                                       handler={navLinkHandler}/>
                                    </li>
                                </ul>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <MainNavButton className="fs-3 h2" route={AppRoutes.categories} handler={navLinkHandler}
                                               label={"Filtrer les données par catégories"}/>
                            </section>
                        </div>
                        <div className="col">
                            <section className={`${styles["nav-section"]}`}>
                                <MainNavButton className="fs-3 h2" route={AppRoutes.about} handler={navLinkHandler}/>
                                <ul className={`${styles["button-list"]}`}>
                                    <li>
                                        <MainNavButton route={AppRoutes.about} handler={navLinkHandler} label={"En savoir plus sur le projet AVNU"} />
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.about} suffix="#equipe" handler={navLinkHandler} label={"Notre équipe"} />
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.contact} handler={navLinkHandler} />
                                    </li>
                                    <li>
                                        <MainNavButton route={AppRoutes.faq} handler={navLinkHandler} />
                                    </li>
                                </ul>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <div className="fs-3 h2" text_color="dark">Espace membre</div>
                                <ul className={`${styles["button-list"]}`}>
                                    { auth.user.isLoggedIn ? 
                                    <>
                                        <li>
                                            <MainNavButton route={AppRoutes.account} handler={navLinkHandler} label={"Mon profil"} />
                                        </li>
                                        <li>
                                            <Button onClick={logout} text_color="dark">{lang.menuLabelToDisconnect}</Button>
                                        </li>
                                    </> 
                                    :
                                    <> 
                                        <li>
                                            <MainNavButton route={AppRoutes.connection} handler={navLinkHandler} />
                                        </li>
                                        <li>
                                            <MainNavButton route={AppRoutes.register} handler={navLinkHandler} />
                                        </li>
                                    </>
                                    }
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
    )   
}

export default Nav;

