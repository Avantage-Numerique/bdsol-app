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
import organizationPresentationImg from '@/public/general_images/Fusée_Planetes_Poitilles2_90deg.svg'

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
        if (menuState){ setMenuState(false) }
    }, [router.asPath]);

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
                    <div className={`row ${styles["limited-width"]}`}>
                        <div className="col">
                            <section className={`${styles["nav-section"]}`}>
                                <Button className={`fs-3 h2`} text_color="dark" href={AppRoutes.consult.asPath}>Consulter les données</Button>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <Button className="fs-3 h2" text_color="dark" href={AppRoutes.contribute.asPath}>Ajouter des données</Button>
                                <ul className={`${styles["button-list"]}`}>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.organisationsCreate.asPath}><i className={`${Organisation.icon} ${styles["entity-icon"]}`} />Ajouter une organisation</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.personCreate.asPath}><i className={`${Person.icon} ${styles["entity-icon"]}`} />Ajouter une personne</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.projectCreate.asPath}><i className={`${Project.icon} ${styles["entity-icon"]}`} />Ajouter un projet</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.eventCreate.asPath}><i className={`${Event.icon} ${styles["entity-icon"]}`} />Ajouter un événement</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.equipmentCreate.asPath}><i className={`${Equipment.icon} ${styles["entity-icon"]}`} />Ajouter un équipement</Button>
                                    </li>
                                </ul>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <Button className="fs-3 h2" text_color="dark" href={AppRoutes.categories.asPath}>Filtrer les données par catégories</Button>
                            </section>
                        </div>
                        <div className="col">
                            <section className={`${styles["nav-section"]}`}>
                                <Button className="fs-3 h2" text_color="dark" href={AppRoutes.about.asPath}>À propos</Button>
                                <ul className={`${styles["button-list"]}`}>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.about.asPath}>En savoir plus sur le projet AVNU</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.about.asPath+"#equipe"}>Notre équipe</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.contact.asPath}>Nous joindre</Button>
                                    </li>
                                    <li>
                                        <Button text_color="dark" href={AppRoutes.faq.asPath}>FAQ</Button>
                                    </li>
                                </ul>
                            </section>

                            <section className={`${styles["nav-section"]}`}>
                                <div className="fs-3 h2" text_color="dark">Espace membre</div>
                                <ul className={`${styles["button-list"]}`}>
                                    { auth.user.isLoggedIn ? 
                                    <>
                                        <li>
                                            <Button href={AppRoutes.account.asPath} text_color="dark">Mon profil</Button>
                                        </li>
                                        <li>
                                            <Button onClick={logout} text_color="dark">{lang.menuLabelToDisconnect}</Button>
                                        </li>
                                    </> 
                                    :
                                    <> 
                                        <li>
                                            <Button href={AppRoutes.connection.asPath} text_color="dark">{lang.menuLabelConnect}</Button>
                                        </li>
                                        <li>
                                            <Button href={AppRoutes.register.asPath} text_color="dark">{lang.menuLabelCreateAccount}</Button>
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

