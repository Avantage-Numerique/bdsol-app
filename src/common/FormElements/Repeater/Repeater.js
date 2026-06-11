import React, { useEffect, useRef, useState } from "react";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

//Hooks
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";

//components
import Button from "@/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon";

//styles
import styles from "./Repeater.module.scss";

//Recursive function to create the children with the proper values
const iterateOverChildren = (children, formInitSubStructure, formTools, deleteIteration) => {
    return React.Children.map(children, (child) => {
        // equal to (if (child == null || typeof child == 'string'))
        if (!React.isValidElement(child)) return child;

        //If this child has a name prop,
        // and if the value is equal to one of the values declared for the formState, then it means it is a field and require a formtool
        const newProps = Object.keys(formInitSubStructure).some((key) => key === child.props?.name)
            ? { formTools: formTools }
            : {};

        return React.cloneElement(child, {
            ...child.props,
            ...newProps,
            // you can alse read child original className by child.props.className
            children: iterateOverChildren(child.props.children, formInitSubStructure, formTools, deleteIteration),
        });
    });
};

//Component generated for each child. The reason we need this component is that we need to have a form state for every child
const RepeaterSingleIteration = ({
    children,
    formInitSubStructure,
    iterationKey,
    updateIterationValue,
    deleteIterationByKey,
}) => {
    //Create its own sub form state
    const { formState, formTools } = useFormUtils(formInitSubStructure);
    // update the value
    useEffect(() => {
        updateIterationValue(iterationKey, formState.inputs, formState.isValid, formState.hasAnyInputBeenTouched);
    }, [formState]);

    const deleteIterationButton = (
        <Button className="btn-close" onClick={() => deleteIterationByKey()}>
            &times;
        </Button>
    );

    //Return the children with the recursive function
    return (
        <>
            <div className="d-flex justify-content-end p-0">{deleteIterationButton}</div>
            <div>{iterateOverChildren(children, formInitSubStructure, formTools, deleteIterationByKey)}</div>
        </>
    );
};

//Iterations elements
const SortableItem = (props) => {
    const {
        iteration,
        className,
        isDragActive,
        sortable,
        sortedIterationsArray,
        deleteIterationByKey,
        updateIterationValue,
        children,
        formInitStructure,
    } = props;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            style={style}
            id={iteration.key}
            ref={setNodeRef}
            className={`d-flex flex-nowrap rounded my-2 ${styles["repeatable"]} ${styles["box-shadow"]} ${className} ${isDragActive && "shadow"}`}
            data-order={iteration.order}
        >
            {sortable && sortedIterationsArray.length > 1 && (
                <div
                    {...attributes}
                    {...listeners}
                    draggable={true}
                    role={"button"}
                    className={`${styles["dragging-button"]} rounded-start flex-grow-0 d-flex align-items-center p-2`}
                >
                    <Icon className="d-flex align-items-center" iconName="las la-grip-vertical" />
                </div>
            )}
            <div className="container">
                <div className="row">
                    <RepeaterSingleIteration
                        iterationKey={iteration.key}
                        deleteIterationByKey={() => deleteIterationByKey(iteration.key)}
                        formInitSubStructure={
                            iteration.initFormStructureWithValues
                                ? iteration.initFormStructureWithValues
                                : formInitStructure
                        }
                        updateIterationValue={updateIterationValue}
                    >
                        {children}
                    </RepeaterSingleIteration>
                </div>
            </div>
        </div>
    );
};

/**
 * Use to be able to manually reorder the items within the multiple items set in the same groupe.
 * As a group of skills, a group of person, etc.
 * @param props
 * @returns {JSXElement}
 * @constructor
 */
