import { useState, useEffect, useCallback } from 'react'
import { createPortal } from "react-dom";


//components
import Modal from './Modal/Modal'

export const useRootModal = ( prefilledValues, modalProps = {} ) => {

    //Main state of the hook
    const [modal, setModal] = useState({
        display: false,
        //Values to be passed from the person form to the taxonomy form
        enteredValues: prefilledValues || {},   
        callback: () => {},
        modalProps: {
            className: modalProps?.className ?? "",
            noDefaultWidth: modalProps?.noDefaultWidth ?? false,
            coloredBackground: modalProps?.coloredBackground ?? false,
            closingButton: modalProps?.closingButton ?? false,
        }
    })

    //Function that display the modal inside the root element
    const ModalToExport = useCallback(({ children }) => {

        if(modal.display)
            return createPortal(
                <Modal
                    noDefaultWidth={modal.modalProps.noDefaultWidth}
                    coloredBackground={modal.modalProps.coloredBackground}
                    className={modal.modalProps.className}
                    closingFunction={modal.modalProps.closingButton}
                >
                    {children}
                </Modal>,
                document.getElementById("portal-root")
            )

    }, [modal])

    /*******   Utils function   *******/
    const displayModal = (newEnteredValues = {}, callback) => {
        /*
            newEnteredValues shaping exemple : 
            {
                lastName: "Boudreau",
                firstName: "Walter"
            }
        */
        setModal(prev => ({
            ...modal,
            display: true,
            enteredValues: {
                ...prev.enteredValues,
                ...newEnteredValues
            },
            callback: callback
        }))
    }


    const closeModal = () => {
        setModal({
            ...modal,
            display: false
        })
    }

    return {
        modal,
        Modal: ModalToExport,
        displayModal,
        closeModal
    }

}