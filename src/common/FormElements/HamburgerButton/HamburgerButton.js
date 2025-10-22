/*

    Component representing the hamburger menu button
    V.P.R - created: 15/10/2021

*/
import React from "react";

import styles from "./hamburgerButton.module.scss";

/**
 *
 * @param menuState
 * @param setMenuState
 * @returns {JSXElement}
 * @constructor
 */
const HamburgerButton = ({ menuState, setMenuState }) => {
    /*
        The menu state receive a number. 
        0 : means close
        1 : means open 
        2 : mean close (another menu open)
    */
    return (
        <button onClick={() => setMenuState(menuState !== 1 ? 1 : 0)} className={`${styles.hamButtonComponent}`}>
            <div className={`${styles.menu_btn} ${menuState === 1 && styles.active}`}>
                <div className={`${styles.menu_btn__burger}`}></div>
            </div>
        </button>
    );
};

export default HamburgerButton;
