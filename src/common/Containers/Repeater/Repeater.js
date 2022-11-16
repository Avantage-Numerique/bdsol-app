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
const Repeater = ({children, ...props}) => {

    const [keyValueNumber, setKeyValueNumber] = useState(0);
    const [repeatedComponent, setRepeatedComponent] = useState([]);

    const addRepeated = () => {
        const tempRepeated = [...repeatedComponent];

        if( props.maxRepeat ? tempRepeated.length < props.maxRepeat : true)
        tempRepeated.push(React.cloneElement(children, {
                key: keyValueNumber.toString() + "-repeatedComponent-"+props.name,
                keyValue: keyValueNumber.toString(),
            }));

        setRepeatedComponent(tempRepeated);
        console.log("addRepeated",tempRepeated);

        //Add 1 to keyValueNumber
        setKeyValueNumber( 1 + keyValueNumber );
    }
    
    const removeRepeated = (index) => {
        const tempRepeated = [...repeatedComponent];
        tempRepeated.splice(index, 1);
        setRepeatedComponent(tempRepeated);
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