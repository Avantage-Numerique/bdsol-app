import {useEffect, useState} from 'react'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useHttpClient} from '@/src/hooks/http-hook'

//components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import SelectLicence from '@/src/common/FormElements/SelectLicence/SelectLicence';
import Input from '@/FormElements/Input/Input'
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {getDefaultCreateEntityMeta} from "@/src/DataTypes/Meta/EntityMeta";

//Styling
import styles from "./CreateMediaForm.module.scss";
import EntityTag from "@/DataTypes/Entity/layouts/EntityTag";

import {getDefaultImageByEntityType} from "@/src/helpers/images";


const CreateMediaForm = (props) => {
    
    const mediaField = props.mediaField ?? 'mainImage'
    const {
        initValues,
        positiveRequestActions,
        entity
    } = props;

    const {
        alt,
        description,
        entityId,
        entityType,
        extension,
        fileName,
        fileType,
        title,
        licence,
        url,
    } = initValues;


    //Define if the form is creating a new file or if it is updating the values of an existing one.
    //Starting state is false since no new file has been passed
    const [isNewFile, setIsNewFile] = useState(!(initValues && url) || initValues.isDefault);
    //Authentication ref
    const auth = useAuth();

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();

    //Main form functionalities
    const {FormUI, submitRequest, formState, formTools, clearFormData, updateManyFields} = useFormUtils(
        {
            [mediaField]: {
                value: "",
                isValid:  true
            },
            licence: {
                value: licence ?? "",
                isValid: true
            },
            description: {
                value: description ?? '',
                isValid:  true
            },
            alt: {
                value: alt ?? '',
                isValid: true
            },
            title: {
                value: title ?? '',
                isValid: true
            }

        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );

    
    const convertToNewImageMode = () => {
       setIsNewFile(true);
       clearFormData();
    }

    useEffect(() => {
        if(!isNewFile){
            updateManyFields({
                [mediaField]: "", 
                licence: licence ?? "copyright",
                description: description ?? '',
                alt: alt ?? '',
                title: title ?? '',
            });
        }
    }, [isNewFile])

    //State to display the differents form "pages"
    const [formPage, setFormPage] = useState(0);

    //Watch for a new fil uploaded
    //useEffect(() => {
    //    if(url && formState.inputs["mainImage"].value !== initImgValue.current){
            //Tell the component that the image has been changed and so, if submitted, we have to upload it
    //        setIsNewFile(true);
    //    }
    //}, [formState.inputs["mainImage"].value])

    //upload vs update

    //Submit the form
    const submitHandler = async event => {
        event.preventDefault();
        /*
            CODE TO REPRODUCE INTO THE RIGHT UI
            Upload a media file will be seperate from the creation of an account
        */

        if(isNewFile){

            let rawFromData = new FormData();

            //Fields values
            const formData = {
                "title": formState.inputs.title.value,
                "alt": formState.inputs.alt.value,
                "description": formState.inputs.description.value,
                "licence": formState.inputs.licence.value ?? undefined,
                "fileType": "image",
                "mediaField": mediaField,
                "entityType": entity.type,
                "entityId": entity._id,
                "meta": getDefaultCreateEntityMeta(auth.user)
            }
            //Add the image to the form data object
            rawFromData.append(mediaField, formState.inputs[mediaField].value);
            //Add the field values
            rawFromData.append("data", JSON.stringify(formData));

            await submitRequest(
                "/medias/upload",
                'POST',
                rawFromData,
                {
                    'Accept': 'application/json'
                },
                {
                    isBodyJson: false
                }
            );
        }

        if(!isNewFile){

            const formData = {
                "data": {
                    "id": entity[mediaField]._id,
                    "title": formState.inputs.title.value,
                    "alt": formState.inputs.alt.value,
                    "description": formState.inputs.description.value,
                    "licence": formState.inputs.licence.value
                }
            }

            //Add data to the formData
            await submitRequest(
                "/medias/update",
                'POST',
                formData
            );
        }
    }

    const submitDelete = async event => {

        event.preventDefault();

        if (!confirm('Êtes-vous sûr de vouloir détruire cette photo ?')) {
            //Exit the function
            return;
        }

        //Send the request
        const path = `/medias/delete/${entity.type.toLowerCase()}/${entity._id}/${initValues.fileName}.${initValues.extension}`;
        await sendRequest(path, 'GET');
        if(props.setter) {
            const defaultUrl = getDefaultImageByEntityType(entity.type)
            props.setter({isDefault:true, url:defaultUrl});
        }
        setIsNewFile(true);
    }

    return (
        <form encType='multipart/form-data' className={`w-100 ${styles["create-media-form"]}`}>
            <FormUI />
            <div className="d-flex w-100">
                <div className="row w-100 gx-3">
                    {/* Column one */}
                    <div className={`col-12 col-md-6 ${styles["image-column"]}`}>
                        {isNewFile &&
                            <LargeFileInput 
                                name={mediaField}
                                label="Fichier"
                                formTools={formTools}
                                validationRules={[
                                    {name: "REQUIRED"},
                                    {name: "FILE_MAX_SIZE", specification: 1},
                                ]}
                            />
                        }
                        {!isNewFile &&
                            <>
                                {url &&
                                    <div className="position-relative">
                                        <img 
                                            className={`${styles["img-preview"]} position-absolute w-100 h-100`}
                                            src={process.env.NEXT_PUBLIC_API_URL + url} 
                                            alt={alt} 
                                        />
                                    </div>
                                }
                                {!url && 
                                    <div className="position-relative bg-secondary d-flex justify-content-center align-items-center">
                                        <p className="text-dark">Image impossible à afficher</p>
                                    </div>
                                }
                            </>
                        }

                        {/* Offer the option of adding a new file if the user wants to */}
                        { !isNewFile &&
                            <button type="button" onClick={convertToNewImageMode} className="mb-0 mt-1 fs-6 text-primary">Ajouter une nouvelle image</button>
                        }
                    </div>

                    {/* Column two */}
                    <div className={`col-12 col-md-6 ${styles["fields-column"]}`}>
                        <nav className={`container mb-2 ${styles["form-inner-nav"]}`}>
                            <h4 className="mb-1 d-flex justify-content-center text--dark fs-5">Informations</h4>
                            <div className="row">
                                <button aria-current={ formPage === 0 ? "page" : ""} className={`${styles["form-inner-nav__button"]} col fs-6`} type="button" onClick={() => setFormPage(0)}>
                                    De base
                                </button>
                                <button aria-current={ formPage === 1 ? "page" : ""} className={`${styles["form-inner-nav__button"]} col fs-6`} type="button" onClick={() => setFormPage(1)}>
                                    Avancées
                                </button>
                            </div>
                        </nav>
                        {/* Section one of the form */}
                        {formPage === 0 &&
                        <div>
                            Média associé à 
                            {/************  Waiting for the tag components ************/}
                            <EntityTag 
                                model={entity} 
                                addButton={false} 
                                addType={false}
                                className="mt-1 mb-2"
                            />
                            <SelectLicence
                                formTools={formTools}
                                name="licence"
                                tooltip={
                                    {
                                        header : "Recommandations",
                                        body: "Nous recommandons, lorsque possible, de rendre les données disponibles dans le cadre de la licence libre et ouverte Creative Commons CC BY-NC-SA 4.0"
                                    }
                                }
                            />
                            <Input
                                name="title"
                                label="Titre de l'image"
                                formTools={formTools}
                            />

                        </div>
                        }

                        {/* Section two of the form */}
                        {formPage === 1 &&
                        <div>
                            <Input 
                                name="alt"
                                label="Texte alternatif"
                                formTools={formTools}
                            />
                            <Textarea 
                                name="description"
                                label="Description"
                                formTools={formTools}
                            />
                        </div>
                        }
                        <div className="mt-2 d-flex gap-2 flex-wrap">
                                <Button
                                    disabled={entity?.[mediaField]?._id == undefined && (formState.inputs[mediaField].value == "" || formState.inputs[mediaField].value == undefined)}
                                    onClick={submitHandler}
                                    size="slim"
                                > Soumettre
                                </Button>
                                {!isNewFile &&
                                    <Button text_color="danger" onClick={submitDelete} type="button" className="fs-6"><u>Supprimer l'image</u></Button>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateMediaForm