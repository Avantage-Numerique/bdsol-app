import React, {useEffect, useState, useReducer} from 'react'
import {useHttpClient} from '../../../../app/hooks/http-hook'
import Button from '../Buttons/Button/Button'
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

    const [SelectList, setSelectList] = useState([]);

    useEffect(() => {
        const getSelectList = async () => {
            if(props.request != undefined && props.requestData != undefined){
            const SelectList =  await sendRequest(
                props.request,
                'POST',
                JSON.stringify(props.requestData),
                { 'Content-Type': 'application/json' }
            );
            setSelectList(SelectList);
            }
        }
        getSelectList();
    },[]);
    
    const SelectedItem = ["Pompier", "Architecte", "Joueur de soccer"];
    const { name, onInput } = props;
    const { value, isValid } = inputState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);

    const changeHandler = event => {
        SelectList.data.forEach(occupation => {
            if (event.target.value == occupation.name)
                event.target.occId = occupation._id;
        });
        if (event.target.occId != "")
            dispatch({val: event.target.occId, isValid:true});
        //For the moment, this only send the id if the occupation exist
        //If taxonomy schema expect and id, when the value is 12 char long, the cast to objectId succeed even tho it shouldn't. Beware
        else
            dispatch({val: "", isValid:true});
        event.target.occId = "";
    }

    if( SelectList &&
        !SelectList.error &&
        SelectList.data &&
        SelectList.data.length > 0)
    return (
        <>
            <label for='occupation'>{props.label}</label>
            <br/>
            <div>
                <Button slim="true">+</Button>
                <input occId="" type="text" list='occupationsDatalist' name='occupationInput'
                    id='occupationInput' placeholder=' "Enseignant", "Architecte logiciel", [...]'
                    className={`${styles["datalist-input"]}`} onChange={changeHandler}/>
                <datalist id='occupationsDatalist' name="occupationsDatalist" className={`${styles["datalist-input"]}`}>
                    {SelectList.data.map( occ => 
                        <option value={occ.name}></option>
                    )}
                </datalist>
            </div>
            <div className={`${styles['tagList']}`}>
                {SelectedItem.map(selected =>
                <>
                    <input type="submit" value="x" className={`${styles['input']}`}></input>
                    <label className={`${styles['label']}`}>{selected}</label>
                </>
                )}
            </div>
        </>
    );
}

export default Select;


