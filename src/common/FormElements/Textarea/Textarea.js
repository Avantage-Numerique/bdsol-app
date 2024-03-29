import React from 'react'

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//Styling
import styles from './Textarea.module.scss'


const Textarea = ({name, formTools, ...props}) => {

    //Extration of the validator functions and utilities
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )


    /*
        Access the differents form tools 
    */
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    const currentState = formState.inputs[name];

    const updateValue = event => {
        inputHandler(
            name,
            event.target.value,
            props.validationRules ? validate(event.target.value) : true
        )
    }


    return (

        <div className={` ${styles["TextArea-Component"]}`}>
            <label htmlFor={name}>
                {props.label}
                <textarea 
                    className={` ${!currentState.isValid && currentState.isTouched && styles["control--invalid"]}`}
                    name={name}
                    id={name}
                    rows={props.rows || 3} 
                    placeholder={props.placeholder} 
                    onChange={updateValue}
                    onBlur={() => inputTouched(name)}
                    value={ currentState ? currentState.value : null }
                />
               {!currentState.isValid && currentState.isTouched && 
                    <small>{ props.errorText }</small>
                }
            </label>
        </div>
    );
}

export default Textarea;