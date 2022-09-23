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

const Select = ({name, formTools, ...props}) => {

    const selectTagRef = useRef();

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {sendRequest} = useHttpClient();

    /*
        Access the differents form tools 
    */
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    //Make sure that the initial value is if type array. Otherwise, it create
    const currentState = formState.inputs[name];

    const updateValue = value => {
        inputHandler(
            name,
            value,
            props.validators ? validate(value, props.validators) : true
        )
    }

    /***********************
     * 
     * Function to be called later
     *
     ************************/

    //Find if there is a matching value between the list proposed by the api and the value entered in the field by the user
    const findMatchingValue = () => selectList.data.find(e => {return e.name === selectTagRef.current.value})

    

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

    //Function to add a taxonomy element to the selected list that will be submitted with the form
    const pushSelectedValue = newTaxonomyItem => {
        updateValue([...currentState.value, newTaxonomyItem])              //Update the form state
        selectTagRef.current.value = "";
        selectTagRef.current.focus();           //Reset focus on field
        formRequestData("")                     //Reset the input text stored in the state
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

            //Get the matching value
            const matchingValue = findMatchingValue()

            //If there is a matching value, then go forward
            if (matchingValue) {

                //Make sure that the object is not already in the list to prevent duplicates
                const isDuplicate = [...currentState.value].some(item => {

                    if (item._id == matchingValue._id) {
                      return true;
                    }
                    return false;

                  });
            
                if(!isDuplicate){

                    //Add the new validated value to the form state to be submitted
                    pushSelectedValue(matchingValue);

                } else {

                    //If the value is a duplicate
                    msg.addMessage({ 
                        text: "La valeur que vous essayez d'ajouter est déjà dans la liste de vos choix.",
                        positive: false 
                    })

                }
            }
            //No matching Value displays message it's not a taxonomy
            else {
                msg.addMessage({
                    text: "La valeur sélectionnée n'existe pas. Veuillez sélectionner dans la liste ou créer la taxonomie"
                })
            }


        }
        
        //For the moment, this only send the id if the occupation exist
        //If taxonomy schema expect and id, when the value is 12 char long, the cast to objectId succeed even tho it shouldn't. Beware
    }

    const removeValueFromSelectedItem = (select) => {

        let tempTag=[];

        currentState.value.forEach(item => {
            if(item.name != select.name)
                tempTag.push(item);
        })

        updateValue(tempTag);
    }

    if( selectList &&
        selectList.data)
    return (
        <>
            <label className={`${styles["select-component"]}`}  htmlFor='SelectInput'>
                
                { props.label && props.label}

                <div>

                    <Button type="button" slim="true" disabled={selectRequest.data.name ? false : true} onClick={addValueToSelectedItem}>+</Button>
                    
                    <input 
                        type="text" 
                        list='SelectDatalist' 
                        name='SelectInput'
                        id='SelectInput' 
                        onBlur={() => inputTouched(name)}
                        placeholder={props.placeholder}
                        className={`${styles["select-input"]}`} 
                        ref={selectTagRef} 
                        onChange={(e) => {formRequestData(e.target.value)}}
                    />
                    
                    <datalist id='SelectDatalist' name="SelectDatalist" className={`${styles["datalist-input"]}`}>
                        {selectList.data.map( item => 
                            <option key={`datalist-${item.name}`} value={item.name}></option>
                        )}
                    </datalist>

                </div>
                
                {/* Button to call a form and add a new taxonomie */}
                {/* If the updateModal function is defined, it meens that the modal functionnalities have to be activated */}
                { props.updateModal &&
                    <div className={`col-12 ${styles["button-container"]}`}>
                        <button
                            type="button"
                            disabled={ ((selectTagRef.current && selectTagRef.current.value) && !findMatchingValue() && props.updateModal) ? false : true}
                            onClick={() => props.updateModal(prev => ({
                                ...prev, 
                                display: true,
                                enteredValues: {
                                    ...prev.enteredValues,
                                    name: selectTagRef.current.value
                                },
                                callback: pushSelectedValue
                            }))}
                        >
                            <small>Soumettre comme nouvelle taxonomie</small>
                        </button>
                    </div>
                }


            </label>
            {/*

                Display the selected items
            
            */}
            <ul className={`${styles['tagList']}`}>

                {currentState.value && currentState.value.map(selected =>
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
