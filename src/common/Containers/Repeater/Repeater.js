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

    useEffect( () => {updateValue(name, childData)}, [childData])
    useEffect( () => {console.log("currentState", currentState)}, [childData])

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
        }
        else {
            console.log("ERREUR - Repeater childIndex == -1")
        }

    }, [tempChildObject])


    const addRepeated = () => {
        const tempRepeated = [...repeatedComponent];

        if( props.maxRepeat ? tempRepeated.length < props.maxRepeat : true)
        tempRepeated.push(React.cloneElement(children, {
                key: keyValueNumber.toString() + "-repeatedComponent-"+props.name,
                keyValue: keyValueNumber.toString(),
                dataSetter: setTempChildObject
            }));

        setRepeatedComponent(tempRepeated);
        console.log("addRepeated",tempRepeated);

        const tempChildData = [...childData, {keyValue:keyValueNumber}]
        setChildData(tempChildData)

        //Add 1 to keyValueNumber
        setKeyValueNumber( 1 + keyValueNumber );
    }
    
    const removeRepeated = (index) => {
        const tempRepeated = [...repeatedComponent];
        tempRepeated.splice(index, 1);
        setRepeatedComponent(tempRepeated);

        const tempChildData = [...childData];
        tempChildData.splice(index, 1);
        setChildData(tempChildData);
    }

    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <div>
                <Button type="button" slim="true" key={"addChild-"+props.name} onClick={ () => addRepeated()}>{props.addButtonLabel || "+"}</Button>
            </div>
            { repeatedComponent.length == 0 ? <div>{props.noComponentLabel}</div>
            :
            React.Children.map(repeatedComponent, ( (child, index) => {
                    return (
                        <div key={index+"-repeatContainer-"+props.name}>
                            <div key={index+"-repeat-"+props.name}>{index + 1} - {child}</div>

                            <Button key={index+"-btn-"+props.name} slim="true" type="button" onClick={ () => removeRepeated(index)}>✖</Button>
                        </div>
                    )
                }))
            }
        </div>

    )

}
export default Repeater;