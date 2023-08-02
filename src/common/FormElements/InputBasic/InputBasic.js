import {useEffect, useRef} from 'react';
import { useValidation } from '@/src/hooks/useValidation/useValidation';


const InputBasic = ({name, formTools, ...props}) => {

    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )

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
    }

    useEffect(() => {
        inputHandler(
            name,
            fieldRef.current.value,
            props.validationRules ? validate(fieldRef.current.value) : true
        )
    }, [])


    return (
        <input
            ref={fieldRef}
            className={`${props.className}`}
            name={ name }
            id={ name }
            //If there is a state attached to the component, make it a controlled components where the value depends on the state
            list={props.list ? props.list : null}
            value={ currentState ? currentState.value : null }
            type={props.type ? props.type : "text"}
            placeholder={props.placeholder}
            onChange={updateValue}
            onBlur={() => inputTouched(name)}
            autoComplete={props.type === "password" ? "on" : undefined}
            pattern={props.pattern ?? undefined}
        />
    );
}

export default InputBasic;