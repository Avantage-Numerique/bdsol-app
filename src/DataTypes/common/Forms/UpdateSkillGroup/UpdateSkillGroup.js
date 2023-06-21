import React from 'react';

//hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//context
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import {useAuth} from '@/auth/context/auth-context';

//components
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Icon from '@/src/common/widgets/Icon/Icon';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import SingleInfo from "@/DataTypes/common/layouts/SingleInfo/SingleInfo";
import { useEffect } from 'react';



const UpdateSkillGroup = ({parentEntity, positiveRequestActions, name, formTools, ...props}) => {

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    return (
        <SingleInfo
            title={props.label}
            className="py-3"
        >
            <div className='px-4 border-start'>
                <Repeater
                    className="bg-greyBg"
                    formTools={formTools}
                    name={name}
                    sortable
                    formInitStructure={{
                        groupName: {
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
                                name="groupName"
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                            <div className="col-12 col-md-6">
                                <Select2
                                    name="skills"
                                    label="Attribuer des compétences"
                                    formTools={formTools}
                                    creatable={true}
                                    isMulti={true}
                                    createOptionFunction={props.createOptionFunction}

                                    fetch={"/taxonomies/list"}
                                    searchField={"name"}
                                    selectField={"name"}
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