/*

    Component representing a "x" button that serve to close and open windows
    V.P.R - created: 010/10/2021

*/
import React, { useState, useEffect } from 'react';

import styles from '../../styles/components/buttons/xButton.module.scss'

const XButton = ( {openned} ) => {

    //Use the useState hook to rerender the component when the prop "openned" change
    const [rerender, setRerender] = useState(false);

    //UseEffet hook to watch if the openned prop change
    useEffect(()=>{
        setRerender(!rerender);
    }, [openned]);

    return (

        <button className={`${styles.xButton} ${openned ? styles.openned : " "}`}> &#x2716; </button>

    )   
}



export default XButton;