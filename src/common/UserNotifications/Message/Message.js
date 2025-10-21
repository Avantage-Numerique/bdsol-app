import { useEffect, useRef, useState } from "react";

import styles from "./Message.module.scss";

const Message = ({ children, theme, position = 1, clean }) => {
    /*
        children : contains the main message to be displayed
        positiveReview : contains the type of message : positive of negative (bool)
        clean : function to be called if defined to clean the state of the component who called the message when it must be removed
    */
    const [active, setActive] = useState(true);
    const [hideProperty, setHideProperty] = useState(false);

    const msgRef = useRef(null);

    const hideElement = () => {
        if (!hideProperty) setHideProperty(true);

        setTimeout(() => {
            setActive(false);
            clean();
        }, 1000);
        //The one second correspond to the duration of the transition of the animation in the scss file.
    };

    useEffect(() => {
        // Changes CSS variable after component renders
        msgRef.current.style.setProperty("--toasting-position", `${100 * position}%`);
        setTimeout(() => {
            hideElement();
        }, 8000);
    }, [position]); // Re-runs when color changes

    return (
        <>
            {active && children && (
                <aside
                    ref={msgRef}
                    className={`${styles["message-component"]} ${styles[theme]} ${!hideProperty ? styles["show-message"] : styles["hide-message"]}`}
                >
                    <p className="beige">
                        {position} {children}
                    </p>

                    <div
                        onClick={() => {
                            hideElement();
                        }}
                        className={styles.xbutton}
                    >
                        &#10005;
                    </div>
                </aside>
            )}
        </>
    );
};

export default Message;
