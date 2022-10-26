import React from 'react'

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation'

//Utils
import { validate } from '@/src/utils/validators'

//components
import Tip from '@/common/FormElements/Tip/tip'

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

    if(props.tip){
        console.log(props.tip)
        console.log({...props.tip})

    }
 
    return (
        <div className={`${styles["input-component"]}`}>  
            <div className={`${styles["input-component__label-container"]}`} >
                <label 
                    htmlFor={name}
                >
                    {props.label}
                </label>
                {
                    props.tip &&
                    <Tip 
                        {...props.tip}
                    />
                }
            </div>

            <div className={`
                form-element
                form-element--color-validation
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                <input 
                    className="form-element--field-padding"
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