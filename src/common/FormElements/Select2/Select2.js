import React, {useEffect, useState, useRef, useContext, useCallback} from 'react'

//Custom Hooks
import {useHttpClient} from '@/src/hooks/http-hook'
//import { useDebounce } from '@/src/hooks/useDebounce'

//Contexts
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Components
import useDebounce from '@/src/hooks/useDebounce'

//Styling
import styles from './Select2.module.scss'
import Button from 'react-bootstrap/Button'

import { useAuth } from '@/src/authentification/context/auth-context'

/*
    Temporary hardcoded value to prevent making switch cases
*/
const dictionnary = {
    offers: "offer",
    occupations: "occupation",
    team: "member"
}


const Select2 = ({name, formTools, ...props}) => {

    const selectTagRef = useRef();

    //Import message context 
    const msg = useContext(MessageContext);

    //Import Auth context
    const auth = useAuth();

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
    const currentState = formState.inputs[name].value;

    const updateValue = value => {
        inputHandler(
            name,
            value,
            props.validators ? validate(value, props.validators) : true
        )
    }


    /***********************
     * 
     *      Matching value 
     * 
     *      => Confirmed match between the field entered value and one entity in the database
     * 
     ************************/

    //Find if there is a matching value between the list proposed by the api and the value entered in the field by the user
    const findMatchingValue = () => selectList.data.find(e => {return e[props.searchField] === selectTagRef.current.value})

    //Store globally the matching value when evaluated
    const matchingValue = useRef();

    /**************************
        Other select states
    ***************************/

    //List of options fetched by the api and proposed to the user in the data list in grey
    const [selectList, setSelectList] = useState([]);

    //Full list of property about selected Entity to be displayed
    const [selectedEntities, setSelectedEntities] = useState([]); 
    
    //Value sent to the api to receive 10 options corresponding
    //shape : data: {category: 'occupations', name: 'ingenieur'}
    const [selectRequest, setSelectRequest] = useState(props.requestData)

    const debouncedRequest = useDebounce(selectRequest, 400);

    const matchLocalToFormState = async () => {

        //New edited selectedEntities state 
        let editedSelectedEntities = [];

        //OPTION 1 : Evaluate if one or many ids present in the selectedEntities are not in the current State
        //  => Action: we need to extract only the ones that match the formState
        editedSelectedEntities = selectedEntities.filter(o1 => currentState.some(o2 => o1._id === o2[dictionnary[name]]));

        //OPTION 2 : One or many ids in the current state doesn't appear in the selectedEntites
        //  => Action: we need to add them
        //Get a new array containing every elements present in the formstate that are not reflected in the selected entities
        const absentFormStateObjs = currentState.filter(o1 => !selectedEntities.some(o2 => o1[dictionnary[name]] === o2._id));

        if(absentFormStateObjs.length > 0)

            //update the state with the new values
            for(const entity of absentFormStateObjs){
                //If the object data stored in the matching value 
                if(matchingValue.current && (entity[dictionnary[name]] === matchingValue.current._id)){
                    //Use this one to store in the selectedEntities
                    editedSelectedEntities.push(matchingValue.current)

                //If the object data is not in the matchingValue, we have to fetch it
                } else {
                    //Fetch by the Id
                    const entityData =  await sendRequest(
                        (props.request + "/search"),
                        'POST',
                        JSON.stringify({data:{id: entity[dictionnary[name]]}})
                    );
                    //If there is an error, passed the message to the user
                    if(entityData.error){
                        msg.addMessage({ 
                            text: `Suite à une erreur, une ou plusieurs informations n'ont pas pu être importées et affichées dans le champ "${props.label}"`,
                            positive: false 
                        })
                    } else {
                        //No mistake
                        //Add the newly fetch entity to the selectedEntities so it can be displayed
                        editedSelectedEntities.push(entityData.data)
                    }     
                }
            }
        //Finaly, we can update the local state with the new value
        setSelectedEntities(editedSelectedEntities)
    }

    //Update the selectedEntities whenever the form state change.
    //This way, the "selectedEntities" state is bind to the main form state and will always reflect it
    useEffect(() => {

        //call the function
        matchLocalToFormState()

    }, [currentState])

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        //Get the value inside the requestData in the "props.searchField" to send a new search request
        props.requestData.data[props.searchField != undefined ? props.searchField : "name"] = val;
        setSelectRequest({...props.requestData});
    }

    //Function to add a taxonomy element to the selected list that will be submitted with the form
    const resetSelectComponent = () => {
        selectTagRef.current.value = "";
        selectTagRef.current.focus();           //Reset focus on field
        formRequestData("")                     //Reset the input text stored in the state
    }

    const getSelectList = async () => {
        if(props.request !== undefined && props.requestData !== undefined) {
            const SelectList =  await sendRequest(
                (props.request + "/list"),
                'POST',
                JSON.stringify(selectRequest)
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

            //Get the NEW matching value or set it to undefined
            matchingValue.current = findMatchingValue() || undefined

            //If there is a matching value, then go forward
            if (matchingValue.current) {

                //Make sure that the object is not already in the list to prevent duplicates
                const isDuplicate = [...currentState].some(item => {
                    return item[dictionnary[name]] === matchingValue.current._id;
                  });
            
                if(!isDuplicate){

                    const formatedObject = {
                        [dictionnary[name]]: matchingValue.current._id,
                        status: {
                            state:"Pending",
                            requestedBy: auth.user.id,
                            lastModifiedBy: auth.user.id
                        }
                    };

                    //Update the value in the form state with the new value
                    updateValue([...currentState, formatedObject])
                    //Reset the field 
                    resetSelectComponent();

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

    const removeValueFromSelectedItem = (selectedObj) => {
        //Update the value of the form, excluding the element to remove
        updateValue(currentState.filter(arr => arr[dictionnary[name]] !== selectedObj._id));
    }

    if( selectList &&
        selectList.data)
    return (
        <div className={`${styles["select"]}`}> 

            {/************ field label ************/}
            { props.label && 
            <div className={`${styles["select__label-row"]}`}>
                <label htmlFor='SelectInput'>{ props.label }</label>
            </div>
            }
                <div className="form-element form-element--color-validation d-flex">

                    <Button 
                        type="button" 
                        slim="true" 
                        disabled={selectRequest.data[props.searchField] ? false : true} 
                        onClick={addValueToSelectedItem}
                        className="m-1 rounded-1">
                            +
                    </Button>

                    <div className="flex-grow-1 form-element--field-padding">
                    
                        <input
                            type="text" 
                            list={props.label + props.searchField}
                            name={'SelectInput-' + name }
                            id={'SelectInput-'+ name}
                            onBlur={() => inputTouched(name)}
                            placeholder={props.placeholder}
                            className={`
                                w-100 
                                p-0
                                border-0  
                            `}
                            ref={selectTagRef}
                            onChange={(e) => {formRequestData(e.target.value)}}
                        />

                        <div className="w-100 d-flex">
                            {/* To fill with validation rules*/}
                        </div>
                        
                        <datalist id={props.label + props.searchField} name={"Datalist-"+ name } className={`${styles["datalist-input"]}`}>
                            {selectList.data.map( item => 
                                <option key={`datalist-${item[props.searchField]}`} value={item[props.searchField]}></option>
                            )}
                        </datalist>

                    </div>

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
                                callback: resetSelectComponent
                            }))}
                        >
                            <small>Soumettre comme nouvelle taxonomie</small>
                        </button>
                    </div>
                }


            {/*

                Display the selected items
            
            */}
            <ul className={`${styles['tagList']}`}>

                {selectedEntities && selectedEntities.map(selected =>
                <li 
                    key={`select-tag-${selected[props.searchField]}`}
                    className={`${styles['tag']} ${props.tag ? styles[props.tag] : styles[props.generaltag]}`} 
                >
                    <button className={`${styles['closeButton']}`} type="button" onClick={() => removeValueFromSelectedItem(selected)}>&#x271A;</button>
                    <span className={`${styles['status']}`}>■</span>
                    <span>{selected[props.searchField]}</span>
                </li>
                )}

            </ul>

        </div>
    );
}
// ${selected.status.state === "Accepted" ? styles['accepted'] : (selected.status.state === "Pending" ? styles['pending'] : styles['rejected'])}`
export default Select2;
