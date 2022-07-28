import React, {useEffect, useState} from 'react'
import {useHttpClient} from '../../../../app/hooks/http-hook'
//Styling
import styles from './Select.module.scss'

const Select = (props) => {

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    //Data history query
    const formData = {
        "data": {
            "category": "occupation"
        }
    };

    const [occupationList, setOccupationList] = useState([]);

    useEffect(() => {
        const getOccupation = async () => {
            const occupationList =  await sendRequest(
                "/taxonomy/list",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            );
            setOccupationList(occupationList);
        }
        getOccupation();
    },[]);

    if( occupationList &&
        !occupationList.error &&
        occupationList.data &&
        occupationList.data.length > 0)
    return (
        <>
            <label for='occupation'>{props.label}</label>
            <input list='occupations' name='occupation'
                id='occupation' placeholder=' "Enseignant", "Architecte logiciel", [...]'
                className={`${styles["datalist-input"]}`}
                type="text"/>
            <datalist id='occupations' className={`${styles["datalist-input"]}`}>
                {occupationList.data.map( occ => 
                    <option value={occ.id}>{occ.name}</option>
                )}
            </datalist>
        </>
    );
}

export default Select;


