import {useEffect, useRef} from 'react';

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//components
import Tip from '@/common/FormElements/Tip/Tip';
import Button from '@/FormElements/Button/Button';

//Styling
import styles from './LargeFileInput.module.scss';


const LargeFileInput = ( props ) => {


    /**************************

        EXPECTED AND ACCEPTED PROPS

    ***************************/
   const {
    name,               //Unique and essentiel to the field. It is the key to recognizing it in the formState
    formTools,          //Access to the state of the hole form
    validationRules,    //Rules that define what is needed and accepted for this field
    label,              //Displayed title of the field
    accept,             //Accepted types : 
                            /*  A string containing one or many of the following, separeted by comas
                                    image/*  =>  any img file. (Many mobile devices also let the user take a picture with the camera when this is used.)
                                    video/*  =>  any video file
                                    audio/*  =>  any audio file
                                    
                                    .jpg, .png, .dpf  => specific format
                                    more : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
                            */
    tip,                //Display and interrogation button that offers some informations
                            /* Expected format : 
                                {
                                    header: "À noter",
                                    body: "Les carottes prennent 8 minutes à cuire."
                                }
                            */
    } = props; 

    //Extract the tools included in the validation hook
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( validationRules )

    /* Custom hook to manage the form data */
    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    //State specific to this field
    const currentState = formState.inputs[name];

    /********* Component's references *************/
    const fieldRef = useRef("");    //Real input

    const updateValue = event => {
        if(event.target.files)
            inputHandler(
                name,
                event.target.files[0],
                validationRules ? validate(event.target.files[0]) : true
            ) 
    }

    //Call the input handler once at the rendering 
    useEffect(() => {
        inputHandler(
            name,
            fieldRef.current.files[0],
            validationRules ? validate(fieldRef.current.files[0]) : true
        )
    }, [])

    return (
        <div className={`${styles["input-component"]} h-100`}>  
            <div className={`${styles["input-component__label-container"]}`} >
                {/* Display the field label*/}
                <label 
                    htmlFor={name}
                >
                    {label}
                </label>
                {/* Display the tip button id there is one */}
                {
                    tip &&
                    <Tip 
                        {...tip}
                    />
                }
            </div>

            <div 
                className={`
                form-element
                form-element--color-validation
                h-100
                d-flex
                flex-column
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                {/* Customization of the field */}
                <div 
                    className={`
                        w-100 
                        border-0 
                        form-element--field-padding
                        d-flex 
                        align-items-center 
                        gap-3
                        flex-grow-1
                        ${styles["input-ui"]}
                    `}
                    onBlur={() => inputTouched(name)}
                    tabIndex="0"
                >
                    {/* New Ui button to replace the default one displayed by the browser */}
                    <button 
                        type="button"
                        className="
                            w-100
                            h-100
                            d-flex 
                            p-4
                            justify-content-center
                            flex-column                        
                            align-items-center 
                        "
                        //When the user click on the Ui button, this trigger a click on the real one to
                        onClick={() => fieldRef.current.click()}   
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.75 21">
                                <polyline points="5.25 10 1.5 10 1.5 19.5 20.25 19.5 20.25 10 16.5 10" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                <polyline points="6.87 5.5 10.87 1.5 14.87 5.5 10.87 1.5 10.87 15" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        </svg>

                        {/* Display of the selected file */}
                        <div 
                            dir="rtl"
                            className={`
                                fs-6
                                mt-2
                                ${styles["input-ui__file-name"]}`}
                        >
                            {currentState.value?.name ? currentState.value.name : "Aucun fichier n'est sélectionné"}
                        </div>
                    </button>
                    
                </div>

                {/* Real input used for its fonctionalities */}
                <input 
                    hidden="hidden"      //Because this is the real input but it is not displayed
                    ref={fieldRef}
                    name={ name }
                    accept={accept ? accept : ""}
                    type="file"
                    onChange={updateValue}
                /> 

                <RequirementsBadges addUlPadding /> 
            </div>

            <div className="validation-error-messages-container">
                { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

        </div>
    )
}

export default LargeFileInput