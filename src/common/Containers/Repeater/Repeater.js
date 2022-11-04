//React
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


//Component
import Button from "../../FormElements/Buttons/Button/Button";


const Repeater = ({children, ...props}) => {
    //const template = Object.assign(children);
    const template = React.cloneElement(children, { key: "FirstRepeatField-"+ Math.random()})
    const [repeatedComponent, setRepeatedComponent] = useState([]);

    const addRepeated = () => {
        const tempRepeated = Object.assign([],repeatedComponent);
        tempRepeated.push({
            child: React.cloneElement(children,
                {
                    key: repeatedComponent.length + "-repeatedComponent-"+props.name,
                    anything: Math.random()
                }),
            data:{}
        });
        setRepeatedComponent(tempRepeated);
        console.log(repeatedComponent);
    }
    
    const removeRepeated = (index) => {
        const tempRepeated = Object.assign([], repeatedComponent);
        tempRepeated.splice(index, 1);
        setRepeatedComponent(tempRepeated);
    }

    return (
        <div>
            <div>
            <Button type="button" slim="true" key={"addChild-"+props.name} onClick={() => addRepeated()}>+</Button>
            {template}
            </div>
            {
                repeatedComponent.map( (elem, index) => {
                    return (
                        <div key={index+"-repeatContainer-"+props.name}>
                            <div key={index+"-repeat-"+props.name}>{elem.child}{elem.child.props.anything}</div>
                            <Button key={index+"-btn-"+props.name} slim="true" type="button" onClick={ () => removeRepeated(index)}>x</Button>
                        </div>
                    )
                })
            }
        </div>

    )

}
export default Repeater;