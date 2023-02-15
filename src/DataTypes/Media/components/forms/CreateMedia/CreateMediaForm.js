import React from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';

//Components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import Select from '@/FormElements/Select/Select';
import FileInput from '@/FormElements/FileInput/FileInput';

//Context
import { useAuth } from "@/src/authentification/context/auth-context";

const CreateMediaForm = () => {

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            media: {
                value: '',
                isValid: false
            },
            licence: {
                value: '',
                isValid: false
            }, 
            description: {
                value: '',
                isValid: false
            },

        },
        {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );

    return (
        <form>
            <FileInput 
                name="media"
                label="Fichier"
                formTools={formTools}
            />
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
            <Button>Soumettre</Button>
        </form>
    )
}

export default CreateMediaForm