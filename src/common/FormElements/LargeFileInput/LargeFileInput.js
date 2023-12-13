import {useEffect, useRef} from 'react';
import Image from 'next/image'

//Hooks
import {useValidation} from '@/src/hooks/useValidation/useValidation';
import {useRootModal} from '@/src/hooks/useModal/useRootModal';

//components
import Tip from '@/common/FormElements/Tip/Tip';
import Button from "@/FormElements/Button/Button";

//Styling
import styles from './LargeFileInput.module.scss';

//Media
import img_suggesting_placement from '@/public/general_images/img_suggesting_placement.png'

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
    
    //Extract root modal 
    const { Modal, displayModal, closeModal, modalInitValues } = useRootModal();

    //State specific to this field
    const currentState = formState.inputs[name];

    /********* Component's references *************/
    const fieldRef = useRef("");    //Real input

    const updateValue = event => {

        event.stopPropagation();
        event.preventDefault();

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
            currentState.value,
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
                { tip && <Tip  {...tip} /> }
            </div>

            <div
                className={`
                form-element
                h-100
                overflow-hidden
                ${styles["input-component__field-container"]}
                ${!currentState.isValid && currentState.isTouched && "control--invalid"}
            `}>
                {/* Customization of the field */}
                <div
                    className={`
                        w-100 
                        h-100
                        border-0 
                        form-element--field-padding
                        d-flex 
                        align-items-center 
                        ${styles["input-ui"]}
                        p-0
                    `}
                    onBlur={() => inputTouched(name)}
                    tabIndex="0"
                >
                    {/* New Ui button to replace the default one displayed by the browser */}
                    <section
                        className={`
                            ${styles["file-selection-container"]}
                            position-relative
                            w-100
                            h-100
                        `}
                    >

                        {/* Field that holds a current image or one to be uploaded */}
                        {   currentState.value &&
                            <figure className={`
                                position-absolute 
                                top-0
                                start-0
                                w-100
                                h-100
                                m-0
                                ${styles["input-ui__img-container"]}
                            `}>
                                <img
                                    src={typeof currentState.value === 'object' ? URL.createObjectURL(currentState.value) : currentState.value} alt="Aperçu de la photo à téléverser" />
                            </figure>
                        }

                        {/* Field informations displayed over an image if there is */}
                        <div
                            className={`
                                position-absolute
                                w-100
                                h-100
                                top-0
                                start-0
                                d-flex 
                                justify-content-center
                                flex-column                        
                                align-items-center
                                ${styles["input-ui__over-img-content"]} 
                            `}
                        >
                            <button
                                //When the user click on the Ui button, this trigger a click on the real one to
                                onClick={() => fieldRef.current.click()}
                                type="button"
                                className={`${styles["select-file-button"]}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.75 21">
                                        <polyline points="5.25 10 1.5 10 1.5 19.5 20.25 19.5 20.25 10 16.5 10" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <polyline points="6.87 5.5 10.87 1.5 14.87 5.5 10.87 1.5 10.87 15" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                </svg>

                                {/* Display of the selected file */}
                                <div
                                    dir="rtl"
                                    className={`m-2 ${styles["input-ui__file-name"]}`}
                                >
                                    { !currentState.value && !currentState.value?.name && "Sélectionnez un fichier"}
                                </div>
                            </button>
                            {validationRules && 
                                <div className={`px-1 ${styles["input-ui__RequirementsBadges-container"]}`}>
                                    <RequirementsBadges alwaysDisplay displayOnlyBadges /> 
                                </div>
                            }
                            {/* Format preferences */}
                            <div className="p-2 w-100 d-flex justify-content-center">
                                <div className={`mt-2 ${styles["square-format"]}`}>
                                    <p className="text-dark">Images carrées suggérées</p>
                                    <button type="button" onClick={displayModal} className="text-dark m-0 mt-1">Pourquoi ?</button>
                                </div>
                            </div>
                        </div>
                    </section>
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
            </div>

            <div className="validation-error-messages-container">
                { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

            <Modal>
                <header className={`d-flex justify-content-between align-items-start`}>
                    <div className="me-2">
                        <h4 className="text-dark">Priorisez une image carrée</h4>
                        <small><p>Les images représentant les entitées sont généralement affichées à travers des cercles de dimensions égales</p></small>
                    </div>
                    <Button onClick={() => closeModal()}>Fermer</Button>
                </header>
                <small>
                    <p>Pour garantir une visualisation optimale du contenu, les photos sont toujours affichées à partir de leur centre. </p>
                    <p>Tel qu'illustré ci-dessous, une photo dont le format n'est pas carré risque ainsi de voir sont contenu coupé au mauvais endroit.</p>
                </small>
                <Image
                    src={img_suggesting_placement}
                    alt="Priorisez une image de format carré afin d'être sûr de bien afficher son contenu."
                />
                
            </Modal>

        </div>
    )
}

export default LargeFileInput