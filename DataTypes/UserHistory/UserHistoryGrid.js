import React, {useContext, useEffect, useState} from 'react'

import {useHttpClient} from '../../app/hooks/http-hook'

//Context
import {AuthContext} from '../../authentication/context/auth-context'

//Styling
import styles from './UserHistoryGrid.module.scss'
import Button from "../../app/common/FormElements/Buttons/Button/Button";


const UserHistoryGrid = (props) => {
    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const auth = useContext(AuthContext);

    //Data UserHistory query
    const formData = {
        "data": {
            "user": auth._id
        }
    };

    const [usersHistory, setUsersHistory] = useState([]);

    useEffect(() => {
        const getUsersHistory = async () => {
            const usersHistory =  await sendRequest(
                "/userhistory/list",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            );
            setUsersHistory(usersHistory);
        }
        if(auth.isLoggedIn) getUsersHistory();

    }, [auth.isLoggedIn]);

    if (usersHistory
        && !usersHistory.error
        && usersHistory.data
        && usersHistory.data.length > 0)
    {

        const dateLanguage = 'en-CA';
        const timeLanguage = 'it-IT'
        return (
            <>
                <h3>Historique de modification</h3>
                <div key={`${styles["history-table"]}`} className={`${styles["history-table"]}`}>
                    {usersHistory.data.map( modification =>
                        <>
                            <div>{new Date(modification.modifDate).toLocaleDateString(dateLanguage)} <br></br> {new Date(modification.modifDate).toLocaleTimeString(timeLanguage)}</div>
                            <div>{modification.action == 'create' ? "Création de " : "Mise à jour de "}{modification.fields.name ? modification.fields.name : modification.fields.firstName + " " +modification.fields.lastName}</div>
                            <div>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</div>
                            <div>
                                <Button slim key={modification._id.toString() + "BTN"} onClick={function () {
                                    alert(JSON.stringify(modification.fields, null, 4));
                                }}>Détails</Button>
                            </div>
                        </>
                    )}
                </div>
            </>
        )
    }
}


export default UserHistoryGrid