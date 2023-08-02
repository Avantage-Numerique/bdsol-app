/*

        MODAL component

        This is only a container, but with the property of been
        displayed centered in front of everything else. 

        When the modal is open, you cannot interact with anything else 
        until it is closed.

*/


import {useEffect, useRef} from 'react'

//components
import Button from '@/src/common/FormElements/Button/Button'

//Styling
import styles from './Modal.module.scss'
import {lang} from "@/common/Data/GlobalConstants";


const Modal = props => {

    //Extract all the props 
    const { 
        children, 
        className, 
        noDefaultWidth,                 //by default there is a defined and normalized smaller width. This cancel it
        coloredBackground,              //Add a css class to display a transparentBackground blue background
        closingFunction,                //a function that will modify the state of the parent element to remove this modal
        
    } = props


    //Reference to the modal element to be able to call the native javascript functions
    const modal = useRef();

    //Display the modal with its native function when the component is redendered
    useEffect(() => {
        if(!modal.current.hasAttribute("open"))
            modal.current.showModal();

    }, []);

    return (
        <dialog
            ref={modal} 
            className={`
                ${styles.modal} 
                ${className}
                ${!noDefaultWidth && styles["default-width"]}
                ${coloredBackground && styles["transparent-background"]}
            `}
            //onClick={event => console.log(event)}
            //onChange={event => console.log(event)}
            onClose={event => {
                // We call the showModal here, because on close of the file dialog, the dialog propagate the close event on all listening. And this modal listen and close.
                // Only on chrome
                // So we call showModal here to reset the open value to the dialog since we close / and open modal with another function. (onClick).
                modal.current.showModal();
            }}
        >

                {/*
                    CLOSING BUTTON
                    Display itself automatically and trigger a function passed has props when clicked
                */}
                { closingFunction &&
                    <div className={`
                        ${styles["modal__close-button--container"]} 
                    `}>

                        <Button onClick={() => closingFunction()}>{lang.close}</Button>

                    </div>
                }
            
            {/* Prevent the document body from been scrollable while the modal is displayed  */}
            <style jsx global> {` body { overflow: hidden; } `} </style>

            {/*
                Here goes the content of the modal 

                All the rules to display and hide it must 
                be inside the component calling it. Using the state...
            */}

            {children}
            
        </dialog>
    )
}

export default Modal;