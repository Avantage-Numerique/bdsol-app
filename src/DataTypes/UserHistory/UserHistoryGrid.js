import React, {useContext, useEffect, useState} from 'react'

import {useHttpClient} from '@/src/hooks/http-hook'

//Context
import {useAuth} from '@/src/authentification/context/auth-context'

//Styling
import styles from './UserHistoryGrid.module.scss'
import Button from "@/src/common/FormElements/Buttons/Button/Button";


const UserHistoryGrid = (props) => {
    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const auth = useAuth();

    //Data history query
    const formData = {
        "data": {
            "username": auth.username
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
        if(auth.user.isLoggedIn) getUsersHistory();

    }, [auth.user.isLoggedIn]);

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
                            <div>{modification.action}</div>
                            <div>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</div>
                            <div>
                                <Button slim key={modification._id.toString() + "BTN"} onClick={function () {
                                    alert(JSON.stringify(modification._id) + '  ' + JSON.stringify(modification.fields))
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