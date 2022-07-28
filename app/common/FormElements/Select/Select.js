import React, {useEffect, useState, useReducer} from 'react'
import {useHttpClient} from '../../../../app/hooks/http-hook'
//Styling
import styles from './Select.module.scss'

const Select = (props) => {

    const inputReducer = (state, action) => {
        return {
            ...state,
            value: action.val,
            isValid: true
        };
    }

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '', 
        isValid: true
    });

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

    //const inputState = {value:'', isValid:true};
    const { name, onInput } = props;
    const { value, isValid } = inputState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({val: event.target.value, isValid:true})
    }

    if( occupationList &&
        !occupationList.error &&
        occupationList.data &&
        occupationList.data.length > 0)
    return (
        <>
            <label for='occupation'>{props.label}</label>
            <input type="text" list='occupationsDatalist' name='occupationInput'
                id='occupationInput' placeholder=' "Enseignant", "Architecte logiciel", [...]'
                className={`${styles["datalist-input"]}`} onChange={changeHandler}/>
            <datalist id='occupationsDatalist' name="occupationsDatalist" className={`${styles["datalist-input"]}`}>
                {occupationList.data.map( occ => 
                    <option value={occ.id}>{occ.name}</option>
                )}
            </datalist>
        </>
    );
}

export default Select;


