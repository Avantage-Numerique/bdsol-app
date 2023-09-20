import React from 'react';

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//context
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import {useAuth} from '@/auth/context/auth-context';

//components
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';

//styling
import styles from './UpdateOffers.module.scss';


const UpdateOffers = ({parentEntity, positiveRequestActions}) => {
    
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
                groupName: occ.value.groupName.value,
                skills: occ.value.skills.value.map(skill => skill.skill._id)
            }
        })

        const formData = {
            "data": {
                id: parentEntity._id,
                offers: formattedOccupations,
                meta: parentEntity.meta
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
                    name="skillGroups"
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
                    isSortable={true}
                    initValues={parentEntity.offers}
                    className={`rounded p-2 my-2 bg-white ${styles["update-skill-group"]}`}
                >
                    <>
                        {/* Content of the elements */}
                        <section className={`
                            col
                            ${styles["skill-group-inputs-container"]}
                        `}>
                            <Input 
                                label="Nom de l'offre"
                                name="groupName"
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
                        <div className="col pe-0 flex-grow-0 text-secondary">
                            <Button 
                                    repeaterdeletedlem={true}
                                    type="button" 
                                    color="danger" 
                                    size="slim"
                                >
                                    &#x2716;
                                </Button>
                        </div>
                    </>

                </Repeater>

                <Button type="button" onClick={submitHandler} disabled={!formState.isValid}>
                    Soumettre
                </Button>

        </form>  
    )
};


export default UpdateOffers;