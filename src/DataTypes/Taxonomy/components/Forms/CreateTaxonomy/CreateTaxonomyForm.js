import React, { useContext, useEffect } from 'react'
import Router from 'next/router'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/src/common/FormElements/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select from '@/src/common/FormElements/Select/Select'

//Contexts
import {AuthContext, useAuth} from '@/auth/context/auth-context'
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateTaxonomyForm.module.scss'
import { lang } from '@/src/common/Data/GlobalConstants'
import Select2 from '@/src/common/FormElements/Select2/Select2'
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import {useModal} from "@/src/hooks/useModal/useModal";


const CreateTaxonomyForm = ({name, category, initValues, positiveRequestActions, ...props}) => {

    const submitUri = props.uri ?? "create";

    /*
        Could be a great idea for every form in the application to have the possibility 
        to recieve initial values passed as props with the exact corresponding field name
        Ex : name

        V.P.R.

        yessss 8-)

        M-A.M.
    */

    const auth = useAuth();

    const msg = useContext(MessageContext);

    const modal = useModal();

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
                value: initValues?.category ?? '',
                isValid: true
            },
            name: {
                value: initValues?.name ?? '',
                isValid: true
            }, 
            description: {
                value: initValues?.description ?? '',
                isValid: true
            },
            domains: {
                value: initValues?.domains ?? [],
                isValid: true
            },
            "status.message": {
                value: '',
                isValid: true
            }

        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }         
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
                "domains": formState.inputs.domains.value,
                /*"source": formState.inputs.source.value,*/
                "status": getDefaultCreateEntityStatus(auth.user)
            }
        };

        if (submitUri === "update") {
            formData.data.id = initValues._id
        }

        submitRequest(
            `/taxonomies/${submitUri}`,
            'POST',
            formData
        );
    }

    let domainQuery = {
        category:"domains",
        name:""
    };

    if (submitUri === "update") {
        domainQuery._id = `ne:${initValues._id}`;
    }


    //Prevent from displaying is the user is not logged in or if the app doesn't know the authentication state yet
    if(auth.user.isLoggedIn)
    return (
        <>
            <form onSubmit={submitHandler} className={`col-12 ${styles["create-taxonomy-form"]}`}>
                <FormUI />

                <Select 
                    name="category"
                    label="Type de catégorie"
                    formTools={formTools}
                    noValueText="Choisissez une catégorie"
                    options={[
                        {label: "Compétence", value: "skills"},
                        {label: "Technologie", value: "technologies"},
                        {label: "Domaine", value: "domains"},
                        {label: "Aptitude", value: "abilities", disabled: true}
                    ]}
                    validationRules={[
                        {name: "REQUIRED"}
                    ]}
                    defaultValue={category}
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
                    label="Dites nous en quelques mots la raison de l'ajout de cette catégorie"
                    labelNote="Cette information restera privée. Elle nous permet seulement de mieux comprendre la demande d'ajout."
                    placeholder="Je préfère cette appellation pour décrire mon activité professionnelle plutôt qu'une autre [...]"
                    formTools={formTools}
                />

                <Select2
                    name="domains"
                    label={lang.Domains}
                    formTools={formTools}
                    creatable={true}
                    isMulti={true}

                    fetch={"/taxonomies/list"}
                    requestData={{category:"domains", name:""}}
                    searchField={"name"}
                    selectField={"domains"}
                />

                <div className="col-12">
                    <Button type="submit" disabled={!formState.isValid}>Soumettre</Button>
                </div>

            </form>
        </>
    )
}
export default CreateTaxonomyForm