import React from 'react';
import Router from 'next/router'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import SelectFetch from '@/FormElements/Select/SelectFetch'
import Select2 from '@/FormElements/Select2/Select2'

//Utils
import {lang} from "@/src/common/Data/GlobalConstants";
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";
import {replacePathname} from "@/src/helpers/url";

//Context
import {useAuth} from "@/src/authentification/context/auth-context";

//Model
import Project from "@/src/DataTypes/Project/models/Project"


/**
 * @param {function} onPositiveResponse : Additionnal function to be executed if the submit response is positive
 */
const CreateProjectForm = ({ onPositiveResponse, initValues }) => {

    //Authentication ref
    const auth = useAuth();

    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: initValues?.name ?? "",
                isValid: true
            },
            entityInCharge: {
                value: initValues?.entityInCharge ?? "",
                isValid: true
            },
            context: {
                value: initValues?.context ?? "",
                isValid: true
            }
        },//Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse(response);
            }
        }
    );

    const submitHandler = async event => {
        
        event.preventDefault();
        
        const formData = {
            "data": {
                name: formState.inputs.name.value,
                entityInCharge: formState.inputs.entityInCharge?.value?.value,
                context: formState.inputs.context.value !== "" ? formState.inputs.context.value : undefined,
                meta: getDefaultCreateEntityMeta(auth.user),
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/projects/create",
            'POST',
            formData
        );
    }

    return (
        <form>
            <FormUI />
            <Input 
                name="name"
                className="my-1"
                label={"Nom du projet"+lang.required}
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
            />    
            <SelectFetch 
                name="context"
                label="Choisissez un contexte"
                className="my-1"
                formTools={formTools}
                //validationRules={[{name: "REQUIRED"}]}
                noValueText={lang.noSelectedOption}
                fetchOption="context-enum"
            />
            <Select2
                name="entityInCharge"
                className="my-1"
                label={lang.entityInCharge}
                formTools={formTools}
                creatable={false}
                isMulti={false}
                fetch={"/organisations/list"}
                searchField={"name"}
                selectField={"name"}
            />
            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>{lang.continue}</Button>
            </div>
        </form>
    )
}

export default CreateProjectForm;