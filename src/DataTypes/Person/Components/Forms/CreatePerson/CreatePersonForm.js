import React from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'
import { useModal } from '@/src/hooks/useModal/useModal'

//Components
import Button from '@/FormElements/Button/Button'
import Input from '@/FormElements/Input/Input'
import RichTextarea from '@/FormElements/RichTextArea/RichTextarea'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";
import Select2Tag from '@/src/common/FormElements/Select2/Select2Tag'
import Modal from '@/src/hooks/useModal/Modal/Modal'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

//Styling
import styles from './CreatePersonForm.module.scss'

//FormData
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";
import { getSelectedToFormData } from '@/src/common/FormElements/Select2/Select2Tag'
import SingleBaseHeader from '@/src/DataTypes/common/layouts/single/defaultSections/SingleBaseHeader'
import SingleBase from '@/src/DataTypes/common/layouts/single/SingleBase'

const CreatePersonForm = ({initValues, positiveRequestActions, ...props}) => {


    const submitUri = props.uri ?? "create";

    //Authentication ref
    const auth = useAuth();

    //Modal hook
    const modal = useModal()

    //Main form functionalities
    //not used : transmuteTaxonomyTargetInput
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            _id: {
                value: initValues?._id ?? "",
                isValid: true
            },
            firstName: {
                value: initValues?.firstName ?? "",
                isValid: false
            },
            lastName: {
                value: initValues?.lastName ?? "",
                isValid: false
            },
            nickName: {
                value: initValues?.nickname ?? "",
                isValid: true
            },
            description: {
                value: initValues?.description ?? "",
                isValid: true
            },
            catchphrase: {
                value: initValues?.catchphrase ?? "",
                isValid: true
            },
            domains: {
                value: initValues?.domains ?? [],
                isValid: true
            }
        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
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
                catchphrase: formState.inputs.catchphrase.value,
                //occupations: [],//the state of this is unstable, it get always the form to crash.//getSelectedToFormData(formState.inputs.occupations.value, "occupation", auth.user),
                domains: getSelectedToFormData(formState.inputs.domains.value, "domain", auth.user),
                status: getDefaultCreateEntityStatus(auth.user),
            }
        };

        if (submitUri === "update") {
            formData.data.id = initValues._id
        }

       await submitRequest(
            `/persons/${submitUri}`,
            'POST',
            JSON.stringify(formData)
        );
    }



    const title = (
        <>
            <Input 
                name="firstName"
                label="Prénom"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            <Input 
                name="lastName"
                label="Nom"
                validationRules={[
                    {name: "REQUIRED"}
                ]}
                errorText="Cette information est requise"
                formTools={formTools}
            />

            <Input  
                name="nickName"
                label="Surnom"
                formTools={formTools}
            />

            <Input
                name="catchphrase"
                label={lang.catchphrase}
                formTools={formTools}
            />
        </>
    );
    //const subtitle = ();
    const type = "Person";
    const header = ( <SingleBaseHeader title={title} type={type}/> );

    const contentColumnLeft = (
        <>
            <RichTextarea 
                name="description"
                label="Biographie / description"
                formTools={formTools}
            />

        </>
    )

    const contentColumnRight = (
        <>
            <Select2Tag
                label={lang.Domains}
                searchField="name"
                fetch="/taxonomies/list"
                requestData={{category:"domains", name:""}}
                name="domains"
                idField="domain"
                placeholder={lang.domainsInputPlaceholder}
                formTools={formTools}
                creatableModal={modal}
            />
        </>
    )

    return (
        <>
        
            <form 
                onSubmit={submitHandler} 
                className={`${styles["create-person-form"]}`}
            >
                <FormUI />
                <SingleBase
                    header={header}
                    contentColumnLeft={contentColumnLeft}
                    contentColumnRight={contentColumnRight}
                />

                <blockquote>
                    * Note : {lang.personUploadMediaMainImage}
                </blockquote>

                <Button type="submit" disabled={!formState.isValid}>{lang.submit}</Button>

            </form>

            { modal.modal.display &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <header className={`d-flex`}>
                        <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                        <Button onClick={modal.closeModal}>Fermer</Button>
                    </header>               
                      
                    {/* Separation line */}
                    <div className={`my-4 border-bottom`}></div>

                    <CreateTaxonomyForm 
                        name={modal.modal.enteredValues.name ? modal.modal.enteredValues.name : ''}   //Prefilled value
                        category="skills"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {

                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.modal.callback(requestResponse.data)
                                
                                //Close the modal 
                                modal.closeModal()
                            }
                        }}
                    />

                </Modal>
            }
        </>
    );
}

export default CreatePersonForm
