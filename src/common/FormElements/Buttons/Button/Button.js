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

    let bootstrapClasses = "btn ";

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
            Convert design to bootstrap classes
        */
        let bootstrapColor = "btn-primary";

        if(props.color){
            switch (props.color) {
                case "primary":
                    bootstrapColor = "btn-primary";
                    break;
                
                default:
                    bootstrapColor = "btn-primary";
                    break;
            }
        }
        bootstrapClasses += bootstrapColor;

        if(props.design){
            switch (props.design) {
                case "slim":
                    bootstrapClasses += " btn-sm";
                    break;
                
                default:
                    bootstrapClasses += "";
                    break;
            }
        }
    }


    {/* If the button is an external link */}
    if (props.href) {

        return (
            <Link href={props.href} >
                <button 
                    className={`
                        ${styles.button}
                        ${props.color ? styles[props.color] : ""}
                        ${props.reverse ? styles['button--reverse'] : ""}
                        ${props.small ? styles['button--small'] : ""}
                        ${props.big ? styles['button--big'] : ""}
                        ${props.slim ? styles['button--slim'] : ""}
                        ${props.fat ? styles['button--fat'] : ""}
                        ${bootstrapClasses}
                `}  
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
            className={`
                ${styles.button} 
                ${props.color ? styles[props.color] : ""}
                ${props.reverse ? styles['button--reverse'] : ""}
                ${props.small ? styles['button--small'] : ""}
                ${props.big ? styles['button--big'] : ""}
                ${props.slim ? styles['button--slim'] : ""}
                ${props.fat ? styles['button--fat'] : ""}
                ${bootstrapClasses}
            `}
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