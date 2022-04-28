import {useReducer, useEffect} from 'react'

import { useQuill } from 'react-quilljs';

import { validate } from '../../../utils/validators'

import styles from './RichTextarea.module.scss'
import 'quill/dist/quill.snow.css'; // Add css for snow theme

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

const RichTextarea = props => {

    const { quill, quillRef } = useQuill();

    const [textareaState,dispatch] = useReducer(textareaReducer, {
        value: '', 
        isTouched: false,
        isValid: false
    });

    //Inform the form (parent component) of the value and validity of this input
    const { id, onInput } = props;          
    const { value, isValid } = textareaState;   //State of this element

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    //Watch for modifications in the text and call the dispatch function
    useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            //console.log('Text change!');
            //console.log(quill.getText()); // Get text only
            //console.log(quill.getContents()); // Get delta contents
            //console.log(quill.root.innerHTML); // Get innerHTML using quill
            //console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef

            changeHandler(quill.root.innerHTML)
          });
        }
      }, [quill]);

    const changeHandler = value => {
        dispatch({type: 'CHANGE', val: value, validators: props.validators})
    }

    //Prevent an error message when the input hasn't been touch
    const touchHandler = () => {
        dispatch({ type: 'TOUCH' });
    };

    return (

            
        <div className={` ${styles["rich-textarea"]}`}>

            { props.label &&
                <label>{props.label}</label>
            }
            
            <div className={` ${styles["rich-textarea__quill-container"]}`}>

                {/* This container receives the text entered by the user */}
                <div 

                    id={props.id} 
                    name={props.name ? props.name : ""}
                    onBlur={touchHandler}
                    className={` 
                        ${styles["rich-textarea__quill-content"]} 
                        ${!textareaState.isValid && textareaState.isTouched && styles["control--invalid"]}
                    `} 
                    ref={quillRef} 
                />
                {!textareaState.isValid && textareaState.isTouched && 
                    <small>{ props.errorText }</small>
                }
            </div>

       
        </div>
    );
}

export default RichTextarea;