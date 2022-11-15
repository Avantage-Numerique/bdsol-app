//React hook
import { useState } from "react";

// Styles
import styles from "./TaxonomyTagListTemplate.module.scss"

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

// Component
import Select2 from "@/src/common/FormElements/Select2/Select2";
import { useEffect } from "react";


const TaxonomyTagListTemplate = (props) => {

    const auth = useAuth()

    const [taxonomyList, setTaxonomyList] = useState(props.taxonomyList || [])

    const [templateReturnObjet, setTemplateReturnObject] = useState([])

    //Update the return object
    useEffect( () => {
        const tempReturnObject = [];
        taxonomyList.forEach( (elem) => {
            tempReturnObject.push({
                [props.idField] : elem._id,
                status: {
                    state: "Pending",
                    lastModifiedBy: auth.user.id,
                    requestedBy: auth.user.id
                }
            })
        });
        setTemplateReturnObject(tempReturnObject);
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
                        <span>{selected.name}</span>
                    </li>
                )}
            </ul>
        </>
    )
}
export default TaxonomyTagListTemplate;