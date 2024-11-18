/*

    Custom hook for the forms

*/


import {useCallback, useReducer} from 'react';

const formReducer = (state, action) => {

    switch (action.type) {

        case 'INPUT_CHANGE':

            let formIsValid = true;

            //Loop through the state inputs
            for (const inputId in state.inputs) {

                //If a corresponding element doesn't exist, than break this iteration
                //and go to the next one. Otherwise, execute the next "if" statement
                if (!state.inputs[inputId]) {
                    continue;
                }

                //Evaluate the validity of the form
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        ...state.inputs[action.inputId],
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };

        case 'CLEAR_DATA':

            //Reset everything
            return {
                ...state,
                inputs: {
                    ...action.initialValues
                },
                isValid: action.initialFormValidity
            };

        case 'TOUCH': {
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        ...state.inputs[action.inputId],
                        isTouched: true
                    }
                },
                hasAnyInputBeenTouched: true
            };
        }

        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };

        case 'UPDATE_MANY_FIELDS':
            //Receives an object of this shape : {[fieldName]: [fieldNewValue], [fieldName]: [fieldNewValue]}
            //create a new object to edit
            let newState = {...state};
            //Loop through the keys of the object modifiedFields
            for (const key in action.modifiedFields) {
                if (action.modifiedFields.hasOwnProperty(key) && newState.inputs.hasOwnProperty(key)) {
                    newState.inputs[key].value = action.modifiedFields[key];
                }
            }
            return newState;

        default:
            return state;
    }

};

export const useForm = (initialInputs) => {

    /* Global formstate => contains the value of all the inputs in the field */
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: false,
        hasAnyInputBeenTouched: false
    });

    //Note that the inputid is actually the "name" of the input
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const inputTouched = useCallback((id) => {
        dispatch({
            type: 'TOUCH',
            inputId: id
        });
    }, []);

    /*
    const setFormData = useCallback((inputData, formValidity) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity
      });
    }, []);
    */

    const clearFormData = useCallback(() => {
        dispatch({
            type: 'CLEAR_DATA',
            initialValues: initialInputs,
            initialValidity: false
        });
    }, []);

    const updateManyFields = useCallback(modificationsObj => {
        /**
         * Expect to receive an object of this shape
        * {[fieldName]: [fieldNewValue], [fieldName]: [fieldNewValue]}
        */
        dispatch({
            type: 'UPDATE_MANY_FIELDS',
            modifiedFields: modificationsObj
        });
    }, []);

    /* Regroup the form utils needed for the inputs */
    const formTools = {
        formState: formState,
        inputHandler: inputHandler,
        inputTouched: inputTouched,
        clearFormData: clearFormData,
        updateManyFields: updateManyFields
    }

    return [formState, formTools, clearFormData, updateManyFields];
};
