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
            teams: {
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

        const formattedTeams = formState.inputs.teams.value.map(function(team){
            return {
                status: team.status,
                offer: team.value.offer.value,
                skills: team.value.skills.value.map(skill => skill.skill._id)
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
        <form className="w-100">
            <FormUI />
            <Repeater
                    formTools={formTools}
                    name="teams"
                    formInitStructure={{
                        offer: {
                            value: "",
                            isValid: false
                        },
                        skills: {
                            value: [],
                            isValid: true
                        }
                    }}
                    initValues={parentEntity.offers}
                >


                
            </Repeater>
        </form>
    )
}

export default UpdateTeams