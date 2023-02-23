import {useEffect, useState, useContext} from 'react'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useHttpClient} from '@/src/hooks/http-hook'


//Components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import Select from '@/FormElements/Select/Select';
//import FileInput from '@/FormElements/FileInput/FileInput';
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";


const CreateMediaForm = (props) => {

    const {
        initValues,
        positiveRequestActions,
        entity
    } = props;

    //Authentication ref
    const auth = useAuth();

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    const mainImageUrl = initValues.mainImage?.url ? process.env.NEXT_PUBLIC_API_URL + initValues.mainImage?.url : undefined;

    //Main form functionalities
    const {FormUI, submitRequest, formState, formTools} = useFormUtils(
        {
            entityId: {
                value: initValues._id,
                isValid: true
            },
            mainImage: {
                value: mainImageUrl ?? "",
                isValid: true
            },
            licence: {
                value: initValues.licence ?? "-1",
                isValid: false
            },
            description: {
                value: initValues.description ?? "",
                isValid: true
            }
        },
        //Pass a set of rules to execute a valid response of an api request
        positiveRequestActions || {
            clearForm: true,            //Clear the form
            displayResMessage: true     //Display a message to the user to confirm the succes
        }
    );

    //State that holds the licence list
    const [licences, setLicences] = useState([]);


    //Fetch licence list on load
    useEffect(() => {
        const fetchLicences = async () => {

            //Send the request with the specialized hook
            const response = await sendRequest(
                '/static/licences/',
                'GET',
                null
            );

            //If response is positive, update the state and pass the result to the select input
            if (!response.error) {
                /*const arrayOfLicences = Object.values(response.data);
                const options = arrayOfLicences.map(obj => ({
                    label: obj.label,
                    value: obj.label,
                    disabled: false
                }));*/
                let options = [
                    {
                        label: '-- Choisissez une licence pour ce partage --',
                        value: '-1',
                        disabled: false
                    }
                ];
                Object.keys(response.data).map((licenceKey) => {
                        options.push({
                            label: response.data[licenceKey].label,
                            value: licenceKey,
                            disabled: false
                        });
                    }
                );
                setLicences(options);

            } else {
                //If negative, for now, inform the user
                msg.addMessage({
                    text: "Une erreur est survenue et la liste des licences n'a pas pu être chargée.",
                    positive: false
                })
            }
        }
        fetchLicences();
    }, [])

    //Submit the form
    const submitHandler = async event => {

        event.preventDefault();
        /*
            CODE TO REPRODUCE INTO THE RIGHT UI
            Upload a media file will be seperate from the creation of an account
        */

        let rawFromData = new FormData();

        const formData = {
            "title": entity.name ?? "allo",
            "alt": entity.name ?? "picasso",
            "description": formState.inputs.description.value,
            "licence": formState.inputs.licence.value,
            "fileType": "image",
            "mediaField": "mainImage",
            "entityType": entity.type,
            "entityId": formState.inputs.entityId.value,
            "status": getDefaultCreateEntityStatus(auth.user)
        }

        //Add data to the formData
        rawFromData.append("mainImage", formState.inputs.mainImage.value);
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

    return (
        <form encType='multipart/form-data' className={`w-100`}>
            <FormUI/>
            <div className="d-flex w-100">
                <div className="row w-100 gx-3">
                    {/* Column one */}
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
                    {/* Column two */}
                    <div className="col-6">
                        <Select
                            name="licence"
                            label="licence"
                            options={licences}
                            formTools={formTools}
                        />
                        <Textarea
                            name="description"
                            label="description"
                            formTools={formTools}
                        />
                        <div className="mt-2">
                            <Button
                                onClick={submitHandler}
                                size="slim"
                            > Soumettre
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateMediaForm