import React, {useEffect, useState, useRef, useContext} from 'react'

//Custom Hooks
import { useHttpClient } from '@/src/hooks/http-hook'
import { useValidation } from '@/src/hooks/useValidation/useValidation';
//import { useDebounce } from '@/src/hooks/useDebounce'
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";


//Contexts
import { useAuth } from "@/src/authentification/context/auth-context";


//Components
import useDebounce from '@/src/hooks/useDebounce'
import Select from 'react-select';

//Styling
import styles from './Select2Tag.module.scss'
import makeAnimated from 'react-select/animated';

/*
Props :
    - formTools : For formState update
    - name : formState update and mainly use for ids and keys
    - searchField : The name of the field to make the search on
    - label : When mentionned, add a label on top of the select field
    - fetch : the url to fetch from
    - requestData : the objet to send for the first request
    - placeholder : placeholder inside the select field
    - idField : field the id should go in ==> select tag set formState value to [ { idField : value, status: {statusObject} }.
    - If there is an initial value to formState, it should be an array, and elem.[idField]._id and elem[searchField] should exist
        */

const Select2Tag = ({name, formTools, ...props}) => {



    //Authentication ref
    const auth = useAuth();

    const {
        formState,
        inputHandler,
        //inputTouched
    } = formTools;

    const selectRef = useRef();
    //Set default selectValue
    useEffect(() => {
        if(formState.inputs[name] && formState.inputs[name].value.length > 0)
        {
            const state = formState.inputs[name].value.map((elem) => {
                return { value: elem[props.idField]._id, label: elem[props.idField][props.searchField]
            }})
            selectRef.current.setValue(state, "set-value");
        }
    }, [])

    const updateValue = (selectedValue) => {
        const selectedList = selectedValue.map( (item) => {
            return { [props.idField]: item.value, status: getDefaultCreateEntityStatus(auth.user)};
        });
        inputHandler(
            name,
            selectedList,
            props.validators ? validate(event.target.value, props.validators) : true
        )
    }

    const setValueWithComma = () => {
        selectRef.current.setValue([...selectRef.current.state.selectValue, selectRef.current.state.focusedOption], "set-value")
        
        //This V doesn't work but here should reset input value
        console.log(selectRef.current.inputRef.value)
        selectRef.current.inputRef.value = '';
        console.log(selectRef.current.inputRef.value)
    }

    //Extract validation methods
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )

    //Import message context 
    const {sendRequest} = useHttpClient();

    //List of options fetched by the api and proposed to the user in the datalist in grey
    const [selectResponse, setSelectResponse] = useState([]);
    const [optionList, setOptionList] = useState([]);

    //Research terms send to the api to refine the search
    //shape : data: {category: 'occupations', name: 'ingenieur'}
    const [requestData, setRequestData] = useState({...props.requestData});

    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(requestData, 400);

    //Update the list of options to display
    useEffect(() => { getSelectResponse() }, [debouncedRequest] );

    //Called whenever the user enter or modify a value into the field
    const formRequestData = (val) => {
        const newRequestData = {...requestData};
        newRequestData[props.searchField ?? 'name'] = val;
        setRequestData(newRequestData);
    }

    const getSelectResponse = async () => {
        if(props.fetch !== undefined && props.requestData !== undefined) {
            const serverResponse =  await sendRequest(
                (props.fetch),
                'POST',
                JSON.stringify(requestData)
            );
            setSelectResponse(serverResponse);
        }
    }

    useEffect( () => {
        let newOptionList = [];
        if (selectResponse?.data?.length > 0)
            newOptionList = selectResponse.data.map( (elem) => {
            return { value: elem._id, label: elem[props.searchField] }
        })
        setOptionList(newOptionList)
    },[selectResponse])

    //Function to add a taxonomy element to the selected list that will be submitted with the form
    const resetSelectComponent = () => {
        //selectTagRef.current.value = "";
        //selectTagRef.current.focus();           //Reset focus on field
        //formRequestData("")                     //Reset the input text stored in the state
    }

    const animatedComponents = makeAnimated();

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

                <div className="flex-grow-1 form-element--field-padding">
                
                    <Select
                        ref={selectRef}
                        instanceId={"SelectTag-"+props.name}
                        placeholder={props.placeholder}
                        options={optionList}
                        components={animatedComponents}
                        isMulti
                        onInputChange={(val) => {
                            val.slice(-1) == ',' ?
                            setValueWithComma()
                            :
                            formRequestData(val)
                        }}
                        onChange={(val) => updateValue(val)}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 5,
                            colors: {
                              ...theme.colors,
                              primary25: 'hotpink',
                              primary: 'black',
                            },
                          })}
                    />

                    <div className="w-100 d-flex">
                        <RequirementsBadges /> 
                    </div>
                </div>
            </div>
            <div className="validation-error-messages-container">
            </div>
        </div>
    );
}
export default Select2Tag;
