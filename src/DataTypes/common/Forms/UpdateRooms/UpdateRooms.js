import React from 'react';

//components
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Button from "@/FormElements/Button/Button"
import Input from '@/src/common/FormElements/Input/Input';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';
import { lang } from '@/src/common/Data/GlobalConstants';
import { isValid } from 'date-fns';
import Textarea from '@/src/common/FormElements/Textarea/Textarea';
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea';


const UpdateRooms = ({parentEntity, name, formTools, ...props}) => {

    return (
        <div className='px-4 border-start'>
            <Repeater
                className="bg-greyBg"
                formTools={formTools}
                name={name}
                sortable
                formInitStructure={{
                    name: {
                        value: "",
                        isValid: true,
                    },
                    description: {
                        value: "",
                        isValid: true,
                    },
                    shortDescription: {
                        value: "",
                        isValid: true,
                    },
                    placeId: {
                        value: parentEntity.id,
                        isValid: true,
                    },
                    location: {
                        value: "",
                        isValid: true,
                    }
                }}
                initValues={parentEntity[name]}
            >
                <div className="d-flex gap-3 mb-2 border-b py-2 rounded-1">
                    {/* Content of the elements */}
                    <section className="row col">
                        <Input
                            className="col-12 col-lg-6"
                            label={lang.roomName}
                            name="name"
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
                        <RichTextarea
                            name="description"
                            label={lang.description}
                            formTools={formTools}
                        />
                        <Textarea
                            name="shortDescription"
                            label={lang.shortDescription}
                            formTools={formTools}
                        />
                        <Input
                            className="col-12 col-lg-6"
                            label={"Adresse si différente"}
                            name="location"
                        />
                        
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


export default UpdateRooms;