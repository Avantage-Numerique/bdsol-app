import React, {useEffect, useRef, useState, useMemo} from 'react';

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {useSortable} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';

//Hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';

//components
import Button from "@/FormElements/Button/Button";
import Icon from '@/src/common/widgets/Icon/Icon';

//Context
import {useAuth} from '@/auth/context/auth-context';
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//styles
import styles from './Repeater.module.scss'


//Recursive function to create the children with the proper values
const iterateOverChildren = (children, formInitSubStructure, formTools, deleteIteration) => {
    return React.Children.map((children), (child) => {
      // equal to (if (child == null || typeof child == 'string'))
      if (!React.isValidElement(child)) return child;

      //If this child has a name prop,
      // and if the value is equal to one of the values declared for the formState, then it means it is a field and require a formtool
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

//Iterations elements 
const SortableItem = props => {

    const {
        iteration,
        className,
        isDragActive,
        sortable,
        sortedIterationsArray,
        deleteIterationByKey,
        updateIterationValue,
        children,
        formInitStructure
    } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
      
    return (
        <article 
            style={style}
            id={iteration.key}
            ref={setNodeRef}
            className={`d-flex flex-nowrap rounded my-2 ${styles["repeatable"]} ${className} ${isDragActive && "shadow"}`}
            draggable={true}
            data-order={iteration.order}
        >
            { sortable && sortedIterationsArray.length > 1 && 
                <div 
                    {...attributes} 
                    {...listeners}
                    draggable={true}
                    type="button" 
                    className={`${styles["dragging-button"]} rounded-start flex-grow-0 d-flex align-items-center p-2`}
                >
                    <Icon className="d-flex align-items-center" iconName='las la-grip-vertical'/>
                </div>
            }
            <div className="container">
                <div className="row">
                    <RepeaterSingleIteration 
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitSubStructure={iteration.initFormStructureWithValues ? iteration.initFormStructureWithValues : formInitStructure}
                        updateIterationValue={updateIterationValue}
                    >
                        {children}
                    </RepeaterSingleIteration>
                </div>
            </div>
        </article>
    )
}



/*******************
 * 
 *   MAIN COMPONENT 
 * 
 *****/
const Repeater = props => {
    
    /* List of props */
    const {
        children,               // - Elements to repeat
                                //             (can be on multiple level. EX : <div><Input /></div>)
                                //              List of key words in the children (props name that the repeater is going to be looking for) : 
                                //                  - repeaterDeleteElem : if true, an onClick event is going to be added to delete this iteration
                                //                  - name : if defined and if it fits the values passed in the form init structure, it is going to receive the sub formTools for this specific iteration
        formInitStructure,      // - [object] :Structure of the form for every instance of the repeated element
                                // -           CAREFUL => the names in the formInitstructure must reflect the names of the fields entered has children
        formTools,              // - [formTools obj] : FormTools of the main form. Give us acces to the hole form data
        name,                   // - [string] : Name to refer to the repeater in the main form State
        initValues,             // - [array] : Expected to be an array of object where each object contains the values for one iteration of this repeater 
        //formReturnStructure   //
        sortable = false,             // - [bool] : If true, the repeater add an order value, display the drag and drop UI and activate that function
        className               // - [String] : Represent the class names of the generated containers to repeat
    } = props;
    
    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Extract the needed elements from the formtools
    const { inputHandler } = formTools;
    
    //State to manage the values of every iterations of the repeater
    let initIteration = {};
    const [iterations, setIterations] = useState(addInitValuesToState(initValues));
    initIteration = iterations;

    //Announce the current dragged element
    const [dragActiveItem, setDragActiveItem] = useState(null);
    //Reference to the dom elements
    const containerRef = useRef();
    
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

        //Get an array with every values
        value = Object.values(iterations);
        //Update the main form state
        inputHandler(name, value, isValid)

    }, [iterations])


    /*************
     * 
     *  List of functions needed for this component
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

    //Update the content of a single iteration in the state
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
    //Add a new iteration to the state
    function addNewIteration(){
        const newValue = createIteration();
        setIterations({
            ...iterations,
            ...newValue
        })
    }
    //Delete an iteration from the state
    const deleteIterationByKey = ( key ) => {
        //Create a new instance of the state to edit
        let updatedIterations = {...iterations};
        //Save the order's value of the element to delete
        const deletedOrder = updatedIterations[key].order;
        //Remove the selected element 
        delete updatedIterations[ key ];
        //Update the orders to have a following suit
        Object.keys(updatedIterations).forEach(objKey => {
            const objOrder = updatedIterations[objKey].order;
            //If the order is higher than the one we deleted, decrease it from 1
            if(objOrder > deletedOrder)
                updatedIterations[objKey].order = objOrder - 1;
        })
        //update the state
        setIterations(updatedIterations);
    }

    //Create a new Id and make sure its not gonna be in double
    function generateUniqueId(){
        //Create a new Id
        const newId = Math.floor((Math.random() * 1000000) + 1);
        //Make sure it doesn't exist already into the state. Also accept is iteration is not defined yet
        if( !initIteration || !Object.keys(initIteration).some(key => key == newId))
            return newId;
        //If the id isn't unique, than call the function again
        generateUniqueId();
    }

    //Create a new Id and make sure its not gonna be in double
    function createIteration( status, _id, initFormStructureWithValues, orderNumber=null ){
        //Create an ID
        const key = generateUniqueId();
        //Iterations array
        const iterationsArray = initIteration ? Object.values(initIteration) : [];
        //Build the object
        const obj = {
            [key]: {
                key: key,
                order: orderNumber || ( iterationsArray.length > 0 ? (Math.max(...iterationsArray.map(o => o.order))) + 1 : 0),  //Prioriser le order number. S'il n'y en a aucun, on prend la plus haute valeur dans iterations
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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <>  
            <section ref={containerRef} className={`${styles["repeater"]}`}>
                <DndContext 
                    sensors={sensors} 
                    collisionDetection={closestCenter} 
                    onDragStart={({ active }) => {
                        setDragActiveItem(active);
                    }}
                    onDragCancel={() => setDragActiveItem(null)}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={sortedIterationsArray.map(elem => String(elem.key))} 
                        strategy={verticalListSortingStrategy}
                    >
                    {sortedIterationsArray.map(iteration => (
                        <SortableItem 
                            id={String(iteration.key)}
                            key={iteration.key}
                            iteration={iteration}
                            className={className}
                            isDragActive={String(iteration.key) === dragActiveItem?.id}
                            sortable={sortable}
                            sortedIterationsArray={sortedIterationsArray}
                            deleteIterationByKey={deleteIterationByKey}
                            updateIterationValue={updateIterationValue}
                            children={children}
                            formInitStructure={formInitStructure}
                        />
                    ))}      
                    </SortableContext>    
               </DndContext>         
            </section>

            {/* <DNDUI /> */}
            {/* By default, there is an add button */}
            <div className="my-2 d-flex justify-content-start p-0">
                <Button type="button" size="slim" onClick={addNewIteration} className="m-0">Ajouter</Button>
            </div>
        </>
    )

    /* Manage the reordering when the element is droped */
    function handleDragEnd(event) {
        
        const {active, over} = event;

        if (active?.id && over?.id && active.id !== over.id) {
            const sortedKeysArray = sortedIterationsArray.map(elem => String(elem.key))
            //Initial array of orders (supposed to be sorted). Ex : [1, 2, 3, 4]
            const arrayOfActualOrders = sortedIterationsArray.map(elem => elem.order)
            //Array of modified orders. Ex : [1, 4, 2, 3] 
            const modifiedOrders = arrayMove(arrayOfActualOrders, sortedKeysArray.indexOf(active.id), sortedKeysArray.indexOf(over.id));
            //New state object to edit and then, update
            let newIterationState = {...iterations}
            //Create a keys array
            const iterationsKeys = Object.keys(iterations)
            //Loop through the iterations state object with the keys
            iterationsKeys.forEach(key => {
                //Get the new correct calculated order by index refering
                //For this to work, we assume that the index are in order
                const oldOrder = newIterationState[key].order;
                //Find the new order of the element by its index in the array
                let newIndex = modifiedOrders.indexOf(oldOrder);
                //Convert the index in position by incrementing it
                const newOrder = newIndex;
                //Modify the value
                newIterationState[key].order = newOrder;
            })
            //Update the state with the new modified object
            setIterations(newIterationState)
        }   
        setDragActiveItem(null);
    }
}

export default Repeater;