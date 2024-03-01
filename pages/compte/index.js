import React, {useState} from 'react'

//components
import UserHistoryGrid from '@/src/DataTypes/UserHistory/UserHistoryGrid';
import Button from '@/src/common/FormElements/Button/Button';
import PageMeta from "@/src/common/PageMeta/PageMeta";

//Hooks
import {useSessionHook} from '@/auth/hooks/useSessionHook';

//Styling
import styles from './accountPage.module.scss'
import Account from '@/src/common/Containers/UserAccount/Account/Account';
import Help from '@/src/common/Containers/UserAccount/Help/help';
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import PageHeader from "@/layouts/Header/PageHeader";
import {lang} from "@/common/Data/GlobalConstants";

const accountPage = ({ user }) => {

    //Access logout function
    const {logout} = useSessionHook();

    //UseState
    const [leftMenu, setLeftMenu] = useState("history");

    const dateLanguage = 'fr-CA';
    const dateOption = {year: 'numeric', month: 'long', day: 'numeric'}

    return (
        <div className={"account-page pb-3"}>
            <PageMeta 
                title={"Espace membre - AVNU"}
                description={"Explorez votre espace membre : suivez l'historique de vos modifications, modifiez vos informations personnelles ou obtenez des astuces de navigation."}
                preventIndexation
            />
            <PageHeader title={`${lang.memberSpaceWelcome}, ${user && (user.username)}`} />
            <div className="container">
                <div className="row py-2">
                    <aside className="col col-md-4 col-lg-3 py-2">
                        {user && (
                            <div className={"side-menu"}>
                                <div className={`${styles["user-card"]}`}>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 bg-secondary">
                                        {(user.avatar === undefined || user.avatar === null || user.avatar.toString() === "") ?
                                                <img src="/general_images/default-avatar.webp" className={"img-fluid"} alt="Aucune image de profil" width="120" height="120"/>
                                                :
                                                <img src={user.avatar} alt="Ton avatar" width="120" height="120"/>
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <h3>{user.name}</h3>
                                    <div className="fw-bold">{user.username}</div>
                                </div>

                                <div className="mt-4">
                                    Membre depuis le <br/>
                                    {new Date(user.createdAt).toLocaleDateString(dateLanguage, dateOption)}
                                </div>
                                
                                <div className="d-flex flex-column mt-4">
                                    {<Button size="slim" className="mt-1 mb-1" key="modif" onClick={() => setLeftMenu("account")}>Mon compte</Button>}
                                    {/*<Button size="slim" className="mt-1 mb-1" key="pref" onClick={() => setLeftMenu("preferences")}>Préférences</Button>*/}
                                    <Button size="slim" className="mt-1 mb-1" key="historique" onClick={() => setLeftMenu("history")}>Historique de modification</Button>
                                    <Button size="slim" className="mt-1 mb-1" key="help" onClick={() => setLeftMenu("help")}>Aide</Button>
                                    <Button size="slim" href={"/contribuer"} className={"btn-block"}>Contribuer à la base de donnée</Button>
                                    <Button size="slim" color="white" outline="danger" className="mt-1 mb-1" key="logout" onClick={logout}>Se déconnecter</Button>

                                </div>
                            </div>
                        )}
                    </aside>
                    <div className="col col-md-8 col-lg-9 py-2">
                        <div className={"account-page-content"}>
                            {leftMenu === "history" && <UserHistoryGrid/>}
                            {/*leftMenu === "preferences" && <Preferences/>*/}
                            {leftMenu === "account" && <Account/>}
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