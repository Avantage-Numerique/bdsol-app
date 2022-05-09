import {useReducer, useEffect} from 'react'


//Utils
import { validate } from '../../../utils/validators'

//Styling
import styles from './Textarea.module.scss'



//Reducer function to manage the state of the textarea
const textareaReducer = (state, action) => {
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

const Textarea = props => {

    const [textareaState,dispatch] = useReducer(textareaReducer, {
        value: '', 
        isTouched: false,
        isValid: props.validators ? validate('', props.validators) : true
    });

    //Inform the form (parent component) of the value and validity of this input
    const { name, onInput } = props;          
    const { value, isValid } = textareaState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({type: 'CHANGE', val: event.target.value, validators: props.validators})
    }

    //Prevent an error message when the input hasn't been touch
    const touchHandler = () => {
        dispatch({ type: 'TOUCH' });
    };

    return (

        <div className={` ${styles["TextArea-Component"]}`}>
            <label htmlFor={name}>
                {props.label}
                <textarea 
                    className={` ${!textareaState.isValid && textareaState.isTouched && styles["control--invalid"]}`}
                    name={name ? name : ""}
                    rows={props.rows || 3} 
                    placeholder={props.placeholder} 
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={textareaState.value}
                />
               {!textareaState.isValid && textareaState.isTouched && 
                    <small>{ props.errorText }</small>
                }
            </label>
        </div>
    );
}

export default Textarea;