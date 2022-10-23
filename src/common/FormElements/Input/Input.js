import React from 'react'

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation'

//Utils
import { validate } from '@/src/utils/validators'

//Styling
import styles from './Input.module.scss'


const Input = ({name, formTools, ...props}) => {

    const { } = useValidation()
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
            props.validators ? validate(event.target.value, props.validators) : true
        )
    }
 
    return (
        <div className={`${styles["input-component"]}`}>  
            <div className={`${styles["input-component__label-container"]}`} >
                <label 
                    htmlFor={name}
                >
                    {props.label}
                </label>
                <button type="button" className={` ${styles["information-button"]}`}>
                &#x3f;
                </button>
            </div>

            <div className={`
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && styles["control--invalid"]}
            `}>
                <input 
                    name={ name }
                    id={ name }
                    //If there is a state attached to the component, make it a controlled components where the value depends on the state
                    value={ currentState ? currentState.value : null } 
                    type={props.type ? props.type : "text"}
                    placeholder={props.placeholder}
                    onChange={updateValue}
                    onBlur={() => inputTouched(name)}
                    autoComplete={props.type === "password" ? "on" : undefined}
                /> 
            </div>
                
            {!currentState.isValid && currentState.isTouched && 
            <div className={`${styles["input-component__add"]}`}>
                <small>{ props.errorText }</small>
            </div>
            }

        </div>

    ); 
}

export default Input;