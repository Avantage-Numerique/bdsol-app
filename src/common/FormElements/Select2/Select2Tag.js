import React, {useEffect, useState, useRef, useContext} from 'react'

//Custom Hooks
import { useHttpClient } from '@/src/hooks/http-hook'
import { useValidation } from '@/src/hooks/useValidation/useValidation';
import { useModal } from '@/src/hooks/useModal/useModal';
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import useDebounce from '@/src/hooks/useDebounce'


//Contexts
import { useAuth } from "@/src/authentification/context/auth-context";


//Components
import CreatableSelect from 'react-select';
import Button from '../Button/Button';
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm';

//Styling
import styles from './Select2Tag.module.scss'
import makeAnimated from 'react-select/animated';
import {lang} from "@/common/Data/GlobalConstants";

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

    //Create taxonomy modal
    const {displayModal, modal, closeModal, Modal} = useModal();

    const {
        formState,
        inputHandler,
        //inputTouched
    } = formTools;

    const selectRef = useRef();
    const [inputValue, setInputValue] = useState("");
    //Set default selectValue
    useEffect(() => {

        if(formState.inputs[name]?.value?.length > 0)
        {
            const state = formState.inputs[name].value.map((elem) => {
                return { value: elem[props.idField]._id, label: elem[props.idField][props.searchField]
            }})
            selectRef.current.setValue(state, "set-value");
        }
    }, [])

    const updateValue = (selectedValue) => {
        if(selectResponse?.data?.length > 0){
            //Set an array full of "populated alike" item ( [occupation : {full object}, ...] )
            const selectedList = selectedValue.map( (item) => {
                return { [props.idField]: selectResponse?.data.find( (elem) => { return elem._id === item.value }) };
            });
            inputHandler(
                name,
                selectedList,
                props.validators ? validate(event.target.value, props.validators) : true
            )
        }
    }

    const setValueWithComma = () => {
        selectRef.current.setValue([...selectRef.current.state.selectValue, selectRef.current.state.focusedOption], "set-value")
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
        setInputValue(val);
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
            console.log(requestData);
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

    const resetSelectComponent = () => {
        //setInputValue("");
        //updateValue([]);
        selectRef.current.setValue([], "set-value");
        //formRequestData("");
    }

    const handleCreateOption = (val) => {
        //Open modal
        modal.enteredValues.name = val;
        displayModal();
    }

    const addFromCreatedModal = (val) => {
        //Format val to {value:id, label:name}
        selectRef.current.setValue([...selectRef.current.state.selectValue, val], "set-value");
        //updateValue()
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
                
                    <CreatableSelect
                        ref={selectRef}
                        instanceId={"SelectTag-"+props.name}
                        placeholder={props.placeholder}
                        options={optionList}
                        components={animatedComponents}
                        isMulti
                        inputValue={inputValue}
                        onInputChange={(val) => {
                            val.slice(-1) === ',' ?
                            setValueWithComma()
                            :
                            formRequestData(val)
                        }}
                        onChange={(val) => updateValue(val)}
                        onCreateOption={(val) => handleCreateOption(val)}
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
                    {modal.display &&
                    <Modal
                        closingFunction={closeModal}
                        >
                            <header className={`d-flex`}>
                                <p>{lang.taxonomyCreateWhenDoNotExistDirective}</p>
                            </header>               
                      
                        {/* Separation line */}
                        <div className={`my-4 border-bottom`}></div>

                        <CreateTaxonomyForm
                            name={modal.enteredValues.name ?? ''}   //Prefilled value
                            category={props.slug}
                            positiveRequestActions={{
                                //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                                callbackFunction: requestResponse => {
                                    //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                    //modal.callback(requestResponse.data)
                                    if(requestResponse.data[props.searchField] && requestResponse.data._id)
                                        addFromCreatedModal({value:requestResponse.data._id, label: requestResponse.data[props.searchField]})
                                    //Close the modal
                                    closeModal()
                                }
                            }}
                        />

                    </Modal>
                    }

            <div className="validation-error-messages-container">
            </div>
        </div>
    );
}
export default Select2Tag;


export const getSelectedToFormData = (selected, idField, user ) => {
    
    return selected.map( (elem) => {
        return {
            [idField] : elem[idField]._id,
            status: {
                state: "pending",
                lastModifiedBy: user.id,
                requestedBy: user.id
            }
        }
    })
}