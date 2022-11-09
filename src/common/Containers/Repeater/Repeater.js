//React
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

//Component
import Button from "../../FormElements/Buttons/Button/Button";


const Repeater = ({children, ...props}) => {

    const [keyValueNumber, setKeyValueNumber] = useState(0);
    const [repeatedComponent, setRepeatedComponent] = useState([]);

    const updateRepeatedChildData = (childKeyValue, value) => {
        console.log("reapeatedComponentUpdate", repeatedComponent);
        console.log("childKeyValue", childKeyValue, "value", value);
        let tempRepeatedCopy = Object.assign([], repeatedComponent);
        console.log("tempCopy = [repeat]", tempRepeatedCopy)

        //Find the index of the child from it's keyValue
        const childIndex = tempRepeatedCopy.findIndex( (elem) => {
            return elem.child.props.templateProps.keyValue == childKeyValue;
        });
        console.log("childIndex", childIndex)+

        //Set the new value of the child to the state
        console.log("avant =value",tempRepeatedCopy)
        tempRepeatedCopy[childIndex].childData = value;
        setRepeatedComponent(tempRepeatedCopy);
        console.log("tempRepeatedCopy", tempRepeatedCopy)
    }


    /*const [repeatedComponent, setRepeatedComponent] = useState([{
        child: React.cloneElement(children, {
            key:"0-repeatedComponent-"+props.name,
            templateProps: {
                key: "0-repeatedTemplate-"+props.name,
                keyValue: 0,
                updateChildData : updateRepeatedChildData
            }
        }),
        childData: {}
    }]);*/

    //[{1},2 ,3].forEach (el)= const formstate, setFormState = useState()

    //repeatedComponent.forEach( (elem) => formtool = elem.data)

    /*useEffect(
    formstate = [
        { title:x, group:y},
        { title:x, group:y},
        { title:x, group:y},
        { title:x, group:y},]
        formstate.forEach ( (elem) addRepeated(elem.data)))
    )*/

    useEffect( () => {
        console.log("repeatedUseEffect", repeatedComponent)
        console.log(updateRepeatedChildData)
    }, [repeatedComponent]);

    const addRepeated = () => {
        const tempRepeated = [...repeatedComponent];

        tempRepeated.push({
            child: React.cloneElement(children, {
                key: keyValueNumber.toString() + "-repeatedComponent-"+props.name,
                templateProps: {
                    key: keyValueNumber.toString() + "-repeatedTemplate-"+props.name,
                    keyValue: keyValueNumber.toString(),
                    updateChildData : updateRepeatedChildData
                }
            }),
            childData: {}
        });
        setRepeatedComponent(tempRepeated);
        console.log("addRepeated",tempRepeated);

        //Add 1 to keyValueNumber
        setKeyValueNumber( (prev) => 1 + prev);
    }
    
    const removeRepeated = (index) => {
        const tempRepeated = [...repeatedComponent];
        tempRepeated.splice(index, 1);
        setRepeatedComponent(tempRepeated);
    }

    const RepeaterToChildren = () => {
        const childrens = [];
        repeatedComponent.forEach( (repeated) => {
            childrens.push(repeated.child)
        })
        return childrens;
    }

    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <div>
                <Button type="button" slim="true" key={"addChild-"+props.name} onClick={ () => addRepeated()}>Ajouter un membre</Button>
            </div>
            { repeatedComponent.length == 0 ? <div>Aucun membre ajouté</div>
            :
            React.Children.map(RepeaterToChildren(), ( (child, index) => {
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