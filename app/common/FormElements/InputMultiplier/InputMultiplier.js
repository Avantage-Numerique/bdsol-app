import React, { useState, useEffect, useCallback, useReducer } from 'react'

//types of fields 
import Input from '../Input/Input'

//Styling
import styles from './InputMultiplier.module.scss'

/*  

    This component act as a field and return a value to the form component
    The returned value is an array containing all the sub-fields values
    V.P.R 28-04-2022

*/

//Returns a bool telling if all the objects in this array have a properti "isValid" set to true
const fieldsValidity = ( objectsArray ) => {

    let globalValidity = true;

    //Loop through the elements
    objectsArray.forEach(obj => {
        if(!obj.isValid) globalValidity = false
    });

    return globalValidity
}



const InputMultiplier = ({ label, type, name, onInput, validators, errorText }) => {

    
    const [ rows, setRows ] = useState([{ 
        value: '', 
        isValid: true, 
        name: name + "-" + "0" 
    },
    { 
        value: '', 
        isValid: true, 
        name: name + "-" + "1" 
    }])


    //Send the information to the parent component
    useEffect(() => {
        console.log(rows)
        onInput(
            name,                                                     //Name of the multiplier field
            rows.map(({ value }) => value),                           //Array of values
            fieldsValidity(rows)                                      //Global validity of every fields
        )

    }, [name, rows]);

    const inputHandler = (name, value, isValid) => {

        //Create a new array that is going to be edited with the new data
        const newInputArray = [...rows]

        //Search for the object with the same name than the one passed in parameters
        newInputArray.find((elem, i) => {

            //If it's a match, then change the values with the new ones
            if(elem.name === name) {

                newInputArray[i] ={
                    value: value, 
                    isValid: isValid, 
                    name: name
                }
            } 
        })

        //Update the state only if the new array doesn't contain the same values then the previous one
        if(JSON.stringify(rows) !== JSON.stringify(newInputArray)) setRows(newInputArray)

    }

    //Remove a sepecefic row from the state (identified by its name)
    const removeRow = ( name ) => {
        const newState = rows.filter(row => row.name !== name);
        setRows(newState);
    }

    //Add a new row at the end of the state
    const addRow = () => {
        setRows(prevState => [
            ...prevState,
            {   
                value: '', 
                isValid: true, 
                name: name + "-" + (parseInt(prevState[prevState.length - 1].name.split("-")[1]) + 1)
            }
        ])
    }

  
    return (

           <label htmlFor={name} className={`col-12 ${styles["input-multiplier"]}`}>
               
               {label}

                { rows.map((row, i, arr) => (

                        <div 
                            className={`col-12 ${styles["input-multiplier__row"]}`}
                            key={row.name}
                        > 

                            <div className={styles["input-multiplier__input-container"]}>
                                
                                <Input
                                    name={row.name}
                                    type={type}
                                    validators={validators}
                                    errorText={errorText}
                                    onInput={inputHandler}
                                    removeRow={arr.length - 1 === i ? false : () => removeRow(row.name)}
                                    addRow={arr.length - 1 === i ? () => addRow() : false }
                                />
                                
                            </div>
                        
                        </div>

                    )) }

            </label>
            
    )
}



export default InputMultiplier
