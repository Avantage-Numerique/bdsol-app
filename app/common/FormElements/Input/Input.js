import React, {useReducer, useEffect} from 'react'

import { validate } from '../../../utils/validators'

import styles from './Input.module.scss'

//Reducer function to manage the state of the input
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                //if there are validators, then evaluate them and return bool
                isValid: action.validators ? validate(action.val, action.validators) : true
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            };
        }
        default:
            return state;
    }
}

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '', 
        isTouched: false,
        isValid: false
    });

    //Inform the form (parent component) of the value and validity of this input
    const { id, onInput } = props;          
    const { value, isValid } = inputState;   //State of this element
  
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    //Prevent an error message when the input hasn't been touch
    const touchHandler = () => {
        dispatch({ type: 'TOUCH' });
    };

    return (

        <div className={ styles.inputComponent }>
            <label htmlFor={props.id}>
                {props.label}
                <input 
                    className={` ${!inputState.isValid && inputState.isTouched && styles["control--invalid"]}`}
                    id={props.id} 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    onChange={changeHandler} 
                    onBlur={touchHandler}
                /> 
                {!inputState.isValid && inputState.isTouched && 
                    <small>{ props.errorText }</small>
                }
            </label>
        </div>

    );
}

export default Input;