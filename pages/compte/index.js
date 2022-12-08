import React, {useState} from 'react'

//Components
import UserHistoryGrid from '@/src/DataTypes/UserHistory/UserHistoryGrid';
import Button from '@/src/common/FormElements/Buttons/Button/Button';

//Hooks
import {useSessionHook} from '@/auth/hooks/useSessionHook';

//Styling
import styles from './accountPage.module.scss'
import Profile from '@/src/common/Containers/UserAccount/Profile/profile';
import Preferences from '@/src/common/Containers/UserAccount/Preferences/preferences';
import Help from '@/src/common/Containers/UserAccount/Help/help';
import {withSessionSsr} from "@/auth/session/handlers/withSession";
import {ssrCanAccess} from "@/auth/permissions/ssrCanAccess";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageHeader from "@/layouts/Header/PageHeader";
import {lang} from "@/common/Data/GlobalConstants";

const accountPage = ({ user }) => {

    //Access logout function
    const {logout} = useSessionHook();

    //UseState
    const [leftMenu, setLeftMenu] = useState("help");

    const dateLanguage = 'en-CA';

    return (
        <div className={"page-container pb-3"}>
            <PageHeader title={`${lang.memberSpaceWelcome}, ${user && (user.username)}`} />
            <Container>
                    <Row>
                        <Col xs={9} className={"pb-3"}>
                            <div className={"px-2"}>
                                {leftMenu === "history" && <UserHistoryGrid/>}
                                {leftMenu === "preferences" && <Preferences/>}
                                {leftMenu === "profile" && <Profile/>}
                                {leftMenu === "help" && <Help/>}
                            </div>
                        </Col>

                        <Col as={"aside"} xs={3}>
                            {user && (
                                <div className={"side-menu"}>
                                    <h3>
                                        Menu
                                    </h3>
                                    <div className={`d-flex flex-row user-card`}>
                                        <div>
                                            {(user.avatar === undefined || user.avatar === null || user.avatar.toString() === "") ?
                                                <img src="https://freesvg.org/img/1389952697.png" alt="Aucune image de profil" width="80" height="80"/>
                                                :
                                                <img src={user.avatar} alt="Ton avatar" width="80" height="80"/>
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
                                    <Button key="historique" onClick={() => setLeftMenu("history")}>Historique de modification</Button>
                                    <Button key="help" onClick={() => setLeftMenu("help")}>Aide</Button>
                                    <Button key="logout" onClick={logout}>Se déconnecter</Button>
                                </div>
                            )}
                        </Col>
                    </Row>
            </Container>
        </div>
    );
}

export const getServerSideProps = withSessionSsr(ssrCanAccess);


export default accountPage