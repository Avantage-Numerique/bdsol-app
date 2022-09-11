import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useForm } from '../../../../../app/hooks/form-hook'
import { useHttpClient } from '../../../../../app/hooks/http-hook'

//Components
import Button from '../../../../../app/common/FormElements/Buttons/Button/Button'
import Input from '../../../../../app/common/FormElements/Input/Input'
import RichTextarea from '../../../../../app/common/FormElements/RichTextArea/RichTextarea'
import Spinner from '../../../../../app/common/widgets/spinner/Spinner'

//Contexts
import { AuthContext } from '../../../../../authentication/context/auth-context'
import { MessageContext } from '../../../../../app/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateTaxonomyForm.module.scss'


const CreateTaxonomyForm = () => {

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

    //Extract the functions inside useHttpClient
    const { isLoading, sendRequest} = useHttpClient();

    //Custom hook to manage the validity of the form
    const [formState, formTools] = useForm(
        {
            category: {
                value: '',
                isValid: false
            },
            name: {
                value: '',
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
        false)

        //Submit the form
        const submitHandler = async event => { 

        event.preventDefault();
        
        //Make sure that the form is valid before submitting it
        if(formState.isValid){


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

            //Send the request with the specialized hook
            const response = await sendRequest (
                "/taxonomies/create",
                'POST',
                JSON.stringify(formData),
                { 'Content-Type': 'application/json' }
            )

            //If the answer is positive
            if(!response.error){
                //Alert the user
                msg.addMessage({ 
                    text: response.message,
                    positive: true 
                })

            //If it is not positive for any reason
            } else {                    
                msg.addMessage({ 
                    text: response.message,
                    positive: false 
                })
            }

        } else {
            //The form is not valid. 
            //Inform the user
            msg.addMessage({ 
                text: "Attention. Le formulaire envoyé n'est pas valide. Assurez-vous que tous les champs sont bien remplis.",
                positive: false
            })
        }

    }

    //Prevent from displaying is the user is not logged in or if the app doesn't know the authentication state yet
    if(!auth.isPending && auth.isLoggedIn)
    return (
        <>
            { isLoading && <Spinner fixed />}

            <form onSubmit={submitHandler} className={`col-12 ${styles["create-taxonomy-form"]}`}>
                <div>
                    <label htmlFor="category">
                        Catégorie
                    </label>
                    <br/>
                    <select 
                        className={`${styles["select-component"]}`}
                        name="category"
                        required="true"
                        onChange={ (e) => { formTools.inputHandler( "category", e.target.value, (e.target.value !== "0" && e.target.value !== "") )}}>
                        <option value="">-- Choisissez une taxonomy --</option>
                        {Object.keys(taxonomies).map((key) => {
                            return (
                                <option value={key}>{taxonomies[key]}</option>
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