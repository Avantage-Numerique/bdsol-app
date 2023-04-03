import {useState, useEffect} from 'react';
import React from 'react';

//Hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//Components
import Button from "@/FormElements/Button/Button"

//Context
import {useAuth} from '@/auth/context/auth-context';
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";


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

        console.log("SUB FORM INIT STRUCTURE", formInitStructure)

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


const Repeater = props => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    /*
        List of props 
    */
    const {
        children,               //Elements to repeat
        formInitStructure,
        mainFormTools,
        name,
        initValues,             //Expected to be an array
        //formReturnStructure
    } = props;

    const {
        formState,
        inputHandler
    } = mainFormTools;

    console.log("FORM INIT STRUCTURE AT THE RENDERING", formInitStructure)


    
    //Value of the current state : {value: Array(0), isValid: true}
    //The main form is going to look out for the isValid property to let the user know if the state can be submited or not.

    //State to manage the values of every iterations of the repeater
    const [iterations, setIterations] = useState(addInitValuesToState(initValues, formInitStructure));

    useEffect(() => {
        console.log("FUNCTION RÉINITIALISÉE");
    }, [])

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
            if(!ite.isValid)
                isValid = false;
            /*
                GOTTA FIXE SOMETHING BEFORE ACTIVATING THIS FUNCTION

            //Shape the entered values
            let returnShape = {...formReturnStructure}
            //Create an array of keys to exame based on the inital structure
            const arrayOfNames = Object.keys(formInitStructure);
            //Loop through it
            arrayOfNames.forEach(fieldName => {
                //replace the name by the value to return
                returnShape[getKeyByValue(returnShape, fieldName)] = ite.value[fieldName] ? ite.value[fieldName].value : {};
            })
            //Add the proper status
            returnShape.status = ite.status;
            //Add the result to the return array
            value.push(returnShape);
            */
        })

        value = Object.values(iterations);

        inputHandler(name, value, isValid)

    }, [iterations])


    /*************
     * 
     * Functions
     * 
     ****/
    function addInitValuesToState( initValues ){
        //Prevent the function from executing if there is no initValues
        if(!initValues || initValues.length == 0)
            return {};

        //It is expected that initValues is an array of objects containing the same keywords has present in the formInitStructure
        //1. Get an array containing all the keys to fill
        const arrayOfKeyWords = Object.keys(formInitStructure);

        //2. Initialize the return object that is going to fill the iterations state at the first rendering
        let startIterationsObj = {};

        //3. Loop in the initialValues passed has props to fill the startIterationsObj
        initValues.forEach((elem, i) => {
            console.log("START", i)
            console.log("ELEM", elem)
            console.log("START ITERATION OBJ AT THE BEGENNING", startIterationsObj)
            //Initialize the value that are going to compose the return object
            let current_status = elem.status ? elem.status : undefined;
            let current_id = elem._id ? elem._id : elem.id ? elem.id : undefined;
            let formInitStructureWithValues = {...formInitStructure};  //Same shape but going to be filled with the values
            //For the last one, lets loop into the array of key words to search for a fit

            arrayOfKeyWords.forEach(keyWord => {
                if(elem[keyWord] != "" && elem[keyWord] != null && elem[keyWord] != undefined && elem[keyWord].length != 0){
                    formInitStructureWithValues[keyWord].value = elem[keyWord];
                }
            })

            console.log("formInitStructureWithValues", formInitStructureWithValues)
            //New lets build the formObject with thoses values
            const newIterationObj = createIteration( current_status, current_id, formInitStructureWithValues );
            console.log("new it object", newIterationObj)
            //Update the return object
            startIterationsObj = {...startIterationsObj, ...newIterationObj};
            console.log("START ITERATION OBJ AT THE END", startIterationsObj)
            console.log("END", i)

        });
        //4. Finally, return the value
        return startIterationsObj;
    };

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
        const newId = Math.floor((Math.random() * 1000000) + 1);
        //Make sure it doesn't exist already into the state. Also accept is iteration is not defined yet
        if(!iterations || !Object.keys(iterations).some(key => key == newId))
            return newId;
        //If the id isn't unique, than call the function again
        generateUniqueId();
    }

    //Create a new Id and make sure its not gonna be in double
    function createIteration( status, _id, initFormStructureWithValues ){
        //Create an ID
        const key = generateUniqueId();
        //Build the object
        const obj = {
            [key]: {
                key: key,
                order: 1,  //not used for now
                value: {},
                status: status ? status : getDefaultCreateEntityStatus(auth.user),
                initFormStructureWithValues: initFormStructureWithValues ? initFormStructureWithValues : null,
                _id: _id ? _id : null,
                isValid: true
            }
        }
        //Return it
        return obj;
    }

    return (
        <>  
            <section>
               {iterations && Object.values(iterations).map(iteration => (
                    <RepeaterSingleIteration 
                        key={iteration.key} 
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitStructure={iteration.initFormStructureWithValues ? iteration.initFormStructureWithValues : formInitStructure}
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

export default Repeater