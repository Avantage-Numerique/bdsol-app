import React from 'react'


//Utils
import { validate } from '../../../utils/validators'

//Styling
import styles from './Textarea.module.scss'


const Textarea = ({name, formTools, ...props}) => {

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