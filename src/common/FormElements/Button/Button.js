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


    let classList = [];
    let classesString;

    // In case of using list-group-item Bootstrap feature
    //let bsPrefix = props.listItem ? "list-group-item-" : "btn-";
    let bsPrefix = "btn-";

    const [rippleList, setRippleList] = useState([]);

    /*const addRipple = () => {

        setRippleList([
            ...rippleList,
            {id: "ripple_" + getCurrentTime()}
        ])
    
    }*/

    {/*

        There are 2 types of buttons 
            - links => href
            - Other type of triggered action 
    
    */}

    {
        /*
            Convert design properties to bootstrap classes
        */

        classList.push("btn");

        let bootstrapColor = props.color ? props.color : "primary";

        if(props.outline){
            //const outlineLength = props.outline.length > 0 ? props.outline.length : 0;//I don't know what it is used for.
            //classList.push(`btn-custom-outline-${props.color}`);
            classList.push(`btn-outline-${props.outline}`);
        } else {
            classList.push(`${bsPrefix}${bootstrapColor}`);
        }

        if(props.size){
            switch (props.size) {
                case "reg-100":
                    classList.push('w-100');
                    break;
                case "large-100":
                    classList.push('btn-lg');
                    classList.push('w-100');
                    break;
                case "large":
                    classList.push('btn-lg');
                    break;
                case "slim":
                    classList.push('btn-slim');
                    break;
                case "slim-100":
                    classList.push('btn-slim');
                    classList.push('w-100');
                    break;
                case "small":
                    classList.push('btn-sm');
                    break;
                default:
                    break;
            }
        }
    }
    
    // In case of using list-group-item Bootstrap feature
    /*
    if(props.listItem){
        classList.push('list-group-item');
        classList.push('list-group-item-action');
    }
    */

    if(props.classes){
        classList.push(props.classes);
    }

    classesString = classList.join(' ');

    {/* If the button is an external link */}
    if (props.href && props.external) {
        return (
            <a href={props.href}
               className={`${classesString}${(props.disabled ? ' disabled': '')}`}
               target={"_blank"}>
                {props.children}
            </a>
        );
    }

    if (props.href) {

        return (
            <Link href={props.href} >
                <button 
                    className={`${classesString}`}
                    disabled={props.disabled}>
                    {props.children}
                </button>
            </Link>
        );
    }

    {/* If the button is not a link, then it calls an action with onClick */}
    return (
        <button
            className={`${classesString}`}
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