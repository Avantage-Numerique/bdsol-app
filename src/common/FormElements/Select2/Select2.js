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
 * @param fetch : url to fetch options from api
 * @param requestData : ?
 */
const Select2 = ({...props}) => {

    const [optionsList, setOptionList] = useState(props.optionsList ?? []);

    //If props.isMulti return Select Multi
    if (props.isMulti){
        return (
            
            <Select2BaseMulti
                name={props.name}
                creatable={props.creatable}
                options={optionsList}
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
            />

        )
    }
}

export default Select2