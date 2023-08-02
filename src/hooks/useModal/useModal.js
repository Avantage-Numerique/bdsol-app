import { useState } from 'react'

//components
import Modal from './Modal/Modal'

export const useModal = ( prefilledValues ) => {

    // prefilledValues set a value that is going to be filled by default

    const [modal, setModal] = useState({
        display: false,
        //Values to be passed from the person form to the taxonomy form
        enteredValues: prefilledValues || {},   
        callback: () => {}
    })

    const displayModal = (newEnteredValues = {}, callback) => {
        /*
            newEnteredValues shaping exemple : 
            {
                lastName: "Boudreau",
                firstName: "Walter"
            }
        */
        setModal(prev => ({
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
        Modal,
        displayModal,
        closeModal
    }

}