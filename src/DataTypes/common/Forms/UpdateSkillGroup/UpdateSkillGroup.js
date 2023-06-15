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
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";



const UpdateSkillGroup = ({parentEntity, positiveRequestActions, name, ...props}) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();
    
    const {FormUI, submitRequest, formState, formTools} = useFormUtils({
        skillGoups: {
            value: [],
            isValid: true
        },
    },
    //Pass a set of rules to execute a valid response of an api request
    positiveRequestActions || {
        displayResMessage: true     //Display a message to the user to confirm the succes
    })

    const submitHandler = async event => {
        
        event.preventDefault();

        const formattedOccupations = formState.inputs.skillGoups.value.map(function(occ){
            return {
                status: occ.status,
                groupName: occ.value.occupation.value,
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
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <div className='px-4 border-start'>
                <Repeater
                    className="bg-greyBg"
                    formTools={formTools}
                    name="skillGroups"
                    sortable
                    formInitStructure={{
                        [name.split("s")[0]]: {
                            value: "",
                            isValid: false
                        },
                        skills: {
                            value: [],
                            isValid: true
                        }
                    }}
                    initValues={parentEntity[name]}
                >
                    <div className="d-flex gap-3 mb-2 border-b py-2 rounded-1">
                        {/* Content of the elements */}
                        <section className="row col">
                            <Input
                                className="col-12 col-md-6"
                                label="Nom de groupe"
                                name={name.split("s")[0]}
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                            <div className="col-12 col-md-6">
                                <Select2Tag
                                    label="Attribuer des compétences"
                                    searchField="name"
                                    fetch="/taxonomies/list"
                                    requestData={{name:""}}
                                    name="skills"
                                    idField="skill"
                                />
                            </div>
                        </section>
                        {/* Delete element */}
                        <div className="col pr-0 flex-grow-0 text-secondary pt-1">
                            <Button 
                                repeaterDeleteElem={true} 
                                type="button" 
                                color="danger" 
                                size="slim"
                            >&#x2716;</Button>
                        </div>
                    </div>

                </Repeater>
            </div>
        </SingleInfo>  
    )
};


export default UpdateSkillGroup;