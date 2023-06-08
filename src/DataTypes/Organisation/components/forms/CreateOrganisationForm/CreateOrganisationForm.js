import React from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//FormData
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//Utils
import {replacePathname} from "@/src/helpers/url";

//Model
import Organisation from "@/DataTypes/Organisation/models/Organisation"

/**
 * @param {function} onPositiveResponse : Additionnal function to be executed if the submit response is positive
 */

const CreateOrganisationForm = ({ onPositiveResponse }) => {

    //Authentication ref
    const auth = useAuth();

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            name: {
                value: "",
                isValid: false
            },
            url: {
                value: "",
                isValid: true
            },
            description: {
                value: "",
                isValid: true
            },
        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the succes
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse()
                //Create a model for the response
                const model = new Organisation(response.data);
                //Redirection link to the edit page
                const link = "/"+replacePathname(model.singleEditRoute.pathname, {slug: model.slug});
                //Execute the redirection
                Router.push( link )
            }
        }
    );

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        const formData = {
            data: {
                name: formState.inputs.name.value,
                url:  formState.inputs.url.value,
                description: formState.inputs.description.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        };

        await submitRequest(
            `/organisations/create`,
            'POST',
            JSON.stringify(formData)
        );
    }

    return (
        <form>
            <FormUI />
                <Input 
                    name="name"
                    label="Nom"
                    className="my-1"
                    validationRules={[{name: "REQUIRED"}]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />
                <Input  
                    name="url"
                    label="Hyperlien"
                    type="url"
                    className="my-1"
                    pattern="^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
                    placeholder="Exemple : https://siteWeb.com"
                    formTools={formTools}
                />
                <RichTextarea 
                    className="my-1"
                    name="description"
                    label="Présentation / description"
                    formTools={formTools}
                />
            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>Créer</Button>
            </div>
        </form>
    )
}

export default CreateOrganisationForm