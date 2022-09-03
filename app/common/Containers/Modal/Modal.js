/*

        MODAL component

        This is only a container, but with the property of been
        displayed centered in front of everything else. 

        When the modal is open, you cannot interact with anything else 
        until it is closed.

*/


import {useRef, useEffect} from 'react'

//Styling
import styles from './Modal.module.scss'

const Modal = ({ children, darkColorButton = false, noDefaultWidth, transparentBackground, closingFunction}) => {

    /*
        PROPS REVIEW
            darkColorButton :           Change the color of the closing button to make sure it is visible 
            noDefaultWidth :            by default there is a defined and normalized smaller width. This cancel it
            transparentBackground :     Add a css class to display a transparentBackground blue background
            closingFunction:            a function that will modify the state of the parent element to remove this modal
    */


    //Reference to the modal element to be able to call the native javascript functions
    const modal = useRef()

    //Display the modal with its native function when the component is redendered
    useEffect(() => {

        if(!modal.current.hasAttribute("open"))
            modal.current.showModal()

    }, [])


    return (
        <dialog 
            ref={modal} 
            className={`
                ${styles.modal} 
                ${!noDefaultWidth && styles["default-width"]}
                ${transparentBackground && styles["transparent-background"]}
            `}>
            
            {/* Prevent the document body from been scrollable while the modal is displayed */}
            <style jsx global> {` body { overflow: hidden; } `} </style>

            {/*
                Here goes the content of the modal 

                All the rules to display and hide it must 
                be inside the component calling it. Using the state...
            */}

            {children}

            {/*
                CLOSING BUTTON
                Display itself automatically and trigger a function passed has props when clicked
            */}

            { closingFunction &&
                <button 
                    onClick={() => closingFunction()} 
                    className={`
                        ${styles["closing-button"]}
                        ${darkColorButton && styles["closing-button--dark-color"]}
                    `}>
                        Fermer &#10006;
                    <div className={`${styles["closing-button__underline"]}`}></div>
                </button>
            }
            
        </dialog>
    )
}

export default Modal;