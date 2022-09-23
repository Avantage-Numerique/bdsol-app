import React, {useState} from 'react'

//Context
import {AuthContext} from '../../authentication/context/auth-context'

//Components
import UserHistoryGrid from '../../DataTypes/UserHistory/UserHistoryGrid';
import Button from '../../app/common/FormElements/Buttons/Button/Button';

//Hooks
import {useSessionHook} from '../../authentication/hooks/useSessionHook'


//Styling
import styles from './accountPage.module.scss'
import Profile from '../../app/common/Containers/UserAccount/Profile/profile';
import Preferences from '../../app/common/Containers/UserAccount/Preferences/preferences';
import Help from '../../app/common/Containers/UserAccount/Help/help';
import {withSessionSsr} from "../../authentication/session/handlers/withSession";
import {ssrCanAccess} from "../../authentication/permissions/ssrCanAccess";

const accountPage = ({ user }) => {

    //Access logout function
    const {logout} = useSessionHook();

    //UseState
    const [leftMenu, setLeftMenu] = useState("help");

    const dateLanguage = 'en-CA';

    return (
        <div className={`col-12 ${styles["account-page"]}`}>

            <header className="col-12">
                <div className="maxWidthPageContainer">
                    <h1 className="col-12 blue1">Bienvenue {user && (user.username)}</h1>
                </div>
            </header>

            <div className="maxWidthPageContainer">

                <section className={"col-9"}>
                    <div className={"account-page-content"}>
                        {leftMenu === "history" && <UserHistoryGrid/>}
                        {leftMenu === "preferences" && <Preferences/>}
                        {leftMenu === "profile" && <Profile/>}
                        {leftMenu === "help" && <Help/>}
                    </div>
                </section>

                <aside className={"col-3"}>
                    {user && (
                        <div className={"side-menu"}>
                            <h3 className={`col-12`}>
                                Menu
                            </h3>
                            <div className={`${styles["user-card"]}`}>
                                <div>
                                    {(user.avatar === undefined || user.avatar === null || user.avatar.toString() === "") ?
                                        <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil"
                                             width="80px" height="80px"/>
                                        : <img src={user.avatar} alt="Ton avatar" width="80px" height="80px"/>
                                    }
                                </div>
                                <div>
                                    <span>{user.name}</span><br/>
                                    <span>{user.username}</span><br/>
                                    <span>Membre depuis le {new Date(user.createdAt).toLocaleDateString(dateLanguage)}</span><br/>
                                </div>
                            </div>

                            <Button key="modif" onClick={() => setLeftMenu("profile")}>Modifier mon profil</Button>
                            <Button key="pref" onClick={() => setLeftMenu("preferences")}>Préférences</Button>
                            <Button key="historique" onClick={() => setLeftMenu("history")}>Historique de
                                modification</Button>
                            <Button key="help" onClick={() => setLeftMenu("help")}>Aide</Button>
                            <Button key="logout" onClick={logout}>Se déconnecter</Button>
                        </div>

                    )}
                </aside>
            </div>
        </div>
    );
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);


export default accountPage