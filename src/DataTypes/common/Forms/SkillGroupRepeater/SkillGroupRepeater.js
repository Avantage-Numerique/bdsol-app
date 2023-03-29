import {useState, useEffect, useRef, useCallback} from 'react';
import React from 'react';

import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import Button from "@/FormElements/Button/Button"


const iterateOverChildren = (children, formInitStructure, formTools, deleteIteration) => {

    return React.Children.map((children), (child) => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!React.isValidElement(child)) return child;
      //If this child has a name prop, and if the value is equal to one of the values declared for the formState, then it means it is a field and require a formtool
      const newProps = Object.keys(formInitStructure).some(key => key === child.props?.name) ? {'formTools': formTools} : {};
      const deleteButton = child.props?.repeaterDeleteElem ? {'onClick': () => deleteIteration()} : {};

      return React.cloneElement(child, {
        ...child.props,
        ...newProps,
        ...deleteButton,
        // you can alse read child original className by child.props.className
        children: iterateOverChildren(child.props.children, formInitStructure, formTools, deleteIteration)})
    })
};

const RepeaterSingleIteration = ({children, formInitStructure, iterationKey, updateIterationValue, deleteIterationByKey}) => {

        //Create its own sub form state
        const {formState, formTools} = useFormUtils(formInitStructure);

        useEffect(() => {
            // update the value
            updateIterationValue(iterationKey, formState.inputs, formState.isValid);
         }, [formState])

        return iterateOverChildren(children, formInitStructure, formTools, deleteIterationByKey);
}

//Util function to get a key in an object based on its value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


const SkillGroupRepeater = props => {

    /*
        List of props 
    */
    const {
        children,               //Elements to repeat
        formInitStructure,
        mainFormTools,
        name,
        formReturnStructure
    } = props;

    const {
        formState,
        inputHandler
    } = mainFormTools;

    //const currentState = formState.inputs[name];
    //Value of the current state : {value: Array(0), isValid: true}
    //The main form is going to look out for the isValid property to let the user know if the state can be submited or not.

    //State to manage the values of every iterations of the repeater
    const [iterations, setIterations] = useState(createIteration());

    //Whenever the iteration state change, apply the changes on the main state
    useEffect(() => {

        //Data to return in the main form state
        let isValid = true
        let value = [];

        //Convert the iterations elements into an array 
        const arrayOfIterationsValues = iterations ? Object.values(iterations) : [];
        //Loop through it to look at every children
        arrayOfIterationsValues.forEach(ite => {
            //If only one isn't valid, the hole feild becomes invalid
            if(!ite.value.isValid)
                isValid = false;
            //Shape the entered values
            let returnShape = {...formReturnStructure}
            //Create an array of keys to exame based on the inital structure
            const arrayOfNames = Object.keys(formInitStructure);
            //Loop through it
            arrayOfNames.forEach(fieldName => {
                //replace the name by the value to return
                returnShape[getKeyByValue(returnShape, fieldName)] = ite.value[fieldName] ? ite.value[fieldName].value : {};
            })
            //Add the result to the return array
            value.push(returnShape);
        })

        inputHandler(name, value, isValid)

    }, [iterations])

    /*************
     * 
     * Functions
     * 
     ****/
    function updateIterationValue(key, value, isValid) {
        setIterations({
            ...iterations,
            [key]: {
                ...iterations[key],
                value: value,
                isValid: isValid
            }
        })
    }


    function addNewIteration(){
        const newValue = createIteration();
        setIterations({
            ...iterations,
            ...newValue
        })
    }

    const deleteIterationByKey = ( key ) => {
        let updatedIterations = {...iterations};
        delete updatedIterations[ key ];
        setIterations(updatedIterations);
    }

    //Create a new Id and make sure its not gonna be in double
    function generateUniqueId(){
        //Create a new Id
        const newId = Math.floor((Math.random() * 100000) + 1);
        //Make sure it doesn't exist already into the state. Also accept is iteration is not defined yet
        if(!iterations || !Object.keys(iterations).some(key => key == newId))
            return newId;
        //If the id isn't unique, than call the function again
        generateUniqueId();
    }

    //Create a new Id and make sure its not gonna be in double
    function createIteration(){
        //Create an ID
        const key = generateUniqueId();
        //Build the object
        const obj = {
            [key]: {
                key: key,
                order: 1,  //not used for now
                value: {},
                isValid: true
            }
        }
        //Return it
        return obj;
    }

    return (
        <>  
            <section>
               { iterations && Object.values(iterations).map(iteration => (
                    <RepeaterSingleIteration 
                        key={iteration.key} 
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitStructure={formInitStructure}
                        updateIterationValue={updateIterationValue}
                    >
                        {children}
                    </RepeaterSingleIteration>
               ))}                   
            </section>
            <div className="d-flex justify-content-end">
                <Button type="button" onClick={addNewIteration} className="m-0">Ajouter</Button>
            </div>
        </>
    )
}

export default SkillGroupRepeater