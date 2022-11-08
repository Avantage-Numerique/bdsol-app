//Component
import Input from "@/src/common/FormElements/Input/Input";
import { useState } from "react";
import { useEffect } from "react";


const PersonRoleTemplate = (props) => {

    /*const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;*/

    //***************************************************************************************************** */
    //Pour le moment, fonctionne SEULEMENT AVEC UN SELECT EN MODE single="true".
    
    const [templateReturnData, setTemplateReturnData] = useState({
        group:"",
        title: ""
    })

    const addDataToReturnObject = (field, value) => {
        const tempData = {...templateReturnData};
        tempData[field] = value;
        setTemplateReturnData(tempData);
        props.updateChildData(props.keyValue, tempData);
    }

    return (
        <div>
            <label>Le nom de la personne : <strong>{props.entity.length != 0 ? props.entity[0].firstName + ' ' + props.entity[0].lastName : "Aucun membre sélectionné"}</strong></label><br/>
            {/*<label>Group</label><br/>
            <input 
                name="group"
                label="Groupe"
                placeholder="Employé, Membre du CA ..."
                onChange={ (e) => addDataToReturnObject("group", e.target.value)}
            />
            <br/>
            <label>Titre</label><br/>
            <input
                name="title"
                label="Titre"
                placeholder="Directeur, Comptable ..."
                onChange={ (e) => addDataToReturnObject("title", e.target.value)}
    />*/}
        </div>
    )
}
export default PersonRoleTemplate;