import React from 'react';

//components
import Button from "@/FormElements/Button/Button";
import Input from '@/src/common/FormElements/Input/Input';
import Select2 from '@/src/common/FormElements/Select2/Select2';
import Repeater from '@/src/common/FormElements/Repeater/Repeater';
import SingleInfo from "@/src/DataTypes/common/layouts/SingleInfo/SingleInfo";
import {TYPE_EQUIPMENT} from "@/src/DataTypes/Entity/Types";


//Utils
import {lang} from '@/src/common/Data/GlobalConstants';


/**
 * 
 * @param {string} name           //Name of formState value
 * @param {formTools} formTools   //Overall form data
 * @param {object} parentEntity   //object data of entity that uses the structure of team
 * @param {object} props          //rest of the props.
 * 
 */
const SelectEquipment = ({name, formTools, parentEntity, ...props}) => {

    return (
        <div className='px-4 border-start'>
            <Repeater
                formTools={formTools}
                className="bg-greyBg"
                name={name}
                formInitStructure={{
                    equipment: {
                        value: [],
                        isValid: true
                    },
                    qty: {
                        value: 1,
                        isValid: true
                    }
                }}
                initValues={parentEntity.equipment}
                sortable
            >
                <div className={`d-flex align-items-center gap-3 mb-2 border-b py-2 bg-greyBg rounded-1`}>
                    <div className="col align-items-start row d-flex">
                        <div className="col-9">
                            <Select2
                                name="equipment"
                                label={lang.Equipment+lang.required}
                                creatable
                                fetch={"/equipment/list"}
                                searchField={"label"}
                                selectField={"label"}
                                modalType={TYPE_EQUIPMENT}
                                validationRules={[
                                    {name: "REQUIRED"}
                                ]}
                            />
                        </div>
                        <Input 
                            className="col-3"
                            name="qty"
                            type="number"
                            label={lang.Quantity+lang.required}
                            default={1}
                            validationRules={[
                                {name: "REQUIRED"}
                            ]}
                        />
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

export default SelectEquipment