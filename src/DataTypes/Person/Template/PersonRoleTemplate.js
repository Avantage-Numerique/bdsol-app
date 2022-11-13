//React hook
import { useState } from "react";
import { useEffect } from "react";

//Component
import Input from "@/src/common/FormElements/Input/Input";
import Select2 from "@/src/common/FormElements/Select2/Select2";
import Button from "@/src/common/FormElements/Buttons/Button/Button";


const PersonRoleTemplate = (props) => {

    //******************************************************************************************************/
    //Pour le moment, fonctionne SEULEMENT AVEC UN SELECT EN MODE single="true".
    
    const personSelectRequestData = {
        "data": {
            "firstName": ""
        }
    };

    const [personList, setPersonList] = useState(props.personList || []);
    const [templateReturnObjet, setTemplateReturnObject] = useState([]);

    useEffect( () => {
        if(personList.length != 0){
            //Merge the member id into the state, without removing the role (group, title)
            const newMemberId = {
                member : personList[0]._id,
                role:{
                    "group":"",
                    "title":""
                },
                status: {
                    state: "Pending",
                    lastModifiedBy: "",
                    requestedBy: ""
                }
            }
            const oldReturn = Object.assign( {}, templateReturnObjet)
            setTemplateReturnObject(Object.assign(oldReturn, newMemberId));
        }
        else
            setTemplateReturnObject([]);
    }, [personList]);

    useEffect(() => { console.log("return object", templateReturnObjet)}, [templateReturnObjet])

    const addDataToReturnObject = (field, value) => {
        const oldReturn = Object.assign({}, templateReturnObjet);
        let newRoleField = oldReturn.role
        newRoleField[field] = value;

        setTemplateReturnObject(Object.assign(oldReturn, newRoleField));
    };

    const removeEntity = () => {
        setPersonList([]);
    };

    return (
        <>
            <Select2
                name={props.name}
                searchField="firstName"
                label={props.label}
                request="/persons"
                requestData={personSelectRequestData}
                placeholder={props.placeholder}
                dataSetter={setPersonList}
                selectedEntities={personList}
                single="true" //For the moment, this template works only with the Select2 on single mode
            />
            <div>
                { personList.length != 0 &&
                    <>
                        <Button slim="true" type="button" onClick={ () => removeEntity()}>✖</Button><br/>
                        <label>Le nom de la personne : <strong>{personList[0].firstName + ' ' + personList[0].lastName}</strong></label><br/>
                        <label>Group</label><br/>
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
                        />
                    </>
                }
            </div>
        </>
    )
}
export default PersonRoleTemplate;