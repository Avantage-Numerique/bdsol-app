import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select from '@/src/common/FormElements/Select/Select'

//Contexts
import {AuthContext, useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateTaxonomyForm.module.scss'


const CreateTaxonomyForm = ({name, category, positiveRequestActions}) => {

    /*
        Could be a great idea for every form in the application to have the possibility 
        to recieve initial values passed as props with the exact corresponding field name
        Ex : name

        V.P.R. 
    */

    //Import the authentication context to make sure the user is well connected
    const auth = useAuth();

    //Import message context 
    const msg = useContext(MessageContext);

    /*
    First of all, verify if the user is logged in.
    If he isn't, then redirect him in the connexion page
    */
    useEffect(() => {
        if(!auth.user.isLoggedIn) {
            msg.addMessage({ 
                text: "Vous devez être connecté pour pouvoir ajouter une entité à la base de données.",
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.user.isLoggedIn])


    //Custom hook to manage the validity of the form
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            category: {
                value: (category ? category : ''),
                isValid: true
            },

            name: {
                value: (name ? name : ''),
                isValid: true
            }, 
            description: {
                value: '',
                isValid: true
            }, 
            "status.message": {
                value: '',
                isValid: true
            }

        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || undefined         
    )

    //Submit the form
    const submitHandler = async event => { 

        event.preventDefault();

        /*
            Data must have this shape 
            https://github.com/Avantage-Numerique/bdsol-api/blob/master/api/doc/Taxonomy.md
        */

        //There is no try/catch here because it is all handle by the custom hook

        const formData = {
            "data": {
                "category": formState.inputs.category.value,
                "name":  formState.inputs.name.value, 
                "description": formState.inputs.description.value,
                /*"source": formState.inputs.source.value,*/
                "status": {
                    "state": "Pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id,
                    "message": formState.inputs["status.message"].value
                }//Hardcoded status to send at creation (Temporary, until we moderate it with the API)
            }
        };

        submitRequest(
            "/taxonomies/create",
            'POST',
            formData
        )

    }


    //Prevent from displaying is the user is not logged in or if the app doesn't know the authentication state yet
    if(auth.user.isLoggedIn)
    return (
        <>
            <form onSubmit={submitHandler} className={`col-12 ${styles["create-taxonomy-form"]}`}>
                <FormUI />

                <Select 
                    name="category"
                    label="Catégorie"
                    formTools={formTools}
                    noValueText="Choisissez une taxonomie"
                    options={[
                        {label: "Occupation", value: "occupations"},
                        {label: "Domaine", value: "domains", disabled: true},
                        {label: "Compétence", value: "abilities", disabled: true},
                        {label: "Aptitude", value: "skills", disabled: true}
                    ]}
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                />

                <Input
                    name="name"
                    label="Nom"
                    formTools={formTools}
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                />

                <Input
                    name="description"
                    label="Description"
                    formTools={formTools}
                />

                <RichTextarea
                    name="status.message"
                    label="Dites nous en quelques mots la raison de l'ajout"
                    placeholder="Il s'agit du titre de mon métier [...]"
                    formTools={formTools}
                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>

            </form>
        </>
    )
}
export default CreateTaxonomyForm