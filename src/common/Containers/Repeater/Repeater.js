//React
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

//Component
import Button from "../../FormElements/Buttons/Button/Button";

/*
Props :
    - <Repeater> <children/> </Repeater>, children to repeat
    - name : formtools storage field to pass it's return object
    - formtool : the formtool which the repeater shall use
    - label : Label on top of the repeater to specify the purpose of the field
    - addButtonLabel : The label to describe what repeated each time. Default : +
    - noComponentLabel : The label to display when the number of repeated component is 0
    - maxRepeat : number of allowed repetition of the field
*/
const Repeater = ({children, name, formTools, ...props}) => {

    const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;

    const currentState = formState.inputs[name];

    const updateValue = (name, value) => {
        inputHandler(
            name,
            value,
            props.validators ? validate(event.target.value, props.validators) : true
        )
    }

    const [keyValueNumber, setKeyValueNumber] = useState(0);
    const [repeatedComponent, setRepeatedComponent] = useState([]);
    const [childData, setChildData] = useState([]);
    const [tempChildObject, setTempChildObject] = useState([]);

    useEffect( () => {console.log("repeated", repeatedComponent)}, [repeatedComponent])

    useEffect( () => {
        let childIndex;
        //Search keyValue in childData
        if (childData.length > 0){
            childIndex = childData.findIndex( (elem) => {
                return elem.keyValue == tempChildObject.keyValue;
            });
        }

        //Set childData with new value
        if (childIndex != -1){
            const tempChildData = [...childData];
            tempChildData[childIndex] = tempChildObject;
            setChildData(tempChildData);
            updateValue(name, tempChildData)
        }
        else {
            console.log("ERREUR - Repeater childIndex == -1")
        }

    }, [tempChildObject])

    useEffect( () => console.log("childData", childData), [childData])


    const addRepeated = () => {
        const tempRepeated = [...repeatedComponent];

        const newChild = React.cloneElement(children, {
            key: keyValueNumber.toString() + "-repeatedComponent-"+props.name,
            keyValue: keyValueNumber,
            dataSetter: setTempChildObject
        });

        if( props.maxRepeat ? tempRepeated.length < props.maxRepeat : true){
            //Add children
            setRepeatedComponent([...tempRepeated, newChild]);
            
            //Add children data space
            const tempChildData = [...childData];
            tempChildData.push({keyValue:keyValueNumber});
            setChildData(tempChildData)
            console.log("childData", tempChildData)

            //Add 1 to keyValueNumber
            setKeyValueNumber( 1 + keyValueNumber );
        }
        console.log("addRepeated",tempRepeated);
    }
    
    const removeRepeated = (keyValue) => {
        const tempRepeated = [...repeatedComponent];

        const childIndexRepeated = tempRepeated.findIndex( (elem) => {
            return elem.props.keyValue == keyValue;
        });
        if (childIndexRepeated == -1)
            console.log("Fred tu pue");
        else
        {
            tempRepeated.splice(childIndexRepeated, 1);
            setRepeatedComponent(tempRepeated);
        }
        
        const tempChildData = [...childData];
        const childIndexData = tempChildData.findIndex( (elem) => {
            return elem.keyValue == keyValue;
        });
        if( childIndexData == -1)
            console.log("fred tu pue encore plus");
        else
        {
            tempChildData.splice(childIndexData, 1);
            setChildData(tempChildData);
        }
        console.log("childIndexRepeated", childIndexRepeated, "childIndexData", childIndexData);
    }

    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <div>
                <Button type="button" slim="true" key={"addChild-"+props.name} onClick={ () => addRepeated()}>{props.addButtonLabel || "+"}</Button>
            </div>
            { repeatedComponent.length == 0 ? <div>{props.noComponentLabel}</div>
            :
            React.Children.map(repeatedComponent, ( (child) => {
                    return (
                        <div id={child.props.keyValue + "-repeatedChild-"+props.name} key={child.props.keyValue + "repeatedChild-" + props.name}>
                            <div>
                                <div>{Number(child.props.keyValue)} - {child}</div>
                            </div>
                            <Button slim="true" type="button" onClick={ () => removeRepeated(child.props.keyValue)}>✖</Button>
                        </div>
                    )
                }))
            }
        </div>

    )

}
export default Repeater;