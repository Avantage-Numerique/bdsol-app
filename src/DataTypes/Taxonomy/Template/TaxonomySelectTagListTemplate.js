//React hook
import { useState } from "react";

// Styles
import styles from "./TaxonomySelectTagListTemplate.module.scss"

//Context
//import { useAuth } from "@/src/authentification/context/auth-context";

// Component
import Select2 from "@/src/common/FormElements/Select2/Select2";
import { useEffect } from "react";

/*
Props :
    - tag : the style the tag should take
    - name : formtools storage field to pass it's return object
    - idField : the field in which the id of the link should go (offer, occupation ...)(see database schema)
    - label : Pass the label to the select which shows on top of it
    - category : The taxonomy category in which the search should be done
    - placeholder : placeholder for the select input
    - formTools : formtools

*/
const TaxonomySelectTagListTemplate = ({name, formTools, ...props}) => {

    const {
        formState,
        inputHandler,
        //inputTouched
    } = formTools;

    const currentState = formState.inputs[name].value;

    const updateValue = (name, value) => {
        inputHandler(
            name,
            value,
            props.validators ? validate(event.target.value, props.validators) : true
        )
    }

    const [taxonomyList, setTaxonomyList] = useState( currentState ?? []);//props.taxonomyList

    //Update the return object
    useEffect( () => {
        /*
        const tempReturnObject = [];
        taxonomyList.forEach( (elem) => {
            tempReturnObject.push({
                [props.idField] : elem,
                status: {
                    state: "pending",
                    lastModifiedBy: auth.user.id,
                    requestedBy: auth.user.id
                }
            })
        });*/
        //updateValue(name, tempReturnObject);
        updateValue(name, taxonomyList);
    }, [taxonomyList])

    const removeEntity = (selectedObj) => {
        //remove the selectedObj
        setTaxonomyList(taxonomyList.filter(elem => elem[props.idField]._id !== selectedObj[props.idField]._id));
    }

    const taxonomySelectRequestData = {
        "data": {
            "category": props.category || "",
            "name": ""
        }
    };
    
    return (
        <>
            <Select2
                name={props.name}
                searchField="name"
                label={props.label}
                request="/taxonomies"
                requestData={taxonomySelectRequestData}
                placeholder={props.placeholder}
                dataSetter={setTaxonomyList}
                selectedEntities={taxonomyList}
                idField={props.idField}
            />

            <ul className={`${styles['tagList']}`}>

                {taxonomyList.length > 0 && taxonomyList.map( (selected, index) => {

                    const taxonomySelected = selected[props.idField] ?? selected;

                    return (
                        <li
                            key={taxonomySelected._id + '-tagItem-' + props.name+index}
                            className={`${styles['tag']} ${"bg-" + (props.tag ?? "generaltag")}`}
                        >
                            <button className={`${styles['closeButton']}`} type="button" onClick={() => removeEntity(selected)}>✖</button>
                            <span className={"text-"+ (taxonomySelected.status.state ?? "general-tag")}>◉</span>
                            <span>{taxonomySelected.name}</span>
                        </li>
                    )}
                )}
            </ul>
        </>
    )
}
export default TaxonomySelectTagListTemplate;