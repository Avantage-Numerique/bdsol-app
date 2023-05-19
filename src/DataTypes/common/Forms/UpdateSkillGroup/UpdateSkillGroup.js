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
import Icon from '@/src/common/widgets/Icon/Icon';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';


const UpdateSkillGroup = ({formTools, name, parentEntity, positiveRequestActions, ...props}) => {

    return (
        <form className="w-100">
                <label>{props.label}</label>
                <div className='px-4'>
                    <Repeater
                        formTools={formTools}
                        name={name}
                        formInitStructure={{
                            [name.split("s")[0]]: {
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
                        <article className="row my-2 bg-white border-top">
                            {/* Content of the elements */}
                            <section className="col my-2">
                                <Input 
                                    label="Nom de groupe"
                                    name={name.split("s")[0]}
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
                            <div className="col pr-0 flex-grow-0 text-secondary pt-3">
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
                </div>
        </form>  
    )
};


export default UpdateSkillGroup;