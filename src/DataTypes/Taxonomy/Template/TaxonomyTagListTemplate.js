//React hook
import { useState } from "react";

// Styles
import styles from "./TaxonomyTagListTemplate.module.scss"

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

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
const TaxonomyTagListTemplate = ({name, formTools, ...props}) => {

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

    const auth = useAuth();

    const [taxonomyList, setTaxonomyList] = useState([])//currentState || [])

    //Update the return object
    useEffect( () => {
        const tempReturnObject = [];
        taxonomyList.forEach( (elem) => {
            tempReturnObject.push({
                [props.idField] : elem._id,
                status: {
                    state: "pending",
                    lastModifiedBy: auth.user.id,
                    requestedBy: auth.user.id
                }
            })
        });
        updateValue(name, tempReturnObject)
    }, [taxonomyList])

    const removeEntity = (selectedObj) => {
        //remove the selectedObj
        setTaxonomyList(taxonomyList.filter(elem => elem._id !== selectedObj._id));
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
            />

            <ul className={`${styles['tagList']}`}>

                {taxonomyList.length > 0 && taxonomyList.map( (selected, index) =>
                
                    <li 
                        key={index + '-tagItem-' + props.name}
                        className={`${styles['tag']} ${props.tag ? styles[props.tag] : styles["generaltag"]}`} 
                    >
                        <button className={`${styles['closeButton']}`} type="button" onClick={ () => removeEntity(selected)}>✖</button>
                        <span className={`${styles['status'] && styles[selected.status.state]}`}>◉</span>
                        <span>{selected.name}{console.log(selected)}</span>
                    </li>
                )}
            </ul>
        </>
    )
}
export default TaxonomyTagListTemplate;