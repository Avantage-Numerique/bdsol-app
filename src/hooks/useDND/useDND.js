import React, { useState, useEffect, useRef } from 'react'

//Styling
import styles from './useDND.module.scss';

export const useDND = ( containerRef, domElemFormating ) => {

    /* 
                             ___====-_  _-====___
                       _--^^^#####//      \\#####^^^--_
                    _-^##########// (    ) \\##########^-_
                   -############//  |\^^/|  \\############-
                  /############//   (@::@)   \\############\_
                /#############((     \\//     ))#############\
               -###############\\    (oo)    //###############-
              -#################\\  / VV \  //#################-
             -###################\\/      \//###################-
            _#/|##########/\######(   /\   )######/\##########|\#_
            |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
            `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
               `   `  `      `   / | |  | | \   '      '  '   '
                                (  | |  | |  )
                               __\ | |  | | /__
                              (vvv(VVV)(VVV)vvv)


        Elements that are going to be drag through each others
        Array of objects ¬ [{dragButton: node, movingElem: node}]
    */
    const [draggables, setDraggables] = useState([]);

    const cursorData = useRef({
        cursorX: null,
        cursorY: null,
        boxX: null,
        boxY: null,
        diffX: null,
        diffY: null,
        movingElem: null
    })

    //**** Don't forget to pass the attribute "data-order" to the elements that are going to change order ****

    console.log("Draggables", draggables);

    const replacingBlock = document.createElement("div");
    replacingBlock.classList.add(styles["replacing-block"]);
    replacingBlock.classList.add("row");


    /*  
        Refresh everytime the container ref changes
        1. Add every 
        Event listeners for the draggable elements 
    */
    useEffect(() => {

        //Convert the dom collection into an array
        const arrayOfOrderedElems = Array.from(containerRef.current.children);

        //Update the state
        setDraggables(arrayOfOrderedElems.map(elem => (
            {
                //If the value is negative (null, undefined or else), than it is assumed the value is the element itself
                //If something is defined, than it must be a function that use the elem has parameter
                dragButton: domElemFormating.dragButton ? domElemFormating.dragButton(elem) : elem,  
                movingElem: domElemFormating.movingElem ? domElemFormating.movingElem(elem) : elem,
            }
        )))

        const temporaryArray = arrayOfOrderedElems.map(elem => (
            {
                //If the value is negative (null, undefined or else), than it is assumed the value is the element itself
                //If something is defined, than it must be a function that use the elem has parameter
                dragButton: domElemFormating.dragButton ? domElemFormating.dragButton(elem) : elem,  
                movingElem: domElemFormating.movingElem ? domElemFormating.movingElem(elem) : elem,
            }
        ))
        
        temporaryArray.forEach(draggable => {
            draggable.dragButton.addEventListener('pointerdown', startDragging);
        });
        
        return () => { 
            temporaryArray.forEach(draggable => {
                draggable.dragButton.removeEventListener('pointerdown', startDragging);
            });
         };
    }, [containerRef]);

    function startDragging(e){
        console.log("Event", e);
        console.log("Ensuite", e.srcElement.parentNode)

        const parent = e.srcElement.parentNode;
        const parentBox = parent.getBoundingClientRect();

        

        console.log(parentBox)

        parent.style.width = parentBox.width + "px";
        parent.style.height = parentBox.height + "px";
        parent.style.top = parentBox.top + "px";
        parent.style.left = parentBox.left + "px";


        cursorData.current.diffX = e.clientX - parentBox.left;
        cursorData.current.diffY = e.clientY - parentBox.top;

        cursorData.current.movingElem = parent;

        replacingBlock.style.height = parent.offsetHeight ? parent.offsetHeight + "px" : "5rem";

        containerRef.current.insertBefore(replacingBlock,  parent);


        parent.classList.add(styles["grabbed-element"]);

        window.addEventListener("pointermove", onPointerMove);


    }

    function onPointerMove(e){

        console.log("Mouse move")

        cursorData.current.movingElem.style.left = e.clientX + cursorData.current.diffX;
        cursorData.current.movingElem.style.top = e.clientY + cursorData.current.diffY;

    }

    return {
        updateValues: null,
        containerRef: containerRef.current
    }
}



/***
 * 
 * 
 *  De l'autre côté, faire la fonction de update de order (single) et la passer en paramètres
 *  
 *  On pourrait : 
 *  1. Passer un lien vers le state de l'autre côté 
 *  2. Passer une fonction de conversion des éléments
 *  
 * 
 * 
 * 
 * 
 * 
 */