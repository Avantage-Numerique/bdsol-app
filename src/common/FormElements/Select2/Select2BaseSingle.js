//components
import {useRef} from 'react';
import CreatableSelect from 'react-select/creatable';

//Style & utils
import {lang} from "@/src/common/Data/GlobalConstants";

/**
 * @param {string} name : used for id and formState
 * @param {object} props : used for id and formState
 * @param {boolean} props.creatable : if undefined or false, no create option will be available
 * @param {Array} props.options : Will show, search and allow selection of these options
 * @param {string} props.inputValue : State of the input text
 * @param {useState} props.inputValueSetter : Setter for the state of inputValue, used for dynamic option list search
 * @param {object} props.value : State of the current value of the selected item
 * @param {useState} props.valueSetter : setter of value to update the selected item
 * @param {function} createOptionFunction : function that handles the create (modal pop-up ...)
 * */

const Select2BaseSingle = ({name, ...props}) => {

    const selectRef = useRef();

    //Simple styling to remove the border
    const styling = {
        control: (styles, state) => ({ 
            ...styles,
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
               border: state.isFocused ? 0 : 0
            },
            //backgroundColor: 'white' 
        })
    }

    //Creatable Section
    const filterCreate = (option, searchText) => {
        //If we are in not creatable
        if(props?.creatable === undefined || props?.creatable === false){
            //If the option is the "new option to create" and we don't allow creatable
            if (option?.data?.__isNew__ === true){
                return undefined
            }
            //else return options that fit searchText
            return option.label.toLowerCase().includes(searchText.toLowerCase()) ||
                option.value.toLowerCase().includes(searchText.toLowerCase())
        }
        //else we can allow all options to be search and the create option too    
        else {
            //return options that fit searchText
            return option.label.toLowerCase().includes(searchText.toLowerCase()) ||
                option.value.toLowerCase().includes(searchText.toLowerCase())
        }
    }

    const defaultCreateOption = (elem) => {
        selectRef.current.setValue({ value: elem.toLowerCase(), label: elem }, "set-value");
    }

    //Style & Utils section
    const setValueWithComma = () => {
        selectRef.current.setValue(selectRef.current.state.focusedOption, "set-value")
    }

    //Reset component
    const resetSelectComponent = () => {
        //selectRef.current.setValue(null, "set-value");;
        //props.inputValueSetter('');
    }

    return (
        <CreatableSelect
            ref={selectRef}
            instanceId={"Select2Single-"+name}

            //Behaviours and default
            isClearable={true}

            //value, input, options
            value={props.value}
            inputValue={props.inputValue}
            options={props.options}

            onChange={(val) => props.valueSetter(val)}
            onInputChange={(val) => {
                val.slice(-1) === ',' ?
                setValueWithComma()
                :
                props.inputValueSetter(val)
            }}

            styles={styling}

            //Creatable Section
            formatCreateLabel={(val)=> lang.createOptionLabel + val}
            onCreateOption={(elem) => { props.createOptionFunction ? props.createOptionFunction(elem) : defaultCreateOption(elem) }}
            //Check every option and filter. If filterOption return undefined, it doesn't show the option (allow to show or not "__isNew__" option which is creatable or not)
            filterOption={(option, searchText) => filterCreate(option, searchText)}
        />
        

    )
}

export default Select2BaseSingle;