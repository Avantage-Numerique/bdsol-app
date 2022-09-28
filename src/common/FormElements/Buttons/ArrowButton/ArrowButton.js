/*

    Component representing a "x" button that serve to close and open windows
    V.P.R - created: 010/10/2021

*/
import React, { useState, useEffect } from 'react';

import styles from './ArrowButton.module.scss'

const ArrowButton = ( {openned, className, onclick} ) => {

    //Use the useState hook to rerender the component when the prop "openned" change
    const [rerender, setRerender] = useState(false);

    //UseEffet hook to watch if the openned prop change
    useEffect(()=>{
        setRerender(!rerender);
    }, [openned]);

    //Get specific className from the parent component if there is one
    const parentClassName = className ? className : " ";

    return (

        <button onClick={ onclick } className={`${styles.xButton} ${is_openned(openned)} ${parentClassName}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.97 11.31">
                <polygon points="0 2.83 2.83 0 8.48 5.66 14.14 0 16.97 2.83 8.48 11.31 0 2.83"/>
            </svg>
        </button>

    )   
}

function is_openned(value){
    if(value){
        return `${styles.openned} bg-primary`;
    }else{
        return " ";
    }
}

export default ArrowButton;