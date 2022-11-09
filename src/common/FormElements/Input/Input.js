import {useEffect} from 'react';

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//Utils
//import { validate } from '@/src/utils/validators';

//components
import Tip from '@/common/FormElements/Tip/Tip';

//Styling
import styles from './Input.module.scss';


const Input = ({name, formTools, ...props}) => {

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

    useEffect(() => {
        console.log("current state touched", currentState.isTouched)
    }, [currentState.isTouched])

 
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

            <div 
                tabIndex="0"  //Allow the complete field to be focused, not only the input.
                className={`
                form-element
                form-element--color-validation
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                <input 
                    className="w-100 border-0 form-element--field-padding"
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

                <RequirementsBadges /> 
            </div>

            <div className="validation-error-messages-container">
            { currentState.isTouched && <ValidationErrorMessages className=""/> }

            </div>
     {/*        {!currentState.isValid && currentState.isTouched && 
            <div className={`${styles["input-component__add"]}`}>
                <small>{ props.errorText }</small>
            </div>
            } */}

        </div>

    ); 
}

export default Input;