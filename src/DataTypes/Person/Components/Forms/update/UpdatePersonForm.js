import { useState } from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils'

//Components
import Button from '@/src/common/FormElements/Buttons/Button/Button'
import Input from '@/src/common/FormElements/Input/Input'
import RichTextarea from '@/src/common/FormElements/RichTextArea/RichTextarea'
import Select from '@/src/common/FormElements/Select/Select'
import Modal from '@/src/common/Containers/Modal/Modal'
import CreateTaxonomyForm from '@/src/DataTypes/Taxonomy/Components/Forms/CreateTaxonomy/CreateTaxonomyForm'
import {lang} from "@/src/common/Data/GlobalConstants";

//Form validators
import {VALIDATOR_REQUIRE} from '@/src/utils/validators'

//Styling
import styles from './UpdatePersonForm.module.scss'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UpdatePersonForm = ({initValues}) => {

    const [modal, setModal] = useState({
        display: false,
        //Values to be passed from the person form to the taxonomy form
        enteredValues: {
            name: ''            //Only the name of the taxonomy
        },
        callback: () => {}
    })

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            _id: {
                value: initValues._id ? initValues._id : "",
                isValid: true
            },
            firstName: {
                value: initValues.firstName ? initValues.firstName : "",
                isValid: false
            },
            lastName: {
                value: initValues.lastName ? initValues.lastName : "",
                isValid: false
            }, 
            nickName: {
                value: initValues.nickName ? initValues.nickName : "",
                isValid: false
            },
            description: {
                value: initValues.description ? initValues.description : "",
                isValid: true
            },
            occupations: {
                value: initValues.occupations ? initValues.occupation : [],
                isValid: true
            }
        }
        );

        //Submit the form
        const submitHandler = async event => { 

            event.preventDefault();

            const formData = {
                "data": {
                    "_id": formState.inputs._id.value,
                    "lastName": formState.inputs.lastName.value,
                    "firstName":  formState.inputs.firstName.value, 
                    "nickname": formState.inputs.nickName.value,
                    "description": formState.inputs.description.value,
                    "occupations": formState.inputs.occupations.value
                }
            };

            //Send the request with the specialized hook
            submitRequest(
                "/personnes/update",
                'POST',
                formData
            );

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
            <form onSubmit={submitHandler} className={`${styles["update-form"]}`}>

                <FormUI />
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
                    updateModal={setModal}
                />

                <Button type="submit" disabled={!formState.isValid}>{lang.submit}</Button>

            </form>

            { modal && modal.display &&
                <Modal 
                    className={`${styles["taxonomy-modal"]}`}
                    coloredBackground
                    darkColorButton
                >
                    <Container>
                        <Row>
                            <Col>                    
                                <p>Le nouvel élément de taxonomie que vous ajoutez ici pourra ensuite être directement intégrée à votre formulaire.</p>
                            </Col>
                            <Col className="px-0" sm={"auto"}><Button onClick={() => {setModal(prev => ({...prev, display: false}))}}>Fermer</Button></Col>
                        </Row>
                    </Container>
                    <div className={`${styles["hor-line"]}`}></div>
                    <CreateTaxonomyForm 
                        name={modal.enteredValues.name ? modal.enteredValues.name : ''}   //Prefilled value
                        category="occupations"
                        positiveRequestActions={{
                            //CallbackFunction is one of the four behaviors the useFormUtils hook can apply when a request return a positive answer
                            callbackFunction: requestResponse => {
                                //In this case, the modal callback receives the object to be passed which is the taxonomy item in the response of the request
                                modal.callback(requestResponse.data)
                                //Close the modal 
                                setModal(prev => ({...prev, display: false}))
                            }
                        }}
                    />
                </Modal>
            }
        </>
    )
}

export default UpdatePersonForm
