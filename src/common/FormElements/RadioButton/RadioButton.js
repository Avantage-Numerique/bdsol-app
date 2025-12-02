import { useValidation } from "@/src/hooks/useValidation/useValidation";
import { useEffect } from "react";

/**
 *
 * @props name : name for the formtool
 * @props label : Label shown for the group of radio button
 * @props formTools : formtools to store de value(s) selected
 * @props options : options to display formatted : [ { label:_, value:_ }, {...}]
 * @props validationRules : Set of rules for validator
 * @returns
 */

const RadioButton = ({ name, formTools, ...props }) => {
    const { formState, inputHandler } = formTools;
    const { validate, RequirementsBadges, ValidationErrorMessages, dependencyCallingValidation } = useValidation(
        props.validationRules,
        formState
    );

    const updateValue = (event) => {
        inputHandler(name, event.target.value, props.validationRules ? validate(event.target.value) : true);
    };

    useEffect(() => {
        inputHandler(
            name,
            formState.inputs[name].value,
            props.validationRules ? validate(formState.inputs[name].value) : true
        );
    }, [dependencyCallingValidation]);

    //Set a checked radio if only one option available
    useEffect(() => {
        if (props.options.length === 1 && formState.inputs[name]?.value !== props.options[0].value) {
            updateValue({ target: { value: props.options[0].value } });
        }
    }, [props.options]);

    function createRadioGroup() {
        const radioBtnArray = [];
        //Build radio button per options
        props.options.forEach((elem, index) => {
            //Return if options are incomplete
            if (elem?.value == undefined || elem?.label == undefined) return;

            radioBtnArray.push(
                <label className="pe-3" key={"radioBtn-" + name + " -" + index}>
                    <input
                        className="m-2"
                        type="radio"
                        name={name}
                        value={elem.value}
                        checked={elem.value == formState.inputs[name].value}
                        onChange={updateValue}
                    />
                    {elem.label}
                </label>
            );
        });

        return (
            <>
                {props.label && (
                    <div className="p-2">
                        <label>{props.label}</label>
                    </div>
                )}
                <div>{radioBtnArray}</div>
            </>
        );
    }

    return (
        <div className="form-element form-element--color-validation">
            {createRadioGroup()}
            <RequirementsBadges addUlPadding displayOnlyBadges={true} />
        </div>
    );
};

export default RadioButton;
