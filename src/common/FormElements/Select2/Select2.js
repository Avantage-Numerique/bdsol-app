import React, {useEffect, useState, useRef, useContext} from 'react'

//Custom Hooks
import { useHttpClient } from '@/src/hooks/http-hook'
import { useValidation } from '@/src/hooks/useValidation/useValidation';
//import { useDebounce } from '@/src/hooks/useDebounce'

//Contexts
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Components
import useDebounce from '@/src/hooks/useDebounce'

//Styling
import styles from './Select2.module.scss'
import Button from '@/FormElements/Button/Button';

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

    //Extract validation methods
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )

    //Import message context 
    const msg = useContext(MessageContext);
    const {sendRequest} = useHttpClient();

    //Store globally the matching value when evaluated
    const matchingValue = useRef();

    //List of options fetched by the api and proposed to the user in the datalist in grey
    const [selectList, setSelectList] = useState([]);

    //Research terms send to the api to refine the search
    //shape : data: {category: 'occupations', name: 'ingenieur'}
    const [selectRequest, setSelectRequest] = useState(props.requestData);

    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(selectRequest, 400);

    //Update the list of options to display
    useEffect(() => { getSelectList() }, [debouncedRequest] );


    //Find if there is a matching value between the list proposed by the api and the value entered in the field by the user
    const findMatchingValue = () => selectList.data.find(e => {return e[props.searchField] === selectTagRef.current.value});//[idField]

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        //Get the value inside the requestData in the "props.searchField" to send a new search request
        props.requestData.data[props.searchField !== undefined ? props.searchField : "name"] = val;
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
            matchingValue.current = findMatchingValue() || undefined;

            //If there is a matching value, then go forward
            if (matchingValue.current) {

                //Make sure that the object is not already in the list to prevent duplicates
                const isDuplicate = props.selectedEntities.some(item => {
                    return item._id === matchingValue.current._id;
                });

                if(!isDuplicate){
                    //Update the value of selectedEntities
                    if ( single === "true"){
                        //If single mode, replace the entire object
                        props.dataSetter([matchingValue.current]);
                    }
                    else {
                        //(not single mode) Add the value to the array
                        props.dataSetter([...props.selectedEntities, {
                            occupation:matchingValue.current,
                            status: matchingValue.current.status
                        }]);
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
        //props.dataSetter(props.selectedEntities.filter(elem => elem._id !== selectedObj._id));
    }

    //Function to add a taxonomy element to the selected list that will be submitted with the form
    const resetSelectComponent = () => {
        selectTagRef.current.value = "";
        selectTagRef.current.focus();           //Reset focus on field
        formRequestData("")                     //Reset the input text stored in the state
    }

    //Handle ENTER to simulate a button press (add value)
    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            addValueToSelectedItem();
        }
    };

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
            <div className={`
                form-element 
                form-element--color-validation 
                d-flex
            `}>

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
                        onKeyPress={ (e) =>handleKeypress(e)}
                    />

                    <div className="w-100 d-flex">
                        <RequirementsBadges /> 
                    </div>
                    
                    <datalist id={props.label + props.searchField} name={"Datalist-"+ name } className={`${styles["datalist-input"]}`}>
                        {selectList.data.map( item => {
                                return (
                                    <option key={`datalist-${item[props.searchField]}`} value={item[props.searchField]}></option>
                                )
                            }
                        )}
                    </datalist>
                </div>
            </div>
            <div className="validation-error-messages-container">
            </div>
        </div>
    );
}
export default Select2;
