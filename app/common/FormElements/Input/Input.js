import React, {useReducer, useEffect} from 'react'

//Utils
import { validate } from '../../../utils/validators'

//Styling
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

const Input = ({addRow, removeRow, ...props}) => {

    //Initial state
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '', 
        isTouched: false,
        isValid: props.validators ? validate('', props.validators) : true
    });



    /*
        Inform the form (parent component) of the value and validity of this input
        whenever it changes
    */
    const { name, onInput } = props;          
    const { value, isValid } = inputState;   //State of this element
  
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
        
            <label className={ styles.inputComponent } htmlFor={props.name}>

                {props.label}

                <div className={`col-12 ${styles["inputComponent__field-container"]}`}>

                    <input 
                        className={` ${!inputState.isValid && inputState.isTouched && styles["control--invalid"]}`}
                        name={props.name}
                        id={props.name}
                        type={props.type ? props.type : "text"}
                        placeholder={props.placeholder}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                        autoComplete={props.type === "password" ? "on" : undefined}
                    /> 

                    { 
                        addRow &&
                        <button onClick={addRow} 
                                className={`text-white bg-blue2`}
                                type="button"
                        >   &#43;
                        </button>
                    }
                    {
                        removeRow &&
                        <button  
                            onClick={removeRow} 
                            className={`text-white bg-danger`}
                            type="button"
                        >
                                &#215;
                        </button>
                    }

                </div>
                
                {!inputState.isValid && inputState.isTouched && 
                    <small>{ props.errorText }</small>
                }

            </label>

    ); 
}

export default Input;