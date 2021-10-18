/*

    Component representing the hamburger menu button
    V.P.R - created: 15/10/2021

*/
import React, { useState } from 'react';

import styles from '../../styles/components/buttons/hamburgerButton.module.scss'

const HamburgerButton = ( {menuState, setMenuState} ) => {

    return (

        <button onClick={() => setMenuState(!menuState)} className={`${styles.hamButtonComponent}`}>
        {/*
            Event listener when the user click on the menu. 
            Receive the signal and change the state with the setMenuState function 
        */}

            <div className={`${styles.menu_btn} ${menuState ? styles.active : " "}`}>
                <div className={`${styles.menu_btn__burger}`}></div>
            </div>
        </button>

    )   
}



export default HamburgerButton;