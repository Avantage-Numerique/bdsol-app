import React from 'react';

//components
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import { TYPE_TAXONOMY } from '@/src/DataTypes/Entity/Types';



const UpdateSkillGroup = ({parentEntity, name, formTools, ...props}) => {

    return (
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
                            className="col-12 col-lg-6"
                            label="Titre de l'offre"
                            name="groupName"
                        />
                        <div className="col-12 col-lg-6">
                            <Select2
                                name="skills"
                                label="Compétences qui la compose"
                                formTools={formTools}
                                creatable={true}
                                modalType={TYPE_TAXONOMY}
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
                    {/* Delete element */}
                    <div className="col pr-0 flex-grow-0 text-secondary pt-1">
                        <Button 
                            repeaterDeleteElem
                            type="button" 
                            color="danger" 
                            size="slim"
                        >&#x2716;</Button>
                    </div>
                </div>

            </Repeater>
        </div>
    )
};


export default UpdateSkillGroup;