//Component
import Input from "@/src/common/FormElements/Input/Input";


const PersonRoleTemplate = (props) => {
    /*const {
        formState,
        inputHandler,
        inputTouched
    } = formTools;*/

    return (
        <div>
            <label>Le nom de la personne : <strong>{props.entity.firstName + ' ' + props.entity.lastName}</strong></label><br/>
            <label>Group</label><br/>
            <input 
                name="group"
                label="Groupe"
                placeholder="Employé, Membre du CA ..."
            />
            <br/>
            <label>Titre</label><br/>
            <input
                name="title"
                label="Titre"
                placeholder="Directeur, Comptable ..."
            />
        </div>
    )
}
export default PersonRoleTemplate;