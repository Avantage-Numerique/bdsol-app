import {useReducer, useEffect, useState, useCallback} from 'react'

import dynamic from 'next/dynamic'

//Utils and dependancies
import { validate } from '../../../utils/validators'

//Styling
import styles from './RichTextarea.module.scss'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


/********************* 
    Custom function to evaluate if an HTML string is empty of not
********************
const isHTMLStringNoEmpty = (str) => {
	
    //Value to return (initially false)
    let notEmpty = false;
    let currentlyInATag = false;
    
    for (let i in str) {
    
    	if(str[i] === "<" || str[i] === ">"){
        	
            //Annonce if we are in a tag of not
            currentlyInATag = str[i] === "<" ? true : false

        } else {
        	//There is a value and we are not inside a tag so the html isn't empty
            if(!currentlyInATag)
            	notEmpty = true;
                //break
        }
        
        //Conditions to stop the loop early
        //1. The first char is not a "<" so its not supposed to be html
        //2. The variable notEmpty isn't negative
    	if((i == 0 && str[i] !== "<") || notEmpty === true)
        	break;
    }
	
    return notEmpty
}
*/

/************************** 
        Custom toolbar component including insertStar button and dropdowns
****************************/
const CustomToolbar = () => (

    <div id={`${styles["rich-text-tool-bar"]}`} className={`ql-toolbar ql-snow`}>

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

const RichTextarea = ({name, formTools, ...props}) => {

    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    const currentState = formState.inputs[name];

    const updateValue = (value, delta, source, editor) => {
        inputHandler(
            name,
            value,
            props.validators ? validate(editor.getText(), props.validators) : true
        )
    }

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
                        ${!currentState.isValid && currentState.isTouched && styles["control--invalid"]}
                    `}
                    onBlur={() => inputTouched(name)}
                    value={currentState ? currentState.value : null}
                    modules={{toolbar: {
                        container: `#${styles["rich-text-tool-bar"]}`
                    }}}
                    onChange={updateValue}
                    placeholder={props.placeholder}
                    theme="snow" 
                />
            </div>

            {!currentState.isValid && currentState.isTouched && 
                <small>{ props.errorText }</small>
            }

        </div>
       
        
       
    );
}

export default RichTextarea;

