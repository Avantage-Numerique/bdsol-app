import React, {useEffect, useState} from 'react'

import {useHttpClient} from '@/src/hooks/http-hook'
import {useModal} from '@/src/hooks/useModal/useModal';
import SanitizedInnerHtml from '@/src/utils/SanitizedInnerHtml';

//Context
import {useAuth} from '@/src/authentification/context/auth-context'

//Styling
import Button from "@/src/common/FormElements/Button/Button";


const UserHistoryGrid = () => {
    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const {displayModal, modal, closeModal, Modal} = useModal();
    const [modalDataIndex, setModalDataIndex] = useState(0);

    const auth = useAuth();

    //Data history query
    const formData = {
        "data": {
            "user": `objId:${auth.user.id}`,
            "sort": {
                "updatedAt": "desc"
            }
        }
    };
    
    const [usersHistory, setUsersHistory] = useState({data:[]});

    useEffect(() => {
        const getUsersHistory = async () => {
            const usersHistoryResponse =  await sendRequest(
                "/userhistories/list",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            );
            setUsersHistory(usersHistoryResponse);
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
    const timeLanguage = 'it-IT';
    
    const openModalWithContent = (index) => {
        setModalDataIndex(index);
        displayModal();
    }

    function syntaxHighlight(json) {
        if (typeof json != 'string') {
             json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    return (
        <div>
            <h3>Historique de modification</h3>
        {
            usersHistory?.data?.length === 0 ?
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
                    { usersHistory?.data && usersHistory.data.map( (modification, index) =>
                        <tr key={"userHistoryGridList-" + index}>
                            <td>{new Date(modification.modifDate).toLocaleDateString(dateLanguage)} <br></br> {new Date(modification.modifDate).toLocaleTimeString(timeLanguage)}</td>
                            <td>{modificationMsg(modification.action)}
                                {modification.user == modification.modifiedEntity ? "votre compte : " : "l'entité : " }
                                {modification.fields.username ? modification.fields.username + ". " : null}
                                {modification.fields.firstName ? modification.fields.firstName + " " + modification.fields.lastName : modification.fields.name}
                            </td>
                            <td>{Object.keys(modification.fields).length} champ{Object.keys(modification.fields).length > 1 ? 's' : ''}</td>
                            <td>
                                <Button slim key={modification._id + "BTN"} onClick={() => {openModalWithContent(index)}}>Détails</Button>
                            </td>
                        </tr>
                    )}       
                    </tbody>
                </table>
            )
        }
        {
            modal.display &&
            <Modal
            closingFunction={closeModal}>

                <SanitizedInnerHtml tag="pre">
                    {syntaxHighlight(usersHistory.data[modalDataIndex])}
                </SanitizedInnerHtml>
            </Modal>
        }
        </div>
    )
    
}


export default UserHistoryGrid