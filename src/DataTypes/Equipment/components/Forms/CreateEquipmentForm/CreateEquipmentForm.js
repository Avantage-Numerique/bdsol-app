import React from 'react'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import Select2 from '@/src/common/FormElements/Select2/Select2'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {lang} from '@/src/common/Data/GlobalConstants';

//FormData
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import {TYPE_TAXONOMY} from '@/src/DataTypes/Entity/Types';


const CreateEquipmentForm = ({ onPositiveResponse, initValues }) => {
    
    //Authentication ref
    const auth = useAuth();

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            equipmentType: {
                value: initValues?.equipmentType ?? "",
                isValid: false
            },
            label: {
                value: initValues?.label ? initValues.label : initValues?.name ?? "",
                isValid: false
            },
            brand: {
                value: initValues?.brand ?? "",
                isValid: true
            },
            modelName: {
                value: initValues?.modelName ?? "",
                isValid: true
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse(response)
            }
        }
    );
    

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            data: {
                equipmentType: formState.inputs.equipmentType.value.value,
                label:  formState.inputs.label.value,
                brand: formState.inputs.brand.value,
                modelName: formState.inputs.modelName.value,
                meta: getDefaultCreateEntityMeta(auth.user),
            }
        };

       await submitRequest(
            `/equipment/create`,
            'POST',
            JSON.stringify(formData)
        );
    }

    return (
        
       <form onSubmit={submitHandler}>
            <FormUI />
            <div>
                <Select2
                    name="equipmentType"
                    label={lang.equipmentType}
                    formTools={formTools}
                    creatable={true}
                    modalType={TYPE_TAXONOMY}
                    isMulti={false}

                    placeholder={lang.equipmentTypePlaceholder}
                    fetch={"/taxonomies/list"}
                    requestData={{category:"equipmentType", name:""}}
                    searchField={"name"}
                    selectField={"name"}
                />
                <Input  
                    name="label"
                    label={lang.label}
                    formTools={formTools}
                    placeholder={lang.labelPlaceholder}
                />
                <Input  
                    name="brand"
                    label={lang.brand}
                    formTools={formTools}
                />
                <Input  
                    name="modelName"
                    label={lang.modelName}
                    formTools={formTools}
                />
            </div>
            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>{lang.continue}</Button>
            </div>
        </form> 
    );
}

export default CreateEquipmentForm;
