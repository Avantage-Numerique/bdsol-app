import { useEffect, useState } from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import { useHttpClient } from '@/src/hooks/http-hook'

//components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import SelectLicence from '@/src/common/FormElements/SelectLicence/SelectLicence';
import Input from '@/FormElements/Input/Input'
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import { getDefaultCreateEntityMeta } from "@/src/DataTypes/Meta/EntityMeta";
import Media from '../../../models/Media';

//Styling
import styles from "./CreateMediaForm.module.scss";
import EntityTag from "@/DataTypes/Entity/layouts/EntityTag";

import { getDefaultImageByEntityType } from "@/src/helpers/images";


const CreateEditMediaForm = (props) => {

    const mediaField = props.mediaField ?? 'mainImage'
    const {
        initValues,
        positiveRequestActions,
        entity
    } = props;

    //const model = new Media(initValues)

    //Authentication ref
    const auth = useAuth();

    //Extract the functions inside useHttpClient to send api request
    const { isLoading, sendRequest } = useHttpClient();

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools, clearFormData, updateManyFields } = useFormUtils(
        {
            [mediaField]: {
                value: "",
                isValid: true
            },
            licence: {
                value: "",
                isValid: true
            },
            description: {
                value: '',
                isValid: true
            },
            alt: {
                value: '',
                isValid: true
            },
            title: {
                value: '',
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
        /*
            CODE TO REPRODUCE INTO THE RIGHT UI
            Upload a media file will be seperate from the creation of an account
        */

        if (isNewFile) {

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

        if (!isNewFile) {
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
            <FormUI/>
            <div>
                Ici gît le contenu de CreateEditMediaForm
            </div>
        </form>
    )


}

export default CreateEditMediaForm