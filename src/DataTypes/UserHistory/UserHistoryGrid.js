import React, {useEffect, useState} from 'react'

import {useHttpClient} from '@/src/hooks/http-hook'

//Context
import {useAuth} from '@/src/authentification/context/auth-context'

//Styling
import Button from "@/src/common/FormElements/Button/Button";


const UserHistoryGrid = () => {
    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const auth = useAuth();

    //Data history query
    const formData = {
        "data": {
            "user": auth.user.id
        }
    };

    useEffect( () => {console.log("id", auth.user.id)}, [auth])

    const [usersHistory, setUsersHistory] = useState([]);

    useEffect(() => {
        const getUsersHistory = async () => {
            const usersHistory =  await sendRequest(
                "/userhistories/list",
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
        && usersHistory.data)
    {
        return (
            <div>
                <h3>Historique de modification</h3>
            {
                usersHistory.data.length == 0 ?
                <div>Aucun historique de modification pour le moment</div>
                :
                (
                    <table key="userhistory-table" className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                                <th scope="col"># Champs modifiés</th>
                                <th scope="col">Détails</th>
                            </tr>
                        </thead>
                        <tbody>
                        {usersHistory.data.map( (modification, index) =>
                            <tr key={"userHistoryGridList-" + index}>
                                <td>{new Date(modification.modifDate).toLocaleDateString(dateLanguage)} <br></br> {new Date(modification.modifDate).toLocaleTimeString(timeLanguage)}</td>
                                <td>{modificationMsg(modification.action)}
                                    {modification.user == modification.modifiedEntity ? "votre compte : " : "l'entité : " }
                                    {modification.fields.username ? modification.fields.username + ". " : null}
                                    {modification.fields.firstName ? modification.fields.firstName + " " + modification.fields.lastName : modification.fields.name}
                                </td>
                                <td>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</td>
                                <td>
                                    <Button slim key={modification._id.toString() + "BTN"} onClick={function () {
                                        alert(Object.keys(modification.fields).map( key =>
                                            '\n' + key + ' : ' + (modification.fields[key] ? modification.fields[key] : "\"\"")));
                                    }}>Détails</Button>
                                </td>
                            </tr>
                        )}       
                        </tbody>
                    </table>
                )
            }
            </div>
        )
    }
}


export default UserHistoryGrid