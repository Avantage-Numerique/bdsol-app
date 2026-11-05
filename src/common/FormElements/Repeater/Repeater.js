import React, { useEffect, useRef, useState } from "react";

// @dnd-kit
import { DragDropManager, DragDropProvider, KeyboardSensor, PointerSensor } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

//components
import Button from "@/FormElements/Button/Button";
import Icon from "@/src/common/widgets/Icon/Icon";
import { SortableItem } from "./SortableItem";

//styles
import styles from "./Repeater.module.scss";

/**
 * Use to be able to manually reorder the items within the multiple items set in the same groupe.
 * As a group of skills, a group of person, etc.
 *
 * @param {RepeaterProps} props
 */
const Repeater = (props) => {
    const { children, formInitStructure, formTools, name, initValues, sortable = false, className } = props;

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

    /**
     *
     *
     * @param {FormStructure[]} initValues
     */
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

    /**
     * Update the content of a single iteration in the state
     *
     * @type {UpdateIterationValue}
     */
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

    /**
     * Add a new iteration to the state
     */
    function addNewIteration() {
        const newValue = createIteration();
        setIterations({
            ...iterations,
            ...newValue,
        });
        inputTouched(name);
    }

    /**
     * Delete an iteration from the state
     *
     * @type {DeleteIterationByKey}
     */
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

    /**
     * Create a new Id and make sure its not gonna be in double
     */
    function generateUniqueId() {
        //Create a new Id
        const newId = Math.floor(Math.random() * 1000000 + 1);
        //Make sure it doesn't exist already into the state. Also accept is iteration is not defined yet
        if (!initIteration || !Object.keys(initIteration).some((key) => key === newId)) return newId;
        //If the id isn't unique, than call the function again
        generateUniqueId();
    }

    /**
     * Create a new Id and make sure its not gonna be in double
     *
     * @param {string} _id
     * @param {FormStructure} initFormStructureWithValues
     * @param {number?} orderNumber
     */
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

    /**
     * Manage the reordering when the element is droped
     *
     * @type {(event: import("@dnd-kit/react").DragEndEvent, manager: DragDropManager) => void}
     */
    function handleDragEnd(event, manager) {
        const { operation, canceled } = event;
        const { source, target } = operation;

        // const active = operation.source;
        // const over = operation.target;

        console.log({ source: source.id, target: target.id });

        if (canceled) {
            setDragActiveItem(null);
            return;
        }

        if (source?.id && target?.id && source.id !== target.id) {
            const sortedKeysArray = sortedIterationsArray.map((elem) => String(elem.key));
            //Initial array of orders (supposed to be sorted). Ex : [1, 2, 3, 4]
            const arrayOfActualOrders = sortedIterationsArray.map((elem) => elem.order);

            //Array of modified orders. Ex : [1, 4, 2, 3]
            const modifiedOrders = move(
                arrayOfActualOrders,
                sortedKeysArray.indexOf(source.id),
                sortedKeysArray.indexOf(target.id)
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
        } else {
            console.log("undetected or source === target");
        }
        setDragActiveItem(null);

        console.log(formTools.formState);
    }

    return (
        <div className={`${styles["repeater-container"]}`}>
            <section ref={containerRef} className={`${styles["repeater"]}`}>
                <DragDropProvider
                    sensors={[PointerSensor, KeyboardSensor]}
                    // collisionDetection={closestCenter}
                    onDragStart={(event, manager) => {
                        const { operation } = event;
                        setDragActiveItem(operation.source);
                    }}
                    // onDragCancel={() => setDragActiveItem(null)}
                    onDragEnd={handleDragEnd}
                >
                    {sortedIterationsArray.map((iteration, i) => (
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
                            index={i}
                        >
                            {children}
                        </SortableItem>
                    ))}
                </DragDropProvider>
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
};

export default Repeater;
