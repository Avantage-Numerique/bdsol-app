//React
import React from "react";
import { useEffect, useState, useRef } from "react";

import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";

//Component
import Button from "../../FormElements/Button/Button";

/*
Props :
    - <Repeater> <children/> </Repeater>, children to repeat
    - name : formtools storage field to pass it's return object
    - formtool : the formtool which the repeater shall use
    - label : Label on top of the repeater to specify the purpose of the field
    - addButtonLabel : The label to describe what repeated each time. Default : +
    - noComponentLabel : The label to display when the number of repeated component is 0
    - maxRepeat : number of allowed repetition of the children
*/
const Repeater = ({children, name, ...props}) => {

    const repeaterFormState = props.formTools.formState;
    const repeaterInputHandler = props.formTools.inputHandler;
    const updateValue = value => {
        repeaterInputHandler(
            name,
            value,
            props.validationRules ? validate(event.target.value) : true
        )
    }

    const { FormUI, submitRequest, formState, formTools, transmuteTaxonomyTargetInput } = useFormUtils(
        {
            children0: {
                value: "fred",
                isValid: true
            },
            children1: {
                value: "",
                isValid: true
            },
            children2: {
                value: "",
                isValid: true
            },
            children3: {
                value: "",
                isValid: true
            },
            children4: {
                value: "",
                isValid: true
            },
            children5: {
                value: "",
                isValid: true
            },
        },
        )

    const [childrenInUse, setChildrenInUse] = useState(
        [
            { name : "children0", inUse:false },
            { name : "children1", inUse:false },
            { name : "children2", inUse:false },
            { name : "children3", inUse:false },
            { name : "children4", inUse:false },
            { name : "children5", inUse:false }
        ]);
    const [repeatedComponent, setRepeatedComponent] = useState([]);

    const addRepeated = () => {
        const tempRepeated = [...repeatedComponent];
        if( props.maxRepeat ? tempRepeated.length < props.maxRepeat : true){

            const newChildIndex = setNextChildInUse();
            const newChild = React.cloneElement(children, {
                key: newChildIndex.toString() + "-repeatedComponent-"+name,
                name: "children"+newChildIndex,
                formTools: formTools
            });

            //Add children
            setRepeatedComponent([...tempRepeated, newChild]);
        }
    }

    const setNextChildInUse = () => {
        const tempInUse = [...childrenInUse]
        let notUsed;
        for (const elem of tempInUse) {
            if (!elem.inUse){
                notUsed = elem;
                break;
            }
        }
        if (notUsed){
            const indexNotUsed = tempInUse.findIndex( x => x.name === notUsed.name);
            
            notUsed.inUse = true;
            tempInUse[indexNotUsed] = notUsed;

            setChildrenInUse(tempInUse);
            return notUsed.name.split("n")[1]; //children [0],  #[1]

        }
        return -1;
    }

    const removeChildren = (name) => {
        const tempRepeated = [...repeatedComponent];
        
        //Remove repeatedChildren
        const childIndexRepeated = tempRepeated.findIndex( (elem) => {
            return elem.props.name === name;
        });
        tempRepeated.splice(childIndexRepeated, 1);
        setRepeatedComponent(tempRepeated);

        //Remove childrenInUse
        const tempInUse = [...childrenInUse];
        const childIndexInUse = tempInUse.findIndex( elem => elem.name === name);
        tempInUse[childIndexInUse] = { name : "children"+childIndexInUse, inUse:false}
        setChildrenInUse(tempInUse);

        //Reset formState
        refreshRepeaterFormState();
    }

    const refreshRepeaterFormState = () => {
        let state = [];
        childrenInUse.forEach(elem => {
            if(elem.inUse)
                state.push(formState.inputs[elem.name].value)
        });

        //updateValue du formState du repeater
        updateValue(state)
    }

    const refreshRepeatedComponent = () => {
        const tempRepeat = [...repeatedComponent];
        
        tempRepeat.forEach(elem => {
            //elem.props.formTools = formTools;
        });
        setRepeatedComponent(tempRepeat);
    }

    useEffect( () => { refreshRepeatedComponent() }, [formState])
/*
    useEffect( () => { console.log("childrenformState", formState) }, [formState])
    useEffect( () => { console.log("repeated", repeatedComponent) }, [repeatedComponent])
    useEffect( () => { console.log("repeaterFormState value", repeaterFormState.inputs[name].value) }, [repeaterFormState])
    useEffect( () => { console.log("childrenInUse", childrenInUse) }, [childrenInUse])
*/
    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <div>
                <Button type="button" slim="true" key={"addChild-"+props.name} onClick={ () => addRepeated()}>{props.addButtonLabel || "+"}</Button>
            </div>
            { repeatedComponent.length === 0 ? <div>{props.noComponentLabel}</div>
            :
            React.Children.map(repeatedComponent, ( (child) => {
                    return (
                        <div id={child.props.keyValue + "-repeatedChild-"+props.name} key={child.props.keyValue + "repeatedChild-" + props.name}>
                            <div>
                                <div>{child.props.name} - {child}</div>
                            </div>
                            <Button slim="true" type="button" onClick={ () => removeChildren(child.props.name)}>✖</Button>
                        </div>
                    )
                }))
            }
        </div>

    )

}
export default Repeater;