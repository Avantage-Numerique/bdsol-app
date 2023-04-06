import {useState, useEffect} from 'react';
import React from 'react';

//Hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//Components
import Button from "@/FormElements/Button/Button"

//Context
import {useAuth} from '@/auth/context/auth-context';
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//Recursive function to create the children with the proper values
const iterateOverChildren = (children, formInitSubStructure, formTools, deleteIteration) => {
    return React.Children.map((children), (child) => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!React.isValidElement(child)) return child;

      //If this child has a name prop, and if the value is equal to one of the values declared for the formState, then it means it is a field and require a formtool
      const newProps = Object.keys(formInitSubStructure).some(key => key === child.props?.name) ? {'formTools': formTools} : {};
      const deleteButton = child.props?.repeaterDeleteElem ? {'onClick': () => deleteIteration()} : {};

      return React.cloneElement(child, {
        ...child.props,
        ...newProps,
        ...deleteButton,
        // you can alse read child original className by child.props.className
        children: iterateOverChildren(child.props.children, formInitSubStructure, formTools, deleteIteration)})
    })
};

//Component generated for each child. The reason we need this component is that we need to have a form state for every child
const RepeaterSingleIteration = ({children, formInitSubStructure, iterationKey, updateIterationValue, deleteIterationByKey}) => {
        //Create its own sub form state
        const {formState, formTools} = useFormUtils(formInitSubStructure);
        // update the value
        useEffect(() => {
            updateIterationValue(iterationKey, formState.inputs, formState.isValid)
        }, [formState])
        //Return the children with the recursive function
        return iterateOverChildren(children, formInitSubStructure, formTools, deleteIterationByKey);
}

const Repeater = props => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    /* List of props */
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
    
    //Value of the current state : {value: Array(0), isValid: true}
    //The main form is going to look out for the isValid property to let the user know if the state can be submited or not.

    //State to manage the values of every iterations of the repeater
    const [iterations, setIterations] = useState(addInitValuesToState(initValues));
    //Gives us access to the values of the main state in the shape of an array. And since it is sorted, we use it to display the elements
    const sortedIterationsArray = iterations ? Object.values(iterations).sort((a, b) => (a.order > b.order) ? 1 : -1) : [];

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
                TO BE FINISHED LATER
                Function to activate a prop value that tell which shape to use to return the data

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

        /*   
            Expected shape of the initValues
            {occupation: 'Comédien', skills: Array(2), status: {…}, _id: '6424700e74e06285c8139225'}
            {occupation: 'Petit prince', skills: Array(4), status: {…}, _id: '6424700e74e06285c8139227'}
        */
        //Prevent the function from executing if there is no initValues
        if(initValues && Array.isArray(initValues) && initValues.length > 0) {
            //It is expected that initValues is an array of objects containing the same keywords has present in the formInitStructure
            //1. Get an array containing all the keys to fill
            const arrayOfKeyWords = Object.keys(formInitStructure);
            //2. Initialize the return object that is going to fill the iterations state at the first rendering
            let startIterationsObj = {};
            //3. Loop in the initialValues passed has props to fill the startIterationsObj
            initValues.forEach((elem, i) => {
                //Initialize the value that are going to compose the return object
                let current_status = elem.status ? elem.status : undefined;
                let current_id = elem._id ? elem._id : elem.id ? elem.id : undefined;
                let formInitStructureWithValues = {};  //Same shape but going to be filled with the values
                //For the last one, lets loop into the array of key words to search for a fit
                arrayOfKeyWords.forEach(keyWord => {
                        formInitStructureWithValues[keyWord] = {
                            value: elem[keyWord],
                            isValid: true
                        }
                })
                //New lets build the formObject with thoses values
                const newIterationObj = createIteration( current_status, current_id, formInitStructureWithValues, ++i);
                //Update the return object
                startIterationsObj = {...startIterationsObj, ...newIterationObj};
            });
            //4. Finally, return the value
            return startIterationsObj;
        }
        //Else return an empty object
        return {};
            
    };

    function updateIterationValue(key, value, isValid) {
        //Previous is important! Otherwise, it doesn't update properly
        setIterations(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                value: value,
                isValid: isValid
            }
        }))
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
    function createIteration( status, _id, initFormStructureWithValues, orderNumber=null ){
        //Create an ID
        const key = generateUniqueId();
        //Iterations array
        const iterationsArray = iterations ? Object.values(iterations) : [];
        //Build the object
        const obj = {
            [key]: {
                key: key,
                order: orderNumber || (Math.max(...iterationsArray.map(o => o.order)) + 1),  //Prioriser le order number. S'il n'y en a aucun, on prend la plus haute valeur dans iterations
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
               {sortedIterationsArray.map(iteration => (
                    <RepeaterSingleIteration 
                        key={iteration.key} 
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitSubStructure={iteration.initFormStructureWithValues ? iteration.initFormStructureWithValues : formInitStructure}
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