import {useEffect} from 'react';

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//components
import Tip from '@/common/FormElements/Tip/Tip';

//Styling
import styles from './Select.module.scss';


const Select = props => {

    //Current expected shape of an option to display : 
    /*
            {
                label: "Domaine",            ****** What is displayed to the user ********
                value: "domains",            ****** what is the value to be return to the server ********
                disabled: true               ****** Is the option available to select or not ********
            }
    */

    //Destructure every possible props
    const {
        name,           //String - Name that represent the field. Essential for the form state
        formTools,      //Object - Every utils handled by the formState
        tip,            //Object - Display a button on the right of the field to offer more details
        label,          //String - Displayed title of the field
        noValueText,    //String - Annonce if there is an empty option or not. If the value is empty, than it is just a white line that is displayed
        options,        //Array  - Array of options with the format {label: " ", value: " ", disabled: false}. 
        defaultValue,   //String - starting value 
        validationRules //Object - containing the rules that are going to be verify every time we submit
    } = props;

    //Destructure functionalities from validation hook
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )

    /* Access the differents form tools */
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

    /* On mount, evaluate the initial value to see if it respect the validation */
    useEffect(() => {

        //Rules to prefill the select onMount
        //Verify if there is a prefilled value setted by the currentState or the defaultValue prop.
        //If there is one, put it and otherwise, display an empty string
        //Note that, if both are filled, the currentState value is considered more important
        const valueToUpdate = currentState.value ? currentState.value : defaultValue ? defaultValue : "";

        inputHandler(
            name,
            valueToUpdate,
            props.validationRules ? validate(valueToUpdate) : true
        )
    }, [])  
 
    return (
        <div className={`${styles["select-component"]}`}>  
            <div className={`${styles["select-component__label-container"]}`} >
                <label 
                    htmlFor={name}
                >
                    {label && label}
                </label>
                {
                    tip &&
                    <Tip 
                        {...tip}
                    />
                }
            </div>

            <div 
                //tabIndex="0"  Would allow the complete field to be focused, not only the input. But that would alos make two focusable elements by field
                className={`
                form-element
                form-element--color-validation
                ${styles["select-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                <select
                    className={`
                        border-0 
                        form-element--field-padding
                        ${styles["select-component__field-container__select-field"]}
                    `}
                    name={ name }
                    //If there is a state attached to the component, make it a controlled components where the value depends on the state
                    value={ currentState.value && currentState.value } 
                    onChange={updateValue}
                    onBlur={() => inputTouched(name)}
                    autoComplete={props.type === "password" ? "on" : undefined}
                > 
                    {noValueText && 
                        <option value="" className="text-secondary">{ typeof noValueText === "string" ? noValueText : ""}</option>
                    }
                    {options &&
                        options.map((option) => (
                            <option 
                                key={"taxonomy_" + option.value} 
                                value={option.value}
                                disabled={option.disabled ? true : false}
                                >
                                    {option.label}
                            </option>
                        ))
                    }
                </select>

                <RequirementsBadges addUlPadding />

            </div>

            <div className="validation-error-messages-container">
                    { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

        </div>
    ); 
}

export default Select;