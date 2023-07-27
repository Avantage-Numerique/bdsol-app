import { useRef, useState, useEffect, memo } from 'react';
import { createPortal } from "react-dom";

import Modal from '@/src/hooks/useModal/Modal/Modal';

export const ModalElem = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
    
    if(mounted)
        return createPortal(
            <Modal
                noDefaultWidth={false}
                coloredBackground={false}
                className={""}
                closingFunction={null}
            >
                {children}
            </Modal>,
            document.getElementById("portal-root")
        )
    return null
}

export const useModalController = () => {

    console.log("Modal contexte called")
    const [ modalsData, setModalsData ] = useState({}) 


    /**************** Utils *****************/

    const initModalKey = params => {
        //Destructure parameters with default values
        const {
            //Required informations
            key,
            //To be added at the display time
            UI,
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
                UI: () => (<></>)
            }
        })

        //Functionnalities related to this specific modal
        return {
            display: UI => setModalsData(prev => ({
                ...prev,
                key: {
                    ...prev.key,
                    display: true,
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

    //Add new modal with Ui
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
        //ModalsDisplay: () => displayModalUi(modalsData),
        //In case we need many functions for one single component. Its going to be cleaner
        modalTools: {
            addNew: addNewModal,
            initModalKey: initModalKey,
            Modal: ModalElem
        }
    }
}

//Display all the modal Ui in the right order
function displayModalUi(modalsData) {

    console.log("Modals data", modalsData)

    const modalsDataObj = Object.values(modalsData);
    const modalsToDisplay = modalsDataObj.filter(e => e.display == true);

    return (
        <>
            {modalsToDisplay && modalsToDisplay.map(modal => (
                createPortal(
                    <modal.UI key={modal.key} />,
                    document.getElementById("portal-root"),
                    modal.key
                )
            ))} 
        </>
    )
}
