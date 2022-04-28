import React, { useState } from 'react'

//types of fields 
import Input from '../Input/Input'
import Textarea from '../Input/Input'

//Styling
import styles from './FieldMultiplier.module.scss'

/*  

    This component act as a field and return a value to the form component
    The returned value is an array containing all the sub-fields values
    V.P.R 28-04-2022

*/

// Function used to get a unique key based on time when maping the fields
const getCurrentTime = () => {
    const d = new Date();
    return d.getTime();
}



const FieldMultiplier = ({ fieldType, contentType  }) => {

    const [ rows, setRows ] = useState([
        { value: '', isValid = true, name = fieldType + "0" }
    ])


  
    return (

        <div className={`col-12 ${styles["field-multiplier"]}`}>

            rows.map((row) => (

                <div 
                    className={`${styles["field-multiplier__row"]}`}
                    key={fieldType + getCurrentTime()}
                >
                    { fieldType === "Input" &&
                        <Input
                            id={row.name}
                            name={row.name}
                            type={contentType}
                        />
                    }
                    { fieldType === "Textarea" &&
                        <Textarea
                            id={row.name}
                            name={row.name}
                            type={contentType}
                        />
                    }
                </div>
                )
            )
            
            
        </div>

    )
}



export default FieldMultiplier
