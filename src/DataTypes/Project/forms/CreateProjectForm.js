import React from 'react';

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import SelectFetch from '@/FormElements/Select/SelectFetch'
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag'

//Utils 
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

const CreateProjectForm = () => {

    //Authentication ref
    const auth = useAuth();


    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: "",
                isValid: true
            },
            entityInCharge: {
                value: "",
                isValid: false
            },
            context: {
                value: "",
                isValid: true
            }
        },/* 
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        } */
    );

    const submitHandler = async event => {
        
        event.preventDefault();
        
        const formData = {
            "data": {
                name: formState.input.name.value,
                entityInCharge: formState.input.entityInCharge.value,
                context: formState.input.context.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/project/create",
            'POST',
            formData
        );
    }

    return (
        <form>
            <FormUI />

            <Input 
                name="name"
                label="Nom du projet"
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
            />

            <Select2Tag 
                name="entityInCharge"
                fetch="/organisations/list"
                requestData={{name:""}}
                label="Organisation en charge"
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                //idField=""
            />
{/* 
            <SelectFetch 
                name="context"
                label="Choisissez un context"
                formTools={formTools}
                //noValueText="Contextes"
                fetchOptions="context-enum"
            />
 */}
            <Button onClick={submitHandler}>
                Soumettre
            </Button>
        </form>
    )
}

export default CreateProjectForm;