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
            console.log("Bonjour")
            clear()

        }, 2000)
    }, [])

    return (
        <div className={styles.ripple}>

        </div>
    )

}


const Button = ({ rippleEffect, ...props }) => { 

    const [rippleList, setRippleList] = useState([])

    const addRipple = () => {

        setRippleList([
            ...rippleList,
            {id: "ripple_" + getCurrentTime()}
        ])
    
    }


    {/*

        There are three types of buttons 
            - External links => href
            - Internal links => to
            - Other type of triggered action 
    
    */}


    {/* If the button is an external link */}
    if (props.href) {

        return (
            <a
                className={`
                    ${styles.button} 
                    ${styles['button--' + (props.size || 'default')]} 
                    ${props.inverse && styles['button--inverse']}
                    ${props.danger && styles['button--danger']}
                `}
                href={props.href}
            >

                {props.children}

            </a>
        );

    }

    

    {/* If the button is an internal link */}
    if (props.to){
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`
                    ${styles.button} 
                    ${styles['button--' + (props.size || 'default')]} 
                    ${props.inverse && styles['button--inverse']}
                    ${props.danger && styles['button--danger']}
                `}
            >

                {props.children}

            </Link>
        );
    }


    {/* If the button is not a link, then it calls an action with onClick */}
    return (
        <button
            className={`
                ${styles.button} 
                ${styles['button--' + (props.size || 'default')]}
                ${props.inverse && styles['button--inverse']}
                ${props.danger && styles['button--danger']}
            `}
            type={props.type}
            onClick={() => {
                props.onClick()
              //  addRipple()
            }}
            disabled={props.disabled}
        >

            {/* Animated circle 
            
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
            */}
            

            {/* Button text */}
            {props.children}

        </button>
    );
}

export default Button