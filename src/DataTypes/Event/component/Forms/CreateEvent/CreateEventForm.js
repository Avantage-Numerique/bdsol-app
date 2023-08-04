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
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import {replacePathname} from "@/src/helpers/url";

//Context
import {useAuth} from "@/src/authentification/context/auth-context";

//Model
import Event from '../../../models/Event';


/**
 * @param {function} onPositiveResponse : Additionnal function to be executed if the submit response is positive
 */
const CreateEventForm = ({ onPositiveResponse }) => {

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
                isValid: true
            },
            startDate: {
                value: "",
                isValid: true
            },
            endDate: {
                value: "",
                isValid: true
            }
        },//Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse();

                //Create a model for the response
                const model = new Event(response.data);

                //Redirection link to the edit page
                const link = "/"+replacePathname(model.singleEditRoute.pathname, {slug: model.slug});
                //Execute the redirection
                Router.push( link )
            }
        }
    );

    const submitHandler = async event => {
        
        event.preventDefault();
        
        const formData = {
            "data": {
                name: formState.inputs.name.value,
                entityInCharge: formState.inputs.entityInCharge?.value?.value,
                startDate: formState.inputs.startDate.value,
                endDate: formState.inputs.endDate.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        }
        
        //Add data to the formData
        await submitRequest(
            "/events/create",
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
                label={lang.eventName}
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
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
            <Input 
                name="startDate"
                className="my-1"
                type="date"
                label={lang.startDate}
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
            />    
            <Input 
                name="endDate"
                className="my-1"
                type="date"
                label={lang.endDate}
                formTools={formTools}
                validationRules={[
                    {name: "REQUIRED"}
                ]}
            />    
            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>Créer</Button>
            </div>
        </form>
    )
}

export default CreateEventForm;