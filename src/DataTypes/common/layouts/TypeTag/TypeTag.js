import React from "react";

//Styling 
import styles from './TypeTag.module.scss';

/**
 *
 * @param props.type {string} Label giving the type of entity
 * @param props.icon {string} Path to the location of the icon in the app
 * @param props.iconAlt {string} Short text describing the icon
 * @return {JSX.Element}
 * 
 */
const TypeTag = props => {

    if(props.type)
        return (
            <div className={`${styles["type-tag"]}`}>
                <div className={`${styles["tag"]}`}>
                    {props.icon &&
                        <img src={props.icon} alt={props.iconAlt} />
                    }
                </div>
                <div className={`${styles["label"]}`}>
                    <p className="m-0">{props.type}</p>
                </div>
            </div>
        )
}

export default TypeTag