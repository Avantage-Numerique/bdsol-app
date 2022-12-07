/*

    Component representing a "x" button that serve to close and open windows
    V.P.R - created: 010/10/2021

*/
import React, { useState, useEffect } from 'react';

import styles from './ArrowButton.module.scss'

const ArrowButton = ( { ...props } ) => {

    let classList = [];
    let classesString = '';
    let btnColor = props.color ? props.color : 'primary';
    let arrowColor = props.outline ? props.outline : 'white';

    //props.accordeon : true/false
        //add 180o on click class

    //props.color : $theme-color
    //props.outline : $theme-color
    //props.direction : up/down/left/right
    //props.onclick : action
    //props.className : ' '
    //props.openned : true/false
    //props.size : large


    //Use the useState hook to rerender the component when the prop "openned" change
    const [rerender, setRerender] = useState(false);

    //UseEffet hook to watch if the openned prop change
    useEffect(()=>{
        setRerender(!rerender);
    }, [props.openned]);

    classList.push('btn');
    classList.push('rounded-circle');
    classList.push(`${styles.xButton}`);
    classList.push(props.color ? `btn-${props.color}` : `btn-${btnColor}` );
    classList.push(props.outline ? `btn-custom-outline-${btnColor} btn-outline-${props.outline}` : '');
    classList.push(`btn-arrow-svg-${arrowColor}`);

    if(props.outline){
        classList.push(`btn-arrow-svg-custom-outline-hover-${btnColor}`)
    }
    
    classList.push(props.classes);
    classList.push(props.openned ? `${styles.openned}` : '');

    let directionClass = props.direction ? `${props.direction}Direction` : 'downDirection';
    classList.push(`${styles[directionClass]}`);

    let sizeClass = props.size ? `custom-btn-arrow-${props.size}` : '';
    classList.push(`${styles[sizeClass]}`);
    
    classesString = classList.join(' ');

    return (

        <button onClick={ props.onclick } className={`${classesString}`}>
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