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
//import Icon from '@/src/common/widgets/Icon/Icon';
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
                status: occ.status,
                offer: occ.value.offer.value,
                skills: occ.value.skills.value.map(skill => skill.skill._id)
            }
        })

        const formData = {
            "data": {
                id: parentEntity._id,
                offers: formattedOccupations,
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
                    name="skillGoups"
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
                    <article className={`
                        row border border-1 rounded p-2 my-2 bg-white
                        ${styles["update-skill-group"]}
                    `}>
                        {/* Content of the elements */}
                        <section className={`
                            col
                            ${styles["skill-group-inputs-container"]}
                        `}>
                            <Input 
                                label="Nom de l'offre"
                                name="offer"
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

                <Button type="button" onClick={submitHandler} disabled={!formState.isValid}>
                    Soumettre
                </Button>

        </form>  
    )
};


export default UpdateOffers;