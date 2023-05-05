//React
import { useState, useEffect } from "react";

//Component
import Select2BaseSingle from "./Select2BaseSingle";
import Select2BaseMulti from "./Select2BaseMulti";

//Hook
import { useHttpClient } from "@/src/hooks/http-hook";
import useDebounce from '@/src/hooks/useDebounce'


/**
 * @param {string} name : used for id and formState
 * @param {formTools} formTools : FormTools
 * @param {boolean} creatable : true if allowed to create, false or undefined means not allowed to create new option
 * @param {boolean} isMulti : true if multiple selection allowed, false if single option selectable
 * @param {Array} optionsList : (optionnal) Can specify directly a list of option in format [ { label, value, color? }, ... ]
 * @param {string} fetch : Url to fetch data from and create options
 * @param {object} requestData : param to always pass during request (e.g. category : "skills" to only access skills taxonomy)
 * @param {string} searchField : for the moment => a string added to requestData that's dynamically searching with the select
 * 
 */
const Select2 = ({...props}) => {
    const {sendRequest} = useHttpClient();
    const [optionsList, setOptionList] = useState(props.optionsList ?? []);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null);


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
            console.log(apiResponse);
            const optionList = apiResponse.data.map( (elem) => {
                return { value : elem._id, label: elem.firstName +' '+ elem.lastName}
            })
            setOptionList(optionList);
        }
    }
    //Allow only one request per 400ms, after the user stop typing
    const debouncedRequest = useDebounce(inputValue, 400);
    //Update the list of options to display
    useEffect(() => { fetchOptions() }, [debouncedRequest] );


    //Formstate
    useEffect( () => {
        
        setValue(null)
    }, [])

    useEffect( () => { console.log(value) }, [value])

    //If props.isMulti return Select Multi
    if (props.isMulti){
        return (
            
            <Select2BaseMulti
                name={props.name}
                creatable={props.creatable}
                
                options={optionsList}
                inputValue={inputValue}
                inputValueSetter={setInputValue}
                value={value}
                valueSetter={setValue}

            />
                
                )
            }
    //else return Select Single
    else {
        return (
            
            <Select2BaseSingle
                name={props.name}
                creatable={props.creatable}
                
                options={optionsList}
                inputValue={inputValue}
                inputValueSetter={setInputValue}
                value={value}
                valueSetter={setValue}
                
            />

        )
    }
}

export default Select2;