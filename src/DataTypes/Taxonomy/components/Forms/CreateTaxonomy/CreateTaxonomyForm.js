import React, {useContext, useEffect} from 'react'
import Router from 'next/router'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils'

//components
import Button from '@/src/common/FormElements/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select from '@/src/common/FormElements/Select/Select'

//Contexts
import {AuthContext, useAuth} from '@/auth/context/auth-context'
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from './CreateTaxonomyForm.module.scss'
import {lang} from '@/src/common/Data/GlobalConstants'
import Select2 from '@/src/common/FormElements/Select2/Select2'
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";


const CreateTaxonomyForm = ({name, category, initValues, onPositiveResponse, ...props}) => {

    const submitUri = props.uri ?? "create";

    const auth = useAuth();

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
            "meta.message": {
                value: '',
                isValid: true
            }

        },
        //Pass a set of rules to execute a valid response of an api request
        {
            displayResMessage: true,     //Display a message to the user to confirm the success
            clearForm: true,
            callbackFunction: (response) => {
                //Execute additionnal function from parent component
                if(onPositiveResponse) onPositiveResponse(response);
            }
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
                "domains": formState.inputs.domains.value ? formState.inputs.domains.value.map( (singleDomain) => {
                    return {
                        domain: singleDomain.value,
                    }
                }): [],
                /*"source": formState.inputs.source.value,*/
                "meta": getDefaultCreateEntityMeta(auth.user)
            }
        };

        if (submitUri === "update") {
            formData.data.id = initValues._id
        }

        submitRequest(
            `/taxonomies/${submitUri}`,
            'POST',
            formDat
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
                        {label: "Type d'équipement", value: "equipmentType"}
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
                    name="meta.message"
                    label="Dites nous en quelques mots la raison de l'ajout de cette catégorie"
                    labelNote="Cette information restera privée. Elle nous permet seulement de mieux comprendre la demande d'ajout."
                    placeholder="Je préfère cette appellation pour décrire mon activité professionnelle plutôt qu'une autre [...]"
                    formTools={formTools}
                />

                <Select2
                    name="domains"
                    label={lang.Domains}
                    formTools={formTools}
                    creatable={false}
                    isMulti={true}

                    fetch={"/taxonomies/list"}
                    requestData={domainQuery}
                    searchField={"name"}
                    selectField={"domains"}
                />

                <div className="col-12">
                    <Button type="button" onClick={submitHandler} disabled={!formState.isValid}>Soumettre</Button>
                </div>

            </form>
        </>
    )
}
export default CreateTaxonomyForm