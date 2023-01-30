import React, {useState} from 'react'

//Components
import UserHistoryGrid from '@/src/DataTypes/UserHistory/UserHistoryGrid';
import Button from '@/src/common/FormElements/Button/Button';

//Hooks
import {useSessionHook} from '@/auth/hooks/useSessionHook';

//Styling
import styles from './accountPage.module.scss'
import Profile from '@/src/common/Containers/UserAccount/Profile/profile';
import Preferences from '@/src/common/Containers/UserAccount/Preferences/preferences';
import Help from '@/src/common/Containers/UserAccount/Help/help';
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import PageHeader from "@/layouts/Header/PageHeader";
import {lang} from "@/common/Data/GlobalConstants";

const accountPage = ({ user }) => {

    //Access logout function
    const {logout} = useSessionHook();

    //UseState
    const [leftMenu, setLeftMenu] = useState("help");

    const dateLanguage = 'en-CA';

    return (
        <div className={"account-page pb-3"}>
            <PageHeader title={`${lang.memberSpaceWelcome}, ${user && (user.username)}`} />
            <div className="container">
                <div className="row gx-5">
                    <aside className="col col-sm-3">
                        {user && (
                            <div className={"side-menu"}>
                                <div className={`${styles["user-card"]}`}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0">
                                        {(user.avatar === undefined || user.avatar === null || user.avatar.toString() === "") ?
                                                <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80" height="80"/>
                                                :
                                                <img src={user.avatar} alt="Ton avatar" width="80" height="80"/>
                                            }
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h3>{user.name}</h3>
                                            <div>{user.username}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    Membre depuis le {new Date(user.createdAt).toLocaleDateString(dateLanguage)}
                                </div>
                                
                                <div className="d-flex flex-column mt-4">
                                    <Button size="slim" classes="mt-1 mb-1" key="modif" onClick={() => setLeftMenu("profile")}>Modifier mon profil</Button>
                                    <Button size="slim" classes="mt-1 mb-1" key="pref" onClick={() => setLeftMenu("preferences")}>Préférences</Button>
                                    <Button size="slim" classes="mt-1 mb-1" key="historique" onClick={() => setLeftMenu("history")}>Historique de modification</Button>
                                    <Button size="slim" classes="mt-1 mb-1" key="help" onClick={() => setLeftMenu("help")}>Aide</Button>
                                    <Button size="slim" color="white" outline="danger" classes="mt-1 mb-1" key="logout" onClick={logout}>Se déconnecter</Button>
                                </div>
                            </div>
                        )}
                    </aside>
                    <div className="col col-sm-9">
                        <div className={"account-page-content"}>
                            {leftMenu === "history" && <UserHistoryGrid/>}
                            {leftMenu === "preferences" && <Preferences/>}
                            {leftMenu === "profile" && <Profile/>}
                            {leftMenu === "help" && <Help/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);


export default accountPage