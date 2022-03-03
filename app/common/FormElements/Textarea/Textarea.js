import React from 'react'

import styles from './Textarea.module.scss'

//Reducer function to manage the state of the textarea
const textareaReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true    //hardcoded for now
            };
        default:
            return state;
    }
}

const Textarea = props => {

    const [textareaState, dispatch] = useReducer(textareaReducer, {value: '', isValid: false});

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value})
    }

    return (

        <div>
            <label htmlFor={props.id}>
                {props.label}
                <textarea 
                    id={props.id} 
                    rows={props.rows || 3} 
                    placeholder={props.placeholder} 
                    onChange={changeHandler}
                    value={textareaState.value}
                />
                {!textareaState.isValid && <p>{ props.errorText }</p>}
            </label>
        </div>
    );
}

export default Textarea;