const Repeater = (props) => {
    /* List of props */
    const {
        children, // - Elements to repeat
        //             (can be on multiple level. EX : <div><Input /></div>)
        //              List of key words in the children (props name that the repeater is going to be looking for) :
        //                  - repeaterDeleteElem : if true, an onClick event is going to be added to delete this iteration
        //                  - name : if defined and if it fits the values passed in the form init structure, it is going to receive the sub formTools for this specific iteration
        formInitStructure, // - [object] :Structure of the form for every instance of the repeated element
        // -           CAREFUL => the names in the formInitstructure must reflect the names of the fields entered as children
        formTools, // - [formTools obj] : FormTools of the main form. Give us acces to the whole form data
        name, // - [string] : Name to refer to the repeater in the main form State
        initValues, // - [array] : Expected to be an array of object where each object contains the values for one iteration of this repeater
        //formReturnStructure   //
        sortable = false, // - [bool] : If true, the repeater add an order value, display the drag and drop UI and activate that function
        className, // - [String] : Represent the class names of the generated containers to repeat
    } = props;

    //Extract the needed elements from the formtools
    const { inputHandler, inputTouched } = formTools;

    //State to manage the values of every iterations of the repeater
    let initIteration = {};
    const initialsValues = addInitValuesToState(initValues);
    const [iterations, setIterations] = useState({ ...initialsValues });
    initIteration = iterations;

    //Announce the current dragged element
    const [dragActiveItem, setDragActiveItem] = useState(null);
    //Reference to the dom elements
    const containerRef = useRef();

    //Gives us access to the values of the main state in the shape of an array. And since it is sorted, we use it to display the elements
    const sortedIterationsArray = iterations
        ? Object.values(iterations).sort((a, b) => (a.order > b.order ? 1 : -1))
        : [];

    //Whenever the iteration state change, apply the changes on the main state
    useEffect(() => {
        //Get an array with every values
        const value = Object.values(iterations);
        //Check if any isValid is false and set parent isValid accordingly
        const isValid = value.every((ite) => ite.isValid);
        //Update the main form state
        inputHandler(name, value, isValid);
    }, [iterations]);

    /*************
     *
     *  List of functions needed for this component
     *
     ****/
    function addInitValuesToState(initValues) {
        /*   
            Expected shape of the initValues
            {occupation: 'Comédien', skills: Array(2), subMeta: {…}, _id: '6424700e74e06285c8139225'}
            {occupation: 'Petit prince', skills: Array(4), subMeta: {…}, _id: '6424700e74e06285c8139227'}
        */
        //Prevent the function from executing if there is no initValues
        if (initValues && Array.isArray(initValues) && initValues.length > 0) {
            //It is expected that initValues is an array of objects containing the same keywords has present in the formInitStructure
            //1. Get an array containing all the keys to fill
            const arrayOfKeyWords = Object.keys(formInitStructure);
            //2. Initialize the return object that is going to fill the iterations state at the first rendering
            let startIterationsObj = {};
            const ordersValues = []; //pluck order values.
            //3. Loop in the initialValues passed has props to fill the startIterationsObj
            initValues.forEach((elem) => {
                //Initialize the value that are going to compose the return object
                let currentId = elem._id ? elem._id : elem.id ? elem.id : undefined;
                let currentOrder = ordersValues.includes(elem?.subMeta?.order)
                    ? ordersValues[ordersValues.length - 1] + 1
                    : elem?.subMeta?.order;
                let formInitStructureWithValues = {}; //Same shape but going to be filled with the values
                //For the last one, lets loop into the array of key words to search for a fit
                arrayOfKeyWords.forEach((keyWord) => {
                    formInitStructureWithValues[keyWord] = {
                        value: elem[keyWord],
                        isValid: true,
                    };
                });

                //Create the iteration object with the values parsed
                const newIterationObj = createIteration(currentId, formInitStructureWithValues, currentOrder); //
                //Update the return object
                startIterationsObj = {
                    ...startIterationsObj,
                    ...newIterationObj,
                };
                ordersValues.push(currentOrder);
                ordersValues.sort(); //assure that the last element is always
            });
            //4. Finally, return the value
            return startIterationsObj;
        }
        //Else return an empty object
        return {};
    }

    //Update the content of a single iteration in the state
    function updateIterationValue(key, value, isValid, hasAnyInputBeenTouched) {
        //Previous is important! Otherwise, it doesn't update properly
        setIterations((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value: value,
                isValid: isValid,
            },
        }));

        if (hasAnyInputBeenTouched) {
            inputTouched(name);
        }
    }
    //Add a new iteration to the state
    function addNewIteration() {
        const newValue = createIteration();
        setIterations({
            ...iterations,
            ...newValue,
        });
        inputTouched(name);
    }
    //Delete an iteration from the state
    const deleteIterationByKey = (key) => {
        //Create a new instance of the state to edit
        let updatedIterations = { ...iterations };
        //Save the order's value of the element to delete
        const deletedOrder = updatedIterations[key].order;
        //Remove the selected element
        delete updatedIterations[key];
        //Update the orders to have a following suit
        Object.keys(updatedIterations).forEach((objKey) => {
            const objOrder = updatedIterations[objKey].order;
            //If the order is higher than the one we deleted, decrease it from 1
            if (objOrder > deletedOrder) updatedIterations[objKey].order = objOrder - 1;
        });
        //update the state
        setIterations(updatedIterations);
        inputTouched(name);
    };

    //Create a new Id and make sure its not gonna be in double
    function generateUniqueId() {
        //Create a new Id
        const newId = Math.floor(Math.random() * 1000000 + 1);
        //Make sure it doesn't exist already into the state. Also accept is iteration is not defined yet
        if (!initIteration || !Object.keys(initIteration).some((key) => key === newId)) return newId;
        //If the id isn't unique, than call the function again
        generateUniqueId();
    }

    //Create a new Id and make sure its not gonna be in double
    function createIteration(_id, initFormStructureWithValues, orderNumber = null) {
        //Create an ID
        const key = generateUniqueId();
        //Iterations array
        const iterationsArray = initIteration ? Object.values(initIteration) : [];

        return {
            [key]: {
                key: key,
                order:
                    orderNumber ||
                    (iterationsArray.length > 0 ? Math.max(...iterationsArray.map((o) => o.order)) + 1 : 0), //Prioriser le order number. S'il n'y en a aucun, on prend la plus haute valeur dans iterations
                value: {},
                initFormStructureWithValues: initFormStructureWithValues ? initFormStructureWithValues : null,
                _id: _id ? _id : null,
                isValid: true,
            },
        };
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div className={`${styles["repeater-container"]}`}>
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
                        items={sortedIterationsArray.map((elem) => String(elem.key))}
                        strategy={verticalListSortingStrategy}
                    >
                        {sortedIterationsArray.map((iteration) => (
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
                                formInitStructure={formInitStructure}
                            >
                                {children}
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </section>

            {/* By default, there is an add button */}
            <div className="d-flex justify-content-center align-items-center py-2">
                <Button
                    className={`${styles["add-elem-to-repeater-button"]}`}
                    onClick={addNewIteration}
                    color="$primary_7"
                >
                    <Icon iconName={"las la-plus"} />
                </Button>
            </div>
        </div>
    );

    /* Manage the reordering when the element is droped */
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active?.id && over?.id && active.id !== over.id) {
            const sortedKeysArray = sortedIterationsArray.map((elem) => String(elem.key));
            //Initial array of orders (supposed to be sorted). Ex : [1, 2, 3, 4]
            const arrayOfActualOrders = sortedIterationsArray.map((elem) => elem.order);

            //Array of modified orders. Ex : [1, 4, 2, 3]
            const modifiedOrders = arrayMove(
                arrayOfActualOrders,
                sortedKeysArray.indexOf(active.id),
                sortedKeysArray.indexOf(over.id)
            );
            //New state object to edit and then, update
            let newIterationState = { ...iterations };
            //Create a keys array
            const iterationsKeys = Object.keys(iterations);
            //Loop through the iterations state object with the keys
            iterationsKeys.forEach((key) => {
                //Get the new correct calculated order by index refering
                //For this to work, we assume that the index are in order
                const oldOrder = newIterationState[key].order;

                //Modify the value
                newIterationState[key].order = modifiedOrders.indexOf(oldOrder);
            });
            //Update the state with the new modified object
            setIterations(newIterationState);
        }
        setDragActiveItem(null);
    }
};

export default Repeater;
