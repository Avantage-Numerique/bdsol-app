import React from 'react'

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//components
import Button from "@/FormElements/Button/Button";
import Input from '@/src/common/FormElements/Input/Input';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';

//Styling
import styles from './UpdateTeams.module.scss'


const UpdateTeams = ({parentEntity, positiveRequestActions}) => {

    const {FormUI, submitRequest, formState, formTools} = useFormUtils(
        {
            team: {
                value: [],
                isValid: true
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    )

    const submitHandler = async event => {
        
        event.preventDefault();

        const formattedTeams = formState.inputs.team.value.map(function(singleTeam){
            return {
                status: singleTeam.status,
                member: singleTeam.value.member.value,
                role: singleTeam.value.role.value
            }
        })

        const formData = {
            "data": {
                id: parentEntity._id,
                team: formattedTeams,
                status: parentEntity.status
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/organisations/update",
            'POST',
            formData
        );

    }

    return (
        <form className={`${styles["update-teams"]} w-100 container p-0`}>
            <FormUI />
            <Repeater
                formTools={formTools}
                name="team"
                formInitStructure={{
                    member: {
                        value: "",
                        isValid: false
                    },
                    role: {
                        value: "",
                        isValid: true
                    }
                }}
                initValues={parentEntity.team}
            >
                <div className={`${styles["team-member-row"]} d-flex align-items-center mb-2 border-b row py-2`}>

                    <Select2Tag
                            className="col col-lg-2"
                            label="Personne"
                            searchField="name"
                            fetch="/persons/list"
                            requestData={{name:""}}
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                            name="member"
                            idField="member"
                        />
                    <Input 
                        className="col col-lg-2"
                        label="Rôle dans l'équipe"
                        name="role"
                    />
                    <div className="col col-auto">
                        <Button 
                            repeaterDeleteElem={true}
                            type="button" 
                            color="danger" 
                            size="slim"
                        >
                            &#x2716;
                        </Button>
                    </div>
                </div>
            </Repeater>
        </form>
    )
}

export default UpdateTeams