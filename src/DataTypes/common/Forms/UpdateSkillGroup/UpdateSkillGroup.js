import React from 'react';

//components
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Input from '@/src/common/FormElements/Input/Input';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';
import { lang } from '@/src/common/Data/GlobalConstants';


const UpdateSkillGroup = ({parentEntity, name, formTools, labelInput, labelSelect, ...props}) => {

    return (
        <div className='px-4'>
            <Repeater
                className=""
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
                <div className="d-flex mb-2 border-b py-2 rounded-1">
                    {/* Content of the elements */}
                    <section className="row col">
                        <Input
                            className="col-12"
                            label={labelInput ?? "Nom du groupe"}
                            name="groupName"
                        />
                        <div className="col-12">
                            <Select2
                                name="skills"
                                label={labelSelect ? labelSelect+lang.required : "Compétences associées"+lang.required}
                                formTools={formTools}
                                creatable={true}
                                modalType={TYPE_TAXONOMY}
                                allowedCategories={["skills", "technologies"]}
                                isMulti={true}
                                createOptionFunction={props.createOptionFunction}

                                fetch={"/taxonomies/group/skills"}
                                searchField={"name"}
                                selectField={"name"}
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                        </div>
                    </section>
                </div>

            </Repeater>
        </div>
    )
};


export default UpdateSkillGroup;