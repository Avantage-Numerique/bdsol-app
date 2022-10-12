import { useState, useEffect} from 'react'
import Link from 'next/link'

//scss styling
import styles from './Button.module.scss' 


const getCurrentTime = () => {
    const newTime = new Date();
    return newTime.getTime()
}

const Ripple = ({ clear })  => {

    useEffect(() => {
        setTimeout(() => {
            clear()

        }, 2000)
    }, [])

    return (
        <div className={styles.ripple}>

        </div>
    )

}


const Button = ({ rippleEffect, ...props }) => {

    let bootstrapClasses = props.listItem ? "" : "btn ";
    let bsPrefix = props.listItem ? "list-group-item-" : "btn-";

    const [rippleList, setRippleList] = useState([])

    const addRipple = () => {

        setRippleList([
            ...rippleList,
            {id: "ripple_" + getCurrentTime()}
        ])
    
    }

    {/*

        There are 2 types of buttons 
            - links => href
            - Other type of triggered action 
    
    */}

    {
        /*
            Convert design properties to bootstrap classes
        */
        let bootstrapColor = props.color ? props.color : "primary";

        let bootstrapOutline = props.outline ? "outline-" : "";
        
        bootstrapClasses += `${bsPrefix}${bootstrapOutline}${bootstrapColor}`;

        if(props.size){
            switch (props.size) {
                case "slim":
                    bootstrapClasses += " btn-slim";
                    break;
                case "small":
                    bootstrapClasses += " btn-sm";
                    break;
                default:
                    bootstrapClasses += "";
                    break;
            }
        }
    }
    
    if(props.listItem){
        bootstrapClasses += " list-group-item list-group-item-action";
    }

    if(props.classes){
        bootstrapClasses += " " + props.classes;
    }

    {/* If the button is an external link */}
    if (props.href) {

        return (
            <Link href={props.href} >
                <button 
                    className={`${bootstrapClasses}`}
                    disabled={props.disabled}
                >

                    {props.children}

                </button>
            </Link>
        );

    }

    {/* If the button is not a link, then it calls an action with onClick */}
    return (
        <button
            className={`${bootstrapClasses}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >

            {/* Animated circle */}
            
            {rippleEffect && rippleList.map(ripple => (
                <Ripple
                    key={ripple.id}
                    className={`
                        ${rippleEffect && styles.ripple}
                    `}
                    clear={() => setRippleList(
                        prevState => {prevState.filter(i => i.id !== ripple.id)}
                        )}
                />
            ))}

            {/* Button text */}
            {props.children}

        </button>
    );
}

export default Button