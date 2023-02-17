import React from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//Components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import Select from '@/FormElements/Select/Select';
import FileInput from '@/FormElements/FileInput/FileInput';
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

const CreateMediaForm = ( {entityId} ) => {

    //Authentication ref
    const auth = useAuth();

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            entityId: {
                value: entityId,
                isValid: true
            },
            mainImage: {
                value: '',
                isValid:  true
            },
            licence: {
                value: '',
                isValid:  true
            }, 
            description: {
                value: '',
                isValid:  true
            },

        },
        {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );

    //Submit the form
    const submitHandler = async event => { 

            event.preventDefault();
            console.log(formState.inputs.mainImage.value)
            /*
    
                CODE TO REPRODUCE INTO THE RIGHT UI
                Upload a media file will be seperate from the creation of an account
    
            */

            console.log("called")
            let  rawFromData = new FormData();

            const formData = {
                "title": "allo",
                "alt": "picasso",
                "description": "une patate",
                "licence": "Public Domain (CC0)",
                "fileType":"image",
                "mediaField": "mainImage",
                "entityType": "persons",
                "entityId": formState.inputs.entityId.value,
                "status": {
                    "state": "pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id
                }
            }

            rawFromData.append("mainImage", formState.inputs.mainImage.value);

            rawFromData.append("data", JSON.stringify(formData));

    
            //rawFromData.append('data', JSON.stringify(formData));
            //rawFromData.append('mainImage', formState.inputs.mainImage.value);
    
            //Send the request with the specialized hook
            
            await submitRequest(
                "/medias/upload",
                'POST',
                rawFromData,
                {
                    //'Content-Type': 'multipart/form-data, boundary=patate',
                    
                    'Accept': 'application/json'
                },
                {
                    isBodyJson: false
                }
            );

            
            

    }

    return (
        <form encType='multipart/form-data' className="d-flex w-100">
            <div className="row w-100 gx-3">
            <div className="col-6">
                <LargeFileInput 
                    name="mainImage"
                    label="Fichier"
                    formTools={formTools}
                    validationRules={[
                        {name: "REQUIRED"},
                        {name: "FILE_MAX_SIZE", specification: 2}
                    ]}
                />
            </div>
            <div className="col-6">
            <Select 
                name="licence"
                label="licence"
                formTools={formTools}
            />
            <Textarea 
                name="description"
                label="description"
                formTools={formTools}
            />
            <Button
                onClick={submitHandler}
                size="slim"
            > Soumettre
            </Button>

            </div>
            </div>
        </form>
    )
}

export default CreateMediaForm