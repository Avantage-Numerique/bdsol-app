import React, {useEffect, useState, useRef, useContext} from 'react'

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

/*
Props :
    - name : Mainly use for ids and keys
    - searchField : The name of the field to make the search on
    - label : When mentionned, add a label on top of the select field
    - request : the url to fetch from
    - requestData : the objet to send for the first request
    - placeholder : placeholder inside the select field
    - dataSetter : Setter to modify the state (add the selected entity to the list)
    - selectedEntities : An array of already selected entity to register before adding others (if modified after first display, it will still update)
    - single : if single = "true", select will allow only [ {1 entity} ] and if another is selected, replace it
*/
const Select2 = ({name, formTools, children, single, ...props}) => {

    const selectTagRef = useRef();

    //Import context 
    const msg = useContext(MessageContext);
    const {sendRequest} = useHttpClient();

    //Store globally the matching value when evaluated
    const matchingValue = useRef();

    //List of options fetched by the api and proposed to the user in the datalist in grey
    const [selectList, setSelectList] = useState([]);


    //Full list of property about the selected Entity
    const [selectedEntities, setSelectedEntities] = useState(props.selectedEntities || []);
    useEffect( () => {props.dataSetter(selectedEntities)}, [selectedEntities]);
    //If props.selectedEntities change, it sets the selectedEntities
    useEffect( () => {setSelectedEntities(props.selectedEntities)}, [props.selectedEntities])
    

    //Research terms send to the api to refine the search
    //shape : data: {category: 'occupations', name: 'ingenieur'}
    const [selectRequest, setSelectRequest] = useState(props.requestData)

    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(selectRequest, 400);
    //Update the list of options to display
    useEffect(() => { getSelectList() }, [debouncedRequest] );


    //Find if there is a matching value between the list proposed by the api and the value entered in the field by the user
    const findMatchingValue = () => selectList.data.find(e => {return e[props.searchField] === selectTagRef.current.value})

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        //Get the value inside the requestData in the "props.searchField" to send a new search request
        props.requestData.data[props.searchField != undefined ? props.searchField : "name"] = val;
        setSelectRequest({...props.requestData});
    }

    const getSelectList = async () => {
        if(props.request !== undefined && props.requestData !== undefined) {
            const SelectList =  await sendRequest(
                (props.request + "/list"),
                'POST',
                JSON.stringify(selectRequest)
            );
            setSelectList(SelectList);
        }
    }
    
    //Add the value to the displayed list 
    const addValueToSelectedItem = () => {

        //Make sure there is a value entered in the field
        if(selectTagRef.current.value){
            //Get the NEW matching value or set it to undefined
            matchingValue.current = findMatchingValue() || undefined

            //If there is a matching value, then go forward
            if (matchingValue.current) {

                //Make sure that the object is not already in the list to prevent duplicates
                const isDuplicate = selectedEntities.some(item => {
                    return item._id === matchingValue.current._id;
                });

                if(!isDuplicate){
                    //Update the value of selectedEntities
                    if ( single == "true"){
                        //If single mode, replace the entire object
                        setSelectedEntities([matchingValue.current]);
                    }
                    else {
                        //(not single mode) Add the value to the array
                        setSelectedEntities([...selectedEntities, matchingValue.current])
                    }

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
    }

    const removeValueFromSelectedItem = (selectedObj) => {
        //remove the selectedObj
        setSelectedEntities(selectedEntities.filter(elem => elem._id !== selectedObj._id));
    }

    //Function to add a taxonomy element to the selected list that will be submitted with the form
    const resetSelectComponent = () => {
        selectTagRef.current.value = "";
        selectTagRef.current.focus();           //Reset focus on field
        formRequestData("")                     //Reset the input text stored in the state
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
                            {/* Change arrow symbol : https://unicode-table.com/en/sets/arrow-symbols/ */}
                            { single == "true" ? "⇅" : "+"}
                    </Button>

                    <div className="flex-grow-1 form-element--field-padding">
                    
                        <input
                            type="text" 
                            list={props.label + props.searchField}
                            name={'SelectInput-' + name }
                            id={'SelectInput-'+ name}
                            //onBlur={() => inputTouched(name)}
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
                {/* props.updateModal &&
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
                    </div>*/
                }
        </div>
    );
}
export default Select2;
