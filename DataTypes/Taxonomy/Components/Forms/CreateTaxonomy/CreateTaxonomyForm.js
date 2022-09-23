import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '../../../../../app/hooks/useFormUtils/useFormUtils'

//Components
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import RichTextarea from '../../../../../app/common/FormElements/RichTextArea/RichTextarea'

//Contexts
import { AuthContext } from '../../../../../authentication/context/auth-context'
import { MessageContext } from '../../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateTaxonomyForm.module.scss'


const CreateTaxonomyForm = ({name, positiveRequestActions}) => {

    /*
        Could be a great idea for every form in the application to have the possibility 
        to recieve initial values passed as props with the exact corresponding field name
        Ex : name

        V.P.R. 
    */

    //Import the authentication context to make sure the user is well connected
    const auth = useContext(AuthContext);

    //Import message context 
    const msg = useContext(MessageContext);

    //@todo fetch that from /taxonomies/supported endpoint.
    // prop = Label, value = option's value
    const taxonomies = {
        occupations: "Occupation",
        domains: "Domaine",
        abilities: "Compétence",
        skills: "Aptitude"
    };

    /*
    First of all, verify if the user is logged in.
    If he isn't, then redirect him in the connexion page
    */
    useEffect(() => {
        if(!auth.isLoggedIn) {
            msg.addMessage({ 
                text: "Vous devez être connecté pour pouvoir ajouter une entité à la base de données.",
                positive: false 
            })
            Router.push('/compte/connexion')
        }
    }, [auth.isLoggedIn, auth.isPending])


    //Custom hook to manage the validity of the form
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            category: {
                value: '',
                isValid: false
            },
            name: {
                value: (name ? name : ''),
                isValid: true
            }, 
            description: {
                value: '',
                isValid: true
            }, 
            source: {
                value: '',
                isValid: true
            },
            status: {
                value: '',
                isValid: true
            },
            addReason: {
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
                "source": formState.inputs.source.value,
                "status": "Pending",
                "addReason": formState.inputs.addReason.value
            }
        };

        submitRequest(
            "/taxonomies/create",
            'POST',
            formData
        )

    }


    //Prevent from displaying is the user is not logged in or if the app doesn't know the authentication state yet
    if(!auth.isPending && auth.isLoggedIn)
    return (
        <>
            <form onSubmit={submitHandler} className={`col-12 ${styles["create-taxonomy-form"]}`}>
                <FormUI />
                <div>
                    <label htmlFor="category">
                        Catégorie
                    </label>
                    <br/>
                    <select 
                        className={`${styles["select-component"]}`}
                        name="category"
                        required={true}
                        onChange={ (e) => { formTools.inputHandler( "category", e.target.value, (e.target.value !== "0" && e.target.value !== "") )}}>
                        <option value="">-- Choisissez une taxonomy --</option>
                        {Object.keys(taxonomies).map((key) => {
                            return (
                                <option key={`taxonomy-${key}`} value={key}>{taxonomies[key]}</option>
                            );
                        })}
                    </select>
                </div>

                <Input
                    name="name"
                    label="Nom"
                    formTools={formTools}
                />

                <Input
                    name="description"
                    label="Description"
                    formTools={formTools}
                />

                <RichTextarea
                    name="addReason"
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