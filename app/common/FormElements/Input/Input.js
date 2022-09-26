import React from 'react'

//Utils
import { validate } from '../../../utils/validators'

//Styling
import styles from './Input.module.scss'


const Input = ({addRow, removeRow, name, formTools, ...props}) => {

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
        
            <label className={ styles.inputComponent } htmlFor={props.name}>

                {props.label}

                <div className={`col-12 ${styles["inputComponent__field-container"]}`}>

                    <input 
                        className={` ${!currentState.isValid && currentState.isTouched && styles["control--invalid"]}`}
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

                    { 
                        addRow &&
                        <button onClick={addRow} 
                                className={`text-white bg-blue2`}
                                type="button"
                        >   &#43;
                        </button>
                    }
                    {
                        removeRow &&
                        <button  
                            onClick={removeRow} 
                            className={`text-white bg-danger`}
                            type="button"
                        >
                                &#215;
                        </button>
                    }

                </div>
                
                {!currentState.isValid && currentState.isTouched && 
                    <small>{ props.errorText }</small>
                }

            </label>

    ); 
}

export default Input;