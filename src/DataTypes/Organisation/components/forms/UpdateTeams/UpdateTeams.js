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
        <div className='px-4 border-start'>
            <Repeater
                className="bg-greyBg"
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
                        <div className="col-12 col-lg-6">
                            <Select2
                                name="member"
                                label={lang.teamMember}
                                creatable={false}
                                isMulti={false}
                                fetch={"/persons/list"}
                                searchField={"firstName"}
                                selectField={"fullname"}
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <Input 
                                name="role"
                                label={lang.roleInTeam}
                                //placeholder="Rôle dans l'équipe"
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
        </div>
    )
}

export default UpdateTeams