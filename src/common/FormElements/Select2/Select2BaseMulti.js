//components
import {useRef} from 'react';
import CreatableSelect from 'react-select/creatable';

//Style, utils
import makeAnimated from 'react-select/animated';
import {selectStyle} from '@/src/styles/datatypeStyle';
import {lang} from "@/src/common/Data/GlobalConstants";


/** 
 * @param {string} name : used for id and formState
 * @param {boolean} creatable : if undefined or false, no create option will be available
 * @param {Array useState} options : Will show, search and allow selection of these options
 * @param {string useState} inputValue : State of the input text
 * @param {useState setter} inputValueSetter : Setter for the state of inputValue, used for dynamic option list search
 * @param {Array useState} value : State of the current value of the selected item
 * @param {useState setter} valueSetter : setter of value to update the selected item
 * @param {function} createOptionFunction : function that handles the create (modal pop-up ...)
 * */

const Select2BaseMulti = ({name, ...props}) => {


    const selectRef = useRef();
    
    //Creatable Section
    const filterCreate = (option, searchText) => {
        //If we are in not creatable
        if(props?.creatable == undefined || props?.creatable == false){
            //If the option is the "new option to create" and we don't allow creatable
            if (option?.data?.__isNew__ == true){
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
        selectRef.current.setValue([...selectRef.current.state.selectValue, { value: elem.toLowerCase(), label: elem }], "set-value");
    }

    //Style & Utils section
    const setValueWithComma = () => {
        selectRef.current.setValue(selectRef.current.state.focusedOption, "set-value")
    }
    const animatedComponents = makeAnimated();
    const colourStyles = selectStyle(); //From our styling factory
    
    //Reset component
    const resetSelectComponent = () => {
        selectRef.current.setValue([], "set-value");
        props.inputValueSetter('');
    }

    return (
        <CreatableSelect
            ref={selectRef}
            instanceId={"Select2Multi-"+name}
            isMulti
            
            //value, input, options
            value={props.value}
            inputValue={props.inputValue}
            options={props.options}

            onChange={ (val) => { props.valueSetter(val)}}
            onInputChange={(val) => {
                /* val.slice(-1) === ',' ?
                setValueWithComma()
                : */
                props.inputValueSetter(val)
            }}

            //Style, utils
            components={animatedComponents}
            styles={colourStyles}

            //Creatable Section
            formatCreateLabel={(val)=> lang.createOptionLabel + val}
            onCreateOption={(elem) => { props.createOptionFunction ? props.createOptionFunction(elem) : defaultCreateOption(elem) }}
            //Check every option and filter. If filterOption return undefined, it doesn't show the option (allow to show or not "__isNew__" option which is creatable or not)
            filterOption={(option, searchText) => filterCreate(option, searchText)}
        />

    )
}

export default Select2BaseMulti;