import React from 'react'
import Link from 'next/link'

//import './Button.scss'  imported in app becose of the next.js limitations

const Button = props => {

    if (props.href) {
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} && ${props.danger && 'button--danger'}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }

    if (props.to){
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} && ${props.danger && 'button--danger'}`}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} && ${props.danger && 'button--danger'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

export default Button