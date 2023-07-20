import { useRef, useState } from 'react';

import Modal from '@/src/hooks/useModal/Modal/Modal'

export const useModalController = () => {

    const [ modalsData, setModalsData ] = useState({}) 

    /**************** Utils *****************/

    //Add new 
    const addNewModal = params => {
        //Destructure parameters with default values
        const {
            //Required informations
            UI,
            key,
            //Not required informations
            displayOnCreation=false,
            className = "",
            noDefaultWidth=false,      
            coloredBackground=false,   //If true, the background color become blue
            closingButton=false        //If true, display the default closing button 
        } = params;
        
        setModalsData({
            ...modalsData,
            key: {
                key: key,
                display: displayOnCreation,
                UI: () => (
                    <Modal
                        noDefaultWidth={noDefaultWidth}
                        coloredBackground={coloredBackground}
                        className={className}
                        closingFunction={closingButton ? () => setModalsData(prev => ({
                            ...prev,
                            key: {
                                ...prev.key,
                                display: false
                            }
                        })) : null}
                    >
                        {UI}
                    </Modal>
                )
            }
        })
        

        //Functionnalities related to this specific modal
        return {
            display: () => setModalsData(prev => ({
                ...prev,
                key: {
                    ...prev.key,
                    display: true
                }
            })),
            close: () => setModalsData(prev => ({
                ...prev,
                key: {
                    ...prev.key,
                    display: false
                }
            }))
        }
    }

    return {
        ModalsDisplay: () => displayModalUi(modalsData),
        //In case we need many functions for one single component. Its going to be cleaner
        modalTools: {
            addNew: addNewModal
        }
    }
}

//Display all the modal Ui in the right order
function displayModalUi(modalsData) {

    const modalsDataObj = Object.values(modalsData);
    const modalsToDisplay = modalsDataObj.filter(e => e.display == true);

    return (
        <>
            {modalsToDisplay && modalsToDisplay.map(modal => (
                <modal.UI key={modal.key} />
            ))} 
        </>
    )
}
