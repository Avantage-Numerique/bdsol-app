import React, { useRef, useEffect, useState } from "react";

//Styling
import styles from "./FieldPopOver.module.scss";

const FieldPopOver = (props) => {
    //Extract the props
    const { header, body, closingFunction, buttonRef, containerRef } = props;

    const [dialogTranslateX, setDialogTranslateX] = useState(0);
    const [dialogTranslateY, setDialogTranslateY] = useState(0);

    //Reference to the modal element to be able to call the native javascript functions
    const componentRef = useRef();

    //Handles the dynamic positioning of the tooltip
    //Uses requestAnimationFrame to ensure measurements are taken after the dialog render and valid dimensions
    useEffect(() => {
        if (componentRef?.current && buttonRef?.current && containerRef?.current) {
            // Show the dialog first so it gets rendered
            if (!componentRef.current.hasAttribute("open")) {
                componentRef.current.show();
            }

            // Defer the calculation until next animation frame
            requestAnimationFrame(() => {
                const dialogEl = componentRef.current;
                const buttonEl = buttonRef.current;
                const containerEl = containerRef.current;
                if (!dialogEl || !buttonEl || !containerEl) return;

                const dialogRect = dialogEl.getBoundingClientRect();
                const buttonRect = buttonEl.getBoundingClientRect();
                const containerRect = containerEl.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                let calculatedDialogX = 0;
                let calculatedDialogY = 0;

                const desiredLeft = buttonRect.left + buttonRect.width / 2 - dialogRect.width / 2;

                if (desiredLeft < 8) {
                    calculatedDialogX = 8 - containerRect.left;
                } else if (desiredLeft + dialogRect.width > viewportWidth - 8) {
                    calculatedDialogX = viewportWidth - 8 - dialogRect.width - containerRect.left;
                } else {
                    calculatedDialogX = desiredLeft - containerRect.left;
                }

                const desiredTop = buttonRect.top + buttonRect.height + 3.75;

                if (desiredTop < 8) {
                    calculatedDialogY = 8 - containerRect.top;
                } else if (desiredTop + dialogRect.height > viewportHeight - 8) {
                    calculatedDialogY = viewportHeight - 8 - dialogRect.height - containerRect.top;
                } else {
                    calculatedDialogY = desiredTop - containerRect.top;
                }

                const pointerCenterOffset = buttonRect.left + buttonRect.width / 2 - desiredLeft;
                const cappedPointerOffset = Math.max(10, Math.min(pointerCenterOffset, dialogRect.width - 10));

                setDialogTranslateX(calculatedDialogX);
                setDialogTranslateY(calculatedDialogY);
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
            style={{ left: `${dialogTranslateX}px`, top: `${dialogTranslateY}px` }}
        >
            <header className="">
                <h4
                    title={header}
                    className="d-flex justify-content-star align-items-center m-0 me-2 fs-5 text-truncate"
                >
                    {header}
                </h4>
                <button className="fs-5 m-0" onClick={closingFunction} type="button">
                    &#x2716;
                </button>
            </header>
            <div className="border-bottom w-100 my-2"></div>
            <section>{body}</section>
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
