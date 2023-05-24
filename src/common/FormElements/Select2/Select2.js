//React
import { useState, useEffect } from "react";

//Helper
import ApiEntityModel from "@/src/DataTypes/Entity/models/ApiEntityModel";

//Component
import Select2BaseSingle from "./Select2BaseSingle";
import Select2BaseMulti from "./Select2BaseMulti";
import Tip from '@/common/FormElements/Tip/Tip';

//Hook
import { useHttpClient } from "@/src/hooks/http-hook";
import useDebounce from '@/src/hooks/useDebounce'


/**
 * @param {string} name : used for id and formState
 * @param {formTools} formTools : FormTools
 * @param {string} label : Title of the field displayed over it
 * @param {boolean} creatable : true if allowed to create, false or undefined means not allowed to create new option
 * @param {boolean} isMulti : true if multiple selection allowed, false if single option selectable
 * @param {Array} optionsList : (optionnal) Can specify directly a list of option in format [ { label, value, color? }, ... ]
 * @param {string} fetch : Url to fetch data from and create options
 * @param {object} requestData : param to always pass during request (e.g. category : "skills" to only access skills taxonomy)
 * @param {string} searchField : for the moment => a string added to requestData that's dynamically searching with the select
 * @param {string} selectField : for the moment => string that represent the transmuted field to show in the options ("occupations", "fullname" ...)
 * 
 */
const Select2 = ({ name, formTools, ...props }) => {
    const {sendRequest} = useHttpClient();
    const [optionsList, setOptionList] = useState(props.optionsList ?? []);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null);
    
    //Formstate
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    useEffect( () => {
        inputHandler(
            name,
            value,
            props.validationRules ? validate(event.target.value) : true
        )
    }, [value])

    useEffect( () => {
        const valueList = ApiEntityModel.getSelectOption(formState.inputs[name].value, props.selectField);
        //if formState contains no value
        if(valueList === null || valueList?.length == 0){
            setValue(null);
        }
        else {
            //isMulti
            if (props.isMulti){
                setValue(valueList)
            }
            //is not multi (single)
            else {
                setValue(valueList[0])
            }
        }
    }, [])

    //Fetch
    const fetchOptions = async () => {
        if(props.optionsList == undefined && props.fetch !== undefined){
            const requestData = props.requestData ?? {};
            const apiResponse = await sendRequest(
                (props.fetch),
                'POST',
                JSON.stringify({
                    data: {
                        ...requestData,
                        [props.searchField]: inputValue
                    }
                }),
                { 'Content-Type': 'application/json' }
            )
            const optionList = ApiEntityModel.getSelectOption(apiResponse.data, props.selectField);
            setOptionList(optionList);
        }
    }
    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(inputValue, 400);
    //Update the list of options to display
    useEffect(() => { fetchOptions() }, [debouncedRequest] );

    const label = props.label ? 
        (
            <div className="d-flex justify-content-between">
                <label htmlFor={name} >{props.label}</label>
                {props.tooltip && <Tip header={props.tooltip?.header} body={props.tooltip?.body}/>}
            </div>
        ) :
        (<></>);

    const select = props.isMulti ? 
        (<Select2BaseMulti
            name={name}
            creatable={props.creatable}
            
            options={optionsList}
            inputValue={inputValue}
            inputValueSetter={setInputValue}
            value={value}
            valueSetter={setValue}
        />):
        (<Select2BaseSingle
            name={name}
            creatable={props.creatable}
            
            options={optionsList}
            inputValue={inputValue}
            inputValueSetter={setInputValue}
            value={value}
            valueSetter={setValue}
        />);

    return (<>{label} {select}</>);

    
}

export default Select2;