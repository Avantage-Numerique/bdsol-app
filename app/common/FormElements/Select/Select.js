import React, {useEffect, useState, useReducer, useRef, useContext} from 'react'

//Custom Hooks
import {useHttpClient} from '../../../../app/hooks/http-hook'
//import { useDebounce } from '../.././../hooks/useDebounce'

//Contexts
import { MessageContext } from '../../UserNotifications/Message/Context/Message-Context'

//Components
import useDebounce from '../.././../hooks/useDebounce'
import Button from '../Buttons/Button/Button'

//Styling
import styles from './Select.module.scss'

const Select = (props) => {

    const selectTagRef = useRef();

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    //Very basic reducer that doesn't receive any type of action
    const inputReducer = (state, action) => {
        return {
            ...state,
            value: action.val,
            isValid: true        //For now, always good but eventually, we could need some validation...
        };
    }

    const [userSelectionState, dispatch] = useReducer(inputReducer, {
        value: [],
        isValid: true
    });

    //*********************
    //Whenever the value entered (user selection in this case), the data is sent to the form state
    const { name, onInput } = props;
    const { value, isValid } = userSelectionState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);
    //*********************

    /**************************
        Other select states
    ***************************/

    //List of options fetched by the api and proposed to the user in the data list in grey
    const [selectList, setSelectList] = useState([]);
    
    //Value sent to the api to receive 10 options corresponding
    //shape : data: {category: 'occupations', name: 'ingenieur'}
    const [selectRequest, setSelectRequest] = useState(props.requestData)



    //const debouncedRequestData = useDebounce(selectName, 1500);
    const debouncedRequest = useDebounce(selectRequest, 400);

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        //This line might be problematic if we list something that has no "name". As it's hardcoded.
        props.requestData.data.name = val;
        setSelectRequest({...props.requestData});
    }

    const getSelectList = async () => {
        if(props.request != undefined && props.requestData != undefined) {
            const SelectList =  await sendRequest(
                props.request,
                'POST',
                JSON.stringify(selectRequest),
                { 'Content-Type': 'application/json' }
            );

            //This function remove an option in the list when it is well written in the field. 
            //Its conflictual right now with the submission but we'll have to correct it eventually
/*
            SelectList.data = SelectList.data.filter((elem) => { 
                return elem.name !== selectRequest.data.name; 
            });
*/
            setSelectList(SelectList);
        }
    }

    //Update the list of options to display
    useEffect(() => {
        getSelectList();
    },[debouncedRequest]);
    

    //Add the value to the displayed list 
    const addValueToSelectedItem = () => {

        //Make sure there is a value entered in the field
        if(selectTagRef.current.value){

            //Find if there is a matching value between the proposed options and the entered value
            const matchingValue = selectList.data.find(e => {return e.name === selectTagRef.current.value})

            //If the is a matching value, then go forward
            if (matchingValue) {

                //Make sure that the object is not already in the list to prevent duplicates
                const isDuplicate = userSelectionState.value.some(item => {

                    if (item._id == matchingValue._id) {
                      return true;
                    }
                    return false;

                  });
            
                if(!isDuplicate){
                    dispatch({val: [...userSelectionState.value, matchingValue]});
                    selectTagRef.current.value = "";
                    selectTagRef.current.focus();           //Reset focus on field
                    formRequestData("")                     //Reset the input text stored in the state

                } else {

                    //If the value is a duplicate
                    msg.addMessage({ 
                        text: "La valeur que vous essayez d'ajouter est déjà dans la liste de vos choix.",
                        positive: false 
                    })

                }

            }


        }
        
        //For the moment, this only send the id if the occupation exist
        //If taxonomy schema expect and id, when the value is 12 char long, the cast to objectId succeed even tho it shouldn't. Beware
    }

    const removeValueFromSelectedItem = (select) => {

        let tempTag=[];

        userSelectionState.value.forEach(item => {
            if(item.name != select.name)
                tempTag.push(item);
        })


        //Vincent! J'aimerais que le state se mette à jour avec le "setSelectedItems" au lieu de devoir faire dispatch
        //Si je ne fais pas dispatch il s'update seulement si j'add qqch
        //Et pk si je met val: selectedItems sa fonctionne pas, je dois obligatoirement mettre tempTag

        /*
                Réponse : 
                Normalement tout est réglé. Il y avait deux states qui faisaient la même chose et ça compliquait le flow
                Pour le val, ça doit probablement être en raison du fait qu'il faut que l'objet ait changé pour appeler un rerender.
                Il regarde donc probablement l'adresse de l'object et décide qu'il s'agit du même. 
        */
        dispatch({val: tempTag});
    }

    if( selectList &&
        selectList.data)
    return (
        <>
            <label htmlFor='SelectInput'>{props.label}</label>
            <br/>
            <div>

                <Button type="button" slim="true" disabled={selectRequest.data.name ? false : true} onClick={addValueToSelectedItem}>+</Button>
                <input type="text" list='SelectDatalist' name='SelectInput'
                    id='SelectInput' placeholder=' "Enseignant", "Architecte logiciel", [...]'
                    className={`${styles["selectInput"]}`} ref={selectTagRef} onChange={(e) => {formRequestData(e.target.value)}}/>
                <datalist id='SelectDatalist' name="SelectDatalist" className={`${styles["datalist-input"]}`}>
                    {selectList.data.map( item => 
                        <option key={`datalist-${item.name}`} value={item.name}></option>
                    )}
                </datalist>

            </div>

            {/*

                Display the selected items
            
            */}
            <ul className={`${styles['tagList']}`}>

                {userSelectionState.value.map(selected =>
                <li 
                    key={`select-tag-${selected.name}`}
                    className={`${styles['tag']} ${props.tag ? styles[props.tag] : styles[props.generaltag]}`} 
                >
                    <button className={`${styles['closeButton']}`} type="button" onClick={() => removeValueFromSelectedItem(selected)}>&#x271A;</button>
                    <span className={`${styles['status']} ${selected.status == "Accepted" ? styles['accepted'] : (selected.status == "Pending" ? styles['pending'] : styles['rejected'])}`}>■</span>
                    <span>{selected.name}</span>
                </li>
                )}

            </ul>

        </>
    );
}

export default Select;


