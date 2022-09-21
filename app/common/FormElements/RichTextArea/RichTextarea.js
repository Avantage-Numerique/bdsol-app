import React, { useRef, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

//Utils and dependancies
import { validate } from '../../../utils/validators'

//Styling
import styles from './RichTextarea.module.scss'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



const RichTextarea = ({name, formTools, ...props}) => {

    //Create a unique ID to link the custom tool bar to the quill element. 
    //In a useRef because it must not be affected by component rerendering
    const toolbarId = useRef(`rich-text-tool-bar-${Math.floor(Math.random() * 10000000)}`)

    //Fixes a bug by waiting for the component to be rendered before charging quill
    const [isRendered, setIsRendered] = useState(false)

    //Tell quill that the component is rendered
    useEffect(() => {
        if(!isRendered)
            setIsRendered(true)
    }, [])

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

        <div className={`${styles["rich-textarea"]}`} >

            {props.label &&

                <label htmlFor={name}>    
                    {props.label}
                </label>

            } 

            <div className={` ${styles["rich-textarea__quill"]} `}> 
                
                {isRendered && <>

                    {/************************** 
                            Custom toolbar component including insertStar button and dropdowns
                    ****************************/}
                    <div id={toolbarId.current} className={`ql-toolbar ql-snow`}>
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
    
                    <ReactQuill
                        className={` 
                            ${styles["rich-textarea__quill-content"]} 
                            ${!currentState.isValid && currentState.isTouched && styles["control--invalid"]}
                        `}
                        onBlur={() => inputTouched(name)}
                        value={currentState ? currentState.value : null}
                        modules={{toolbar: {
                            container: `#${toolbarId.current}`
                        }}}
                        onChange={updateValue}
                        placeholder={props.placeholder}
                        theme="snow" 
                    />
             </>}  
                
            </div>

            {!currentState.isValid && currentState.isTouched && 
                <small>{ props.errorText }</small>
            }

        </div>
       
        
       
    );
}

export default RichTextarea;

