import React from 'react';

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//context
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import {useAuth} from '@/auth/context/auth-context';

//components
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Icon from '@/src/common/widgets/Icon/Icon';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';

//styling
import styles from './UpdateSkillGroup.module.scss';


const UpdateSkillGroup = ({formTools, name, parentEntity, positiveRequestActions, ...props}) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    const submitHandler = async event => {
        
        event.preventDefault();

        const formattedOccupations = formState.inputs.skillGroups.value.map(function(occ){
            return {
                status: occ.status,
                occupation: occ.value.occupation.value,
                skills: occ.value.skills.value.map(skill => skill.skill._id)
            }
        })

        const formData = {
            "data": {
                id: parentEntity._id,
                occupations: formattedOccupations,
                status: parentEntity.status
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/persons/update",
            'POST',
            formData
        );

    }

    return (
        <form className="w-100">
                <label>{props.label}</label>
                <Repeater
                    formTools={formTools}
                    name={name}
                    formInitStructure={{
                        occupation: {
                            value: "",
                            isValid: false
                        },
                        skills: {
                            value: [],
                            isValid: true
                        }
                    }}
                    //initValues={parentEntity.occupations}
                >
                    <article className={`
                        row my-2 bg-white
                        ${styles["update-skill-group"]}
                    `}>
                        {/* Content of the elements */}
                        <section className={`
                            col
                            ${styles["skill-group-inputs-container"]}
                        `}>
                            <Input 
                                label="Nom de groupe"
                                name="occupation"
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                            <Select2Tag
                                label="Attribuer des compétences"
                                searchField="name"
                                fetch="/taxonomies/list"
                                requestData={{name:""}}
                                name="skills"
                                idField="skill"
                            />
                        </section>
                        {/* Icone to move the element */}
                        <div className="col pr-0 flex-grow-0 text-secondary">
                            <Button 
                                    repeaterDeleteElem={true}
                                    type="button" 
                                    color="danger" 
                                    size="slim"
                                >
                                    &#x2716;
                                </Button>
                        </div>
                    </article>

                </Repeater>
        </form>  
    )
};


export default UpdateSkillGroup;