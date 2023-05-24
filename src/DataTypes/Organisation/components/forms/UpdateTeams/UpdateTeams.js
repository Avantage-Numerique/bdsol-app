import React, { useRef } from 'react'

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//components
import Button from "@/FormElements/Button/Button";
import Input from '@/src/common/FormElements/Input/Input';
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';

//Styling
import styles from './UpdateTeams.module.scss'


/**
 * 
 * @param {string} name Name of formState value
 * @param {formTools} formTools
 * @param {object} parentEntity object data of entity that uses the structure of team
 */
const UpdateTeams = ({name, formTools, parentEntity, ...props}) => {

    return (
        <>
            <label>{props.label}</label>
            <div className='px-4'>
                <Repeater
                    formTools={formTools}
                    name={name}
                    formInitStructure={{
                        member: {
                            value: [],
                            isValid: false
                        },
                        role: {
                            value: "",
                            isValid: true
                        }
                    }}
                    initValues={parentEntity.team}
                >
                    <div className={`${styles["team-member-row"]} d-flex align-items-center mb-2 border-b row py-2 border-top`}>
                        <div className="col row align-items-center">
                            <Select2
                                name="member"
                                label="Membre de l'équipe de l'organisation"
                                formTools={formTools}
                                creatable={false}
                                isMulti={false}

                                fetch={"/persons/list"}
                                searchField={"firstName"}
                                selectField={"fullname"}
                            />
                            <Input 
                                className="col col-sm-12 col-md-6"
                                name="role"
                                placeholder="Rôle dans l'équipe"
                            />
                        </div>
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
            </div>
        </>
    )
}

export default UpdateTeams