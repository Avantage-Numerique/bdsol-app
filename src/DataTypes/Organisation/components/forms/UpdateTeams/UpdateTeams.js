import React, { useRef } from 'react'

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//components
import Button from "@/FormElements/Button/Button";
import Input from '@/src/common/FormElements/Input/Input';
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";

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
            <SingleInfo
                title={props.label}
                className="py-3"
            >
            <div className='px-4 border-start'>
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
                    <div className={`${styles["team-member-row"]} d-flex align-items-center gap-3 mb-2 border-b py-2 bg-greyBg rounded-1`}>
                        <div className="col align-items-center row">
                            <div className="col-12 col-md-6">
                                <Select2
                                    name="member"
                                    label="Membre de l'équipe"
                                    formTools={formTools}
                                    creatable={false}
                                    isMulti={false}

                                    fetch={"/persons/list"}
                                    searchField={"firstName"}
                                    selectField={"fullname"}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <Input 
                                    name="role"
                                    label="Role"
                                    placeholder="Rôle dans l'équipe"
                                />
                            </div>
                        </div>
                        <div className="col col-auto h-100 pt-1">
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
            </SingleInfo>
        </>
    )
}

export default UpdateTeams