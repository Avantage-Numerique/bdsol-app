import React, { useRef, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

//Hooks
import { useValidation } from '@/src/hooks/useValidation/useValidation';

//Styling
import styles from './RichTextarea.module.scss'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



const RichTextarea = ({name, formTools, ...props}) => {

    //Extract the validator methods and utilities
    const { validate, RequirementsBadges, ValidationErrorMessages } = useValidation( props.validationRules )

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
            props.validationRules ? validate(editor.getText()) : true
        )
    }

    return (

        <div className={`
            ${props.className}
            ${styles["rich-textarea"]}
        `} >

            {props.label &&

                <label htmlFor={name}>    
                    {props.label}
                </label>
            }
            {props.labelNote &&
                <blockquote>
                * Note : {props.labelNote}
                </blockquote>
            }

            <div className={` ${styles["rich-textarea__quill"]} `} > 
                
                {isRendered && <>

                    <div className={`
                        d-flex
                        flex-column
                        p-2
                        form-element
                        form-element--color-validation
                        ${styles["rich-textarea__quill__field"]}
                        ${!currentState.isValid && currentState.isTouched && "control--invalid"}
                    `} >

                        
                        {/************************** 
                                Custom toolbar component including insertStar button and dropdowns
                        ****************************/}
                        <div id={toolbarId.current} className={`
                            ql-toolbar
                            ql-snow
                            shadow-sm
                            form-element--b-radius
                            ${styles["rich-textarea__tool-bar"]}
                        `} >
                            <select className="ql-header" defaultValue="" >
                                <option value="1" >Titre 1</option>
                                <option value="2" >Titre 2</option>
                                <option value="" >Normal</option>
                            </select>

                            <button className="ql-list" value="ordered" tabIndex={-1}/>
                            <button className="ql-list" value="bullet" tabIndex={-1}/>
                            <button className="ql-bold" tabIndex={-1}/>
                            <button className="ql-italic" tabIndex={-1}/>
                            <button className="ql-align" value="" tabIndex={-1}/>
                            <button className="ql-align" value="center" tabIndex={-1}/>
                            <button className="ql-align" value="right" tabIndex={-1}/>

                            <select className="ql-color" defaultValue="" >
                                <option value="#455ae6" />
                                <option value="#4dc4ff" />
                                <option value="#dd5c5c" />
                                <option value="#bbbfd7" />
                                <option value="#d4c87b" />
                                <option value="#7bd485" />
                                <option value="" />
                            </select>
                        </div>

                        <ReactQuill
                            className={` 
                                ${styles["rich-textarea__quill-content"]} 
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

                        {/* Receive extra content like the validation tags */}
                        <RequirementsBadges addUlPadding /> 

                    </div>
             </>}  
                
            </div>

            <div className="validation-error-messages-container">
                    { currentState.isTouched && <ValidationErrorMessages /> }
            </div>

        </div>
       
        
       
    );
}

export default RichTextarea;

