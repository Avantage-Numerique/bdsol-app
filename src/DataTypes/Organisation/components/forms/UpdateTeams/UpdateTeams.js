import React from 'react';

//components
import Button from "@/FormElements/Button/Button";
import Input from '@/src/common/FormElements/Input/Input';
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";

//Utils
import { lang } from '@/src/common/Data/GlobalConstants';

//Styling
import styles from './UpdateTeams.module.scss'


/**
 * 
 * @param {string} name Name of formState value
 * @param {formTools} formTools
 * @param {object} parentEntity object data of entity that uses the structure of team
 * @param {object} props rest of the props.
 */
const UpdateTeams = ({name, formTools, parentEntity, ...props}) => {

    return (
        <Repeater
            className="bg-white"
            sortable
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
            <div className={`${styles["team-member-row"]} d-flex align-items-center gap-3 mb-2 border-b py-2`}>
                <div className="col align-items-center row">
                    <div className="col-12 col-md-6">
                        <Select2
                            name="member"
                            label={lang.teamMembers}
                            creatable={false}
                            isMulti={false}
                            fetch={"/persons/list"}
                            searchField={"firstName"}
                            selectField={"fullname"}
                            validationRules={[
                                {name: "REQUIRED"},
                                {name: "ONE_OF_MANY_REQUIRED", dependencies: [
                                        {value: state => state.inputs["role"].value, listenerValue: state => state.inputs["role"].isValid}
                                    ]
                                }
                            ]}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input 
                            name="role"
                            label="Role"
                            placeholder="Rôle dans l'équipe"
                            validationRules={[
                                {name: "ONE_OF_MANY_REQUIRED", dependencies: [
                                    {value: state => state.inputs["member"].value, listenerValue: state => state.inputs["member"].isValid}
                                ]
                            }
                            ]}
                        />
                    </div>
                </div>
                <div className="col col-auto h-100 pt-1">
                    <Button 
                        repeaterDeleteElem
                        type="button" 
                        color="danger" 
                        size="slim"
                    >
                        &#x2716;
                    </Button>
                </div>
            </div>
        </Repeater>

    )
}

export default UpdateTeams