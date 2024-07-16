import React, { useRef, useEffect, useState } from 'react';

//Styling
import styles from './FieldPopOver.module.scss'

const FieldPopOver = props => {

    //Extract the props
    const {
        header, 
        body,
        closingFunction,
        buttonRef,
        containerRef
    } = props;

    const [pointerTranslateX, setPointerTranslateX] = useState(0)
    const [dialogTranslateX, setDialogTranslateX] = useState(0)
    const [readyToDisplay, setReadyToDisplay] = useState(false)

    //Reference to the modal element to be able to call the native javascript functions
    const componentRef = useRef()

    //Display the component with its native function when the component is redendered
    useEffect(() => {
        //Calculate the left position of the pointer
        if(componentRef?.current && buttonRef.current && containerRef.current){

            //Data references
            const containerX = containerRef.current.getBoundingClientRect();
            const dialogX = componentRef.current.getBoundingClientRect();
            const buttonX = buttonRef.current.getBoundingClientRect();
            
            if(containerX.width > 380) { //Hard coded value for now. 
                const buttonDist = buttonX.left - containerX.left
                if(buttonDist > dialogX.width){
                    const translateXAdd = buttonDist - dialogX.width;
                    setDialogTranslateX(translateXAdd)
                    setPointerTranslateX(0.95 * dialogX.width)
                    setReadyToDisplay(true)
                } else {
                    setPointerNormaly()
                }
            } else {
                setPointerNormaly()
            }

            function setPointerNormaly(){
                const pointerModifier = Math.abs((buttonX.left + (buttonX.width / 2)) - (dialogX.left + 10));
                setPointerTranslateX(pointerModifier)
                setReadyToDisplay(true)
            }

        }

        if(!componentRef.current.hasAttribute("open"))
            componentRef.current.show()
    }, [componentRef.current])

    return (
            <dialog 
                ref={componentRef}
                className={`
                    border-0
                    ${styles["pop-over"]}
                `}
                style={{left: `${dialogTranslateX}px`}}
            >
                <header className="">
                    <h4 title={header} className="m-0 me-2 fs-5 text-truncate">
                        { header }
                    </h4>
                    <button 
                        className="fs-5 m-0"
                        onClick={closingFunction}
                        type="button"
                    >
                        &#x2716;
                    </button>
                </header>
                <div className="border-bottom w-100 my-2"></div>
                <section>
                    <p className="m-0">
                        { body }
                    </p>
                </section>
                {/* Lack of time so the pointer stay in stand by
                <div
                    className={`${styles["pointing-corner"]}`}
                    style={{transform: `translate(${pointerTranslateX}px) rotate(45deg)`}}
                >
                </div> 
                */}
            </dialog>
    )
}

export default FieldPopOver

