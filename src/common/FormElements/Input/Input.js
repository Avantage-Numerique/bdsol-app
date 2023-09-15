import {useEffect, useRef} from 'react';

//Hooks
import {useValidation} from '@/src/hooks/useValidation/useValidation';

//components
import Tip from '@/common/FormElements/Tip/Tip';

//Styling
import styles from './Input.module.scss';

/**
*
 * @param props.validators
 * @param props.className {string} Allow us to add element to the class names from outside
 * @param props.formClassName {string} Class name that affect specifically the form element inside the component
 *
 * @description `search field` is set for, `idField` is set for
 *
 * @constructor
 */


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

    const fieldRef = useRef(null);


    const transmuteIn = (value) => {
        return value;
    }

    const transmuteOut = (value) => {
        return value
    }

    const updateValue = event => {
        inputHandler(
            name,
            event.target.value,
            props.validationRules ? validate(event.target.value) : true
        )
        if (typeof props.onChangeInput === 'function') {
            //if the component got an onChange method sets. Trigger it.
            props.onChangeInput(event);
        }
    }

    useEffect(() => {
        inputHandler(
            name,
            fieldRef.current.value,
            props.validationRules ? validate(fieldRef.current.value) : true
        )
    }, [])

 
    return (
        <div className={`${props.className && props.className} ${styles["input-component"]}`}>  
            <div className={`${styles["input-component__label-container"]}`} >
                <label 
                    htmlFor={name}
                >
                    {props.label}
                </label>
                {
                    props.tip &&
                    <Tip {...props.tip}/>
                }
            </div>

            <div 
                //tabIndex="0"  Would allow the complete field to be focused, not only the input. But that would alos make two focusable elements by field
                data-testid="field-container"
                className={`
                form-element
                form-element--color-validation
                ${props.disabled ? "bg-greyBg" : ""}
                ${props.formClassName && props.formClassName}
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                <input 
                    ref={fieldRef}
                    className="w-100 border-0 form-element--field-padding --place-holder-color-primary"
                    name={ name }
                    id={ name }
                    disabled={props.disabled ? true : false}
                    //If there is a state attached to the component, make it a controlled components where the value depends on the state
                    list={props.list ? props.list : null}
                    value={ currentState ? currentState.value : null }
                    type={props.type ? props.type : "text"}
                    placeholder={props.placeholder}
                    onChange={updateValue}
                    onBlur={() => inputTouched(name)}
                    autoComplete={props.type === "password" ? "on" : undefined}
                    pattern={props.pattern ?? undefined}
                    min={props.min ?? undefined}
                    max={props.max ?? undefined}
                />

                <RequirementsBadges addUlPadding /> 
            </div>

            <div className="validation-error-messages-container">
                    { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

        </div>

    ); 
}

export default Input;