import {useReducer, useEffect, useState, useCallback} from 'react'

import dynamic from 'next/dynamic'

//Utils and dependancies
import { validate } from '../../../utils/validators'

//Styling
import styles from './RichTextarea.module.scss'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



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

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (

    <div id={`${styles["rich-text-tool-bar"]}`}  className={`ql-toolbar ql-snow`}>

      <select className="ql-header" defaultValue="">
            <option value="1">Titre 1</option>
            <option value="2">Titre 2</option>
            <option value="">Normal</option>
      </select>

      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />

      <select className="ql-color" defaultValue="">
            <option value="#455ae6"></option>
            <option value="#4dc4ff"></option>
            <option value="#dd5c5c"></option>
            <option value="#bbbfd7"></option>
            <option value="#d4c87b"></option>
            <option value="#7bd485"></option>
        <option value=""></option>
      </select>

    </div>

  )

const RichTextarea = props => {

    const [textareaState,dispatch] = useReducer(textareaReducer, {
        value: '', 
        isTouched: false,
        isValid: props.validators ? validate('', props.validators) : true
    });

    //Inform the form (parent component) of the value and validity of this input
    const { name, onInput, formState } = props;          
    const { value, isValid } = textareaState;   //State of this element

    useEffect(() => {
        onInput(name, value, isValid)
    }, [name, value, isValid, onInput]);


    const changeHandler = value => {
        dispatch({type: 'CHANGE', val: value, validators: props.validators})
    }

    //Prevent an error message when the input hasn't been touch
    const touchHandler = () => {
        dispatch({ type: 'TOUCH' });
    };
    

    return (

        <div className={` ${styles["rich-textarea"]}`} >

            {props.label &&

                <label htmlFor={name}>    
                    {props.label}
                </label>

            } 

            <div className={` ${styles["rich-textarea__quill"]} `}>  
                <CustomToolbar />  
                <ReactQuill
                    className={` 
                        ${styles["rich-textarea__quill-content"]} 
                        ${!textareaState.isValid && textareaState.isTouched && styles["control--invalid"]}
                    `}
                    onBlur={touchHandler}
                    value={textareaState.value}
                    modules={{toolbar: {
                        container: `#${styles["rich-text-tool-bar"]}`
                    }}}
                    onChange={changeHandler}
                    placeholder={props.placeholder}
                    theme="snow" // pass false to use minimal theme
                />
            </div>

            {!textareaState.isValid && textareaState.isTouched && 
                <small>{ props.errorText }</small>
            }

        </div>
       
        
       
    );
}

export default RichTextarea;

