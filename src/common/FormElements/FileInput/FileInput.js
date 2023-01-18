import {useEffect, useRef} from 'react';

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//components
import Tip from '@/common/FormElements/Tip/Tip';
import Button from '@/FormElements/Button/Button';

//Styling
import styles from './FileInput.module.scss'


const FileInput = ({...props}) => {

    /**************************

        EXPECTED PROPS

    ***************************/
   const {
        name,               //Unique and essentiel to the field. It is the key to recognizing it in the formState
        formTools,          //Access to the state of the hole form
        validationRules,    //Rules that define what is needed and accepted for this field
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
            validationRules ? validate(fieldRef.current.value) : true
        )
    }, [])




    return (
        <div className={`${styles["input-component"]}`}>  
            <div className={`${styles["input-component__label-container"]}`} >
                {/* Display the field label*/}
                <label 
                    htmlFor={name}
                >
                    {props.label}
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
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                <div 
                    className={`
                        w-100 border-0 form-element--field-padding d-flex align-items-center gap-3
                        ${styles["input-ui"]}
                    `}
                    tabIndex="0"
                  >
                    <Button 
                        type="button" 
                        size="slim"
                        //When the user click on the Ui button, this trigger a click on the real one to
                        onClick={() => fieldRef.current.click()}   
                    >
                        Ajouter un fichier
                    </Button>
                    <div 
                        dir="rtl"
                        className={`text-secondary text-truncate ${styles["input-ui__file-name"]}`}
                    >
                        {currentState.value?.name ? currentState.value.name : "Aucun fichier n'est sélectionné"}
                    
                    </div>
                    
                </div>
                <input 
                    hidden="hidden"      //Because this is the real input but it is not displayed
                    ref={fieldRef}
                    className="w-100 border-0 form-element--field-padding"
                    name={ name }
                    accept={accept ? accept : ""}
                    id="test"
                    type="file"
                    onChange={updateValue}
                    onBlur={() => inputTouched(name)}
                /> 

                <RequirementsBadges addUlPadding /> 
            </div>

            <div className="validation-error-messages-container">
            <ValidationErrorMessages /> 
                    { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

        </div>
    )

}

export default FileInput 