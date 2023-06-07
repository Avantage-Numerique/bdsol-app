import React from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'

//FormData
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

import Person from "@/DataTypes/Person/Models/Person";
import {replacePathname} from "@/src/helpers/url";

const CreatePersonForm = () => {
    
    //Authentication ref
    const auth = useAuth();

    //Main form functionalities
    //not used : transmuteTaxonomyTargetInput
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            firstName: {
                value: "",
                isValid: false
            },
            lastName: {
                value: "",
                isValid: false
            },
            nickName: {
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
                //Create a model for the response
                const model = new Person(response.data);
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
                lastName: formState.inputs.lastName.value,
                firstName:  formState.inputs.firstName.value,
                nickname: formState.inputs.nickName.value,
                description: formState.inputs.description.value,
                status: getDefaultCreateEntityStatus(auth.user),
            }
        };

       await submitRequest(
            `/persons/create`,
            'POST',
            JSON.stringify(formData)
        );
    }

    return (
        
       <form 
            onSubmit={submitHandler} 
            className={`${styles["create-person-form"]}`}
        >
            <FormUI />
            <div className="row">
                <Input 
                    name="firstName"
                    label="Prénom"
                    className="col-12 col-md-6"
                    validationRules={[{name: "REQUIRED"}]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />

                <Input 
                    name="lastName"
                    label="Nom"
                    className="col-12 col-md-6"
                    validationRules={[{name: "REQUIRED"}]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />
            </div>
            <div className="row">

            <Input  
                name="nickName"
                label="Surnom"
                formTools={formTools}
            />
            </div>
            <div className="row">

               <RichTextarea 
                className="my-3"
                name="description"
                label="Biographie / description"
                formTools={formTools}
            />
            </div>
            <div className="d-flex justify-content-end">
                <Button disabled={!formState.isValid} type="button" onClick={submitHandler}>Créer</Button>
            </div>
        </form> 
    );
}

export default CreatePersonForm
