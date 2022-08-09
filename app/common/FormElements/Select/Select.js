import React, {useEffect, useState, useReducer, useRef} from 'react'
import {useHttpClient} from '../../../../app/hooks/http-hook'
import Button from '../Buttons/Button/Button'
//Styling
import styles from './Select.module.scss'

const Select = (props) => {

    const selectTagRef = useRef(null);

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    const inputReducer = (state, action) => {
        return {
            ...state,
            value: action.val,
            isValid: true
        };
    }

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: [], 
        isValid: true
    });

    const [selectList, setSelectList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const getSelectList = async () => {
            if(props.request != undefined && props.requestData != undefined) {
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
    
    const { name, onInput } = props;
    const { value, isValid } = inputState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);

    const addValueToSelectedItem = () => {
        selectList.data.forEach(item => {
            if (selectTagRef.current.value == item.name && !selectedItems.includes(item)) {
                const tempSelect = selectedItems;
                tempSelect.push(item);
                setSelectedItems(tempSelect);
                selectTagRef.current.value = "";
                selectTagRef.current.focus(); //Reset focus on field
            }
        });
        dispatch({val: selectedItems, isValid:true});
        //For the moment, this only send the id if the occupation exist
        //If taxonomy schema expect and id, when the value is 12 char long, the cast to objectId succeed even tho it shouldn't. Beware
    }

    const removeValueFromSelectedItem = (select) => {
        console.log(select);
        let tempTag=[];
        selectedItems.forEach(item => {
            if(item.name != select.name)
                tempTag.push(item);
        })
        //console.log(selectedItems);
        //console.log(tempTag);
        setSelectedItems(tempTag);
        //Vincent! J'aimerais que le state se mette à jour avec le "setSelectedItems" au lieu de devoir faire dispatch
        //Si je ne fais pas dispatch il s'update seulement si j'add qqch
        //Et pk si je met val: selectedItems sa fonctionne pas, je dois obligatoirement mettre tempTag
        dispatch({val: tempTag, isValid:true});
    }

    if( selectList &&
        !selectList.error &&
        selectList.data &&
        selectList.data.length > 0)
    return (
        <>
            <label for='SelectInput'>{props.label}</label>
            <br/>
            <div>
                <Button type="button" slim="true" onClick={addValueToSelectedItem}>+</Button>
                <input type="text" list='SelectDatalist' name='SelectInput'
                    id='SelectInput' placeholder=' "Enseignant", "Architecte logiciel", [...]'
                    className={`${styles["selectInput"]}`} ref={selectTagRef}/>
                <datalist id='SelectDatalist' name="SelectDatalist" className={`${styles["datalist-input"]}`}>
                    {selectList.data.map( item => 
                        <option value={item.name}></option>
                    )}
                </datalist>
            </div>
            <div className={`${styles['tagList']}`}>
                {selectedItems.map(selected =>
                <>
                    <input className={`${styles['tagInput']}`} type="button" onClick={() => removeValueFromSelectedItem(selected)} value="x"></input>
                    <tag className={`${styles[props.tag] ? styles[props.tag] : styles['tag']}`}>{selected.name}</tag>
                </>
                )}
            </div>
        </>
    );
}

export default Select;


