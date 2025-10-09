import React, { useRef, useEffect, useState } from "react";

//Styling
import styles from "./FieldPopOver.module.scss";

const FieldPopOver = (props) => {
    //Extract the props
    const { header, body, closingFunction, buttonRef, containerRef } = props;

    const [pointerTranslateX, setPointerTranslateX] = useState(0);
    const [dialogTranslateX, setDialogTranslateX] = useState(0);
    const [readyToDisplay, setReadyToDisplay] = useState(false);

    //Reference to the modal element to be able to call the native javascript functions
    const componentRef = useRef();

    //Handles the dynamic positioning of the tooltip
    //Uses requestAnimationFrame to ensure measurements are taken after the dialog render and valid dimensions
    useEffect(() => {
        if (
            componentRef?.current &&
            buttonRef?.current &&
            containerRef?.current
        ) {
            // Show the dialog first so it gets rendered
            if (!componentRef.current.hasAttribute("open")) {
                componentRef.current.show();
            }

            // Defer the calculation until next animation frame
            requestAnimationFrame(() => {
                const dialogEl = componentRef.current;
                const buttonEl = buttonRef.current;
                const containerEl = containerRef.current;

                const dialogRect = dialogEl.getBoundingClientRect();
                const buttonRect = buttonEl.getBoundingClientRect();
                const containerRect = containerEl.getBoundingClientRect();
                const viewportWidth = window.innerWidth;

                let calculatedDialogX = 0;

                const desiredLeft =
                    buttonRect.left +
                    buttonRect.width / 2 -
                    dialogRect.width / 2;

                if (desiredLeft < 8) {
                    calculatedDialogX = 8 - containerRect.left;
                } else if (desiredLeft + dialogRect.width > viewportWidth - 8) {
                    calculatedDialogX =
                        viewportWidth -
                        8 -
                        dialogRect.width -
                        containerRect.left;
                } else {
                    calculatedDialogX = desiredLeft - containerRect.left;
                }

                const pointerCenterOffset =
                    buttonRect.left + buttonRect.width / 2 - desiredLeft;
                const cappedPointerOffset = Math.max(
                    10,
                    Math.min(pointerCenterOffset, dialogRect.width - 10)
                );

                setDialogTranslateX(calculatedDialogX);
                setPointerTranslateX(cappedPointerOffset);
                setReadyToDisplay(true);
            });
        }
    }, []);

    return (
        <dialog
            ref={componentRef}
            className={`
                    border-0
                    ${styles["pop-over"]}
                `}
            style={{ left: `${dialogTranslateX}px` }}
        >
            <header className="">
                <h4 title={header} className="m-0 me-2 fs-5 text-truncate">
                    {header}
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
                <p className="m-0">{body}</p>
            </section>
            {/* Lack of time so the pointer stay in stand by
                <div
                    className={`${styles["pointing-corner"]}`}
                    style={{transform: `translate(${pointerTranslateX}px) rotate(45deg)`}}
                >
                </div> 
                */}
        </dialog>
    );
};

export default FieldPopOver;
