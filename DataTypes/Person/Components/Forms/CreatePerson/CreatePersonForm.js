import React, { useContext } from 'react'

//Custom hooks
import { useForm } from '../../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../../app/hooks/http-hook'

//Components
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import RichTextarea from '../../../../../app/common/FormElements/RichTextArea/RichTextarea'
import Select from '../../../../../app/common/FormElements/Select/Select'
import Spinner from '../../../../../app/common/widgets/spinner/Spinner'
import CommonFormFeatures from '../../../../common/layouts/CommonFormFeatures/CommonFormFeatures'

//contexts
import { MessageContext } from '../../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Form validators
import {VALIDATOR_REQUIRE} from '../../../../../app/utils/validators'

//Styling
import styles from './CreatePersonForm.module.scss'
import {lang} from "../../../../../app/common/Data/GlobalConstants";

const CreatePersonForm = () => {

    //Import message context 
    const msg = useContext(MessageContext);

    //Extract the functions inside useHttpClient
    const {isLoading, sendRequest} = useHttpClient();

    //Custom hook to manage the validity of the form 
    const [formState, formTools, clearFormData] = useForm(
    {
        firstName: {
            value: '',
            isValid: false
        },
        lastName: {
            value: '',
            isValid: false
        }, 
        nickName: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: true
        },
        occupations: {
            value: [],
            isValid: true
        }
    }, 
    false)
        

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();
        
        //Make sure that the form is valid before submitting it
        if(formState.isValid){

            /*
                Data must have this shape 
                https://github.com/Avantage-Numerique/bdsol-api/blob/master/api/doc/Personnes.md
            */

            //There is no try/catch here because it is all handle by the custom hook

            const formData = {
                "data": {
                    "lastName": formState.inputs.lastName.value,
                    "firstName":  formState.inputs.firstName.value, 
                    "nickname": formState.inputs.nickName.value,
                    "description": formState.inputs.description.value,
                    "occupations": formState.inputs.occupations.value
                }
            };

            //Send the request with the specialized hook
            const response = await sendRequest(
                "/personnes/create",
                'POST',
                JSON.stringify(formData)
            );

            msg.addMessage({
                text: response.message,
                positive: !response.error
            });

            if(!response.error) {
                clearFormData()
            }
            
        } else {
            //The form is not valid. 
            //Inform the user
            msg.addMessage({ 
                text: lang.formNotValid,//"Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                positive: false
            })
        }
    }

    /*
        Categorie : nom de la taxonomie
        Name : Filtre à appliquer
    */
    const occupationSelectRequestData = {
        "data": {
            "category": "occupations",
            "name": ""
        }
    };


    return (
        <>
            { isLoading && <Spinner fixed /> }
            <form onSubmit={submitHandler} className={`col-12 ${styles["create-person-form"]}`}>

                <Input 
                    name="firstName"
                    label="Prénom"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />

                <Input 
                    name="lastName"
                    label="Nom"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Cette information est requise"
                    formTools={formTools}
                />

                <Input  
                    name="nickName"
                    label="Surnom"
                    formTools={formTools}
                />
                
                <RichTextarea 
                    name="description"
                    label="Biographie / description"
                    validators={[VALIDATOR_REQUIRE()]}
                    formTools={formTools}
                />

                <Select
                    name="occupations"
                    label={lang.Occupations}
                    request="/taxonomies/list/"
                    requestData={occupationSelectRequestData}
                    tag="occupations"
                    placeholder={lang.occupationsPlaceholder}
                    formTools={formTools}
                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>{lang.submit}</Button>
                </div>

            </form>
   
        </>
    );
}

export default CreatePersonForm;


export const FormattedPersonForm = () => {
    return (
        <>
            <CommonFormFeatures>
                <CreatePersonForm />
            </CommonFormFeatures>
        </>
    );
}