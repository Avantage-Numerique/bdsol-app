//React hook
import { useState } from "react";
import { useEffect } from "react";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Component
import Select2Tag from "@/src/common/FormElements/Select2/Select2Tag";

/*
Props :
    - name : formtools storage field to pass it's return object
    - label : Passed to the select to display on top of it
    - placeholder : placeholder inside the select input
*/
const PersonRoleTemplate = (props) => {

    //******************************************************************************************************/
    //Pour le moment, fonctionne SEULEMENT AVEC UN SELECT EN MODE single="true".

    const auth = useAuth();
    
    const personSelectRequestData = {
        "data": {
            "firstName": ""
        }
    };

    const [personList, setPersonList] = useState(props.personList || []);
    const [templateReturnObjet, setTemplateReturnObject] = useState(
    {
        keyValue:props.keyValue,
        role:{
            "group":"",
            "title":""
        },
        status: {
            state: "pending",
            lastModifiedBy: auth.user.id,
            requestedBy: auth.user.id
        }
    });

    useEffect( () => {
        //Merge the member id into the state, without removing the role (group, title)
        if(personList.length > 0) {
            setTemplateReturnObject({
                ...templateReturnObjet,
                member: personList[0]._id
            })
    
            props.dataSetter({
                ...templateReturnObjet,
                member: personList[0]._id
            })
        }
     
    }, [personList]);

    const addDataToReturnObject = (field, value) => {
        const oldReturn = {
            ...templateReturnObjet, 
            role: {
                ...templateReturnObjet.role,
                [field]: value
            }
        };

        setTemplateReturnObject(oldReturn);
        props.dataSetter(oldReturn);
    };

    const removeEntity = () => {
        setPersonList([]);
    };

    return (
        <>
            <Select2Tag
                name={props.name}
                searchField="firstName"
                //label={props.label}
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
                        {//<Button slim="true" type="button" onClick={ () => removeEntity()}>✖</Button><br/>
                        //Commented because repeater already allows remove of the entity (by deleting the child)
                        }
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