import React, { useRef, useEffect, useState } from 'react';

//Styling
import styles from './PopOver.module.scss'

const generateClasses = classProp => {

    let classes = "";

    switch(classProp){
        case("left-top"):
            classes = styles["position-left"] + " " + styles["position-top"];
            break;
        case("left-bottom"):
            classes = styles["position-left"] + " " + styles["position-bottom"];
            break;
        case("right-top"):
            classes = styles["position-right"] + " " + styles["position-top"];
            break;
        case("right-bottom"):
            classes = styles["position-right"] + " " + styles["position-bottom"];
            break;
        case("over-center"):
            classes = styles["position-center"] + " " + styles["position-over"];
            break;
        case("under-center"):
            classes = styles["position-center"] + " " + styles["position-under"];
            break;
    }

    return classes;
}

const PopOver = props => {

    //Extract the props
    const {
        header, 
        body,
        positionClass,          //For the options, see the funtion over 
        closingFunction
    } = props;

    //Reference to the modal element to be able to call the native javascript functions
    const componentRef = useRef()

    //Display the component with its native function when the component is redendered
    useEffect(() => {
        if(!componentRef.current.hasAttribute("open"))
            componentRef.current.show()
    }, [])

    return (
            <dialog 
                ref={componentRef}
                className={`
                    border-0
                    ${generateClasses(positionClass)}
                    ${styles["pop-over"]}
                `}
            >
                <header className="d-flex justify-content-between">
                    <h4 className="m-0">
                        { header }
                    </h4>
                    <button 
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
                <div className={`${styles["pointing-corner"]}`}></div>
            </dialog>
    )
}

export default PopOver

