import React, {useEffect, useState} from 'react'

import {useHttpClient} from '@/src/hooks/http-hook'

//Context
import {useAuth} from '@/src/authentification/context/auth-context'

//Styling
import styles from './UserHistoryGrid.module.scss'
import Button from "@/src/common/FormElements/Buttons/Button/Button";


const UserHistoryGrid = () => {
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

    const modificationMsg = (modif) => {
        switch (modif){
            case "create": return "Création de ";
            case "update": return "Mise à jour de ";
            case "delete": return "Suppression de ";
            default : return "action state undefined";
        }
    }
    const dateLanguage = 'en-CA';
    const timeLanguage = 'it-IT'
    
    if (usersHistory
        && !usersHistory.error
        && usersHistory.data
        && usersHistory.data.length > 0)
    {
        return (
            <>
                <h3>Historique de modification</h3>
                <div key={`${styles["history-table"]}`} className={`${styles["history-table"]}`}>
                    {usersHistory.data.map( modification =>
                        <>
                            <div>{new Date(modification.modifDate).toLocaleDateString(dateLanguage)} <br></br> {new Date(modification.modifDate).toLocaleTimeString(timeLanguage)}</div>
                            <div>{modificationMsg(modification.action)}
                                {modification.user == modification.modifiedEntity ? "votre compte : " : "l'entité : " }
                                {modification.fields.username ? modification.fields.username + ". " : null}
                                {modification.fields.firstName ? modification.fields.firstName + " " + modification.fields.lastName : modification.fields.name}
                            </div>
                            <div>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</div>
                            <div>
                                <Button slim key={modification._id.toString() + "BTN"} onClick={function () {
                                    alert(Object.keys(modification.fields).map( key =>
                                        '\n' + key + ' : ' + (modification.fields[key] ? modification.fields[key] : "\"\"")));
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