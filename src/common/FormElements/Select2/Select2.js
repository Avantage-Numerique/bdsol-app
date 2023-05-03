//React
import { useState, useEffect } from "react";

//Component
import Select2BaseSingle from "./Select2BaseSingle";
import Select2BaseMulti from "./Select2BaseMulti";


/**
 * @param name : used for id and formState
 * @param formTools : FormTools
 * @param creatable : true if allowed to create, false or undefined means not allowed to create new option
 * @param isMulti : true if multiple selection allowed, false if single option selectable
 * @param optionsList : (optionnal) Can specify directly a list of option in format [ { label, value, color? }, ... ]
 */
const Select2 = ({...props}) => {

    const [optionsList, setOptionList] = useState(props.optionsList ?? []);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState(null);

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

export default Select2