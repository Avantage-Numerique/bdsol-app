import {useEffect, useState, useContext, useRef} from 'react'

//Custom hooks
import {useFormUtils} from '@/src/hooks/useFormUtils/useFormUtils';
import {useHttpClient} from '@/src/hooks/http-hook'

//Components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import Select from '@/FormElements/Select/Select';
import Input from '@/FormElements/Input/Input'
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import {useAuth} from "@/src/authentification/context/auth-context";
import {MessageContext} from '@/src/common/UserNotifications/Message/Context/Message-Context'
import {getDefaultCreateEntityStatus} from "@/DataTypes/Status/EntityStatus";

//Styling
import styles from "./CreateMediaForm.module.scss";


const CreateMediaForm = (props) => {

    const {
        initValues,
        positiveRequestActions,
        entity
    } = props;

    //Define if the form is creating a new file or if it is in an update state.
    //Starting state is false since no new file has been passed
    const isNewFile = useRef(false);

    //For now, we assume the it is always going to be mainImage
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
    
    //Authentication ref
    const auth = useAuth();

    //Extract the functions inside useHttpClient to send api request
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    //Initial main image value 
    const initImgValue =  useRef(initValues ? process.env.NEXT_PUBLIC_API_URL + url : '');

    //Main form functionalities
    const {FormUI, submitRequest, formState, formTools} = useFormUtils(
        {
            mainImage: {
                value: initImgValue.current,
                isValid:  true
            },
            licence: {
                value: licence ?? "-1",
                isValid: true
            },
            description: {
                value: description ? description : '',
                isValid:  true
            },
            alt: {
                value: alt ? alt : '',
                isValid: true
            },
            title: {
                value: title ? title : '',
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

    //State to display the differents form "pages"
    const [formPage, setFormPage] = useState(0);

    //Watch for a new fil uploaded
    useEffect(() => {
        if(url && formState.inputs["mainImage"].value !== initImgValue.current){
            //Tell the component that the image has been changed and so, if submitted, we have to upload it
            isNewFile.current = true;
        }
    }, [formState.inputs["mainImage"].value])

    
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

    //upload vs update

    //Submit the form
    const submitHandler = async event => {

        event.preventDefault();
        /*
            CODE TO REPRODUCE INTO THE RIGHT UI
            Upload a media file will be seperate from the creation of an account
        */

        if(isNewFile.current){
            
            let rawFromData = new FormData();

            //Feilds values
            const formData = {
                "title": formState.inputs.title.value,
                "alt": formState.inputs.alt.value,
                "description": formState.inputs.description.value,
                "licence": formState.inputs.licence.value,
                "fileType": "image",
                "mediaField": "mainImage",
                "entityType": entity.type,
                "entityId": entity._id,
                "status": getDefaultCreateEntityStatus(auth.user)
            }
            //Add the image to the form data object
            rawFromData.append("mainImage", formState.inputs.mainImage.value);
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

        if(!isNewFile.current){

            const formData = {
                "data": {
                    "id": entity.mainImage._id,
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

    return (
        <form encType='multipart/form-data' className={`w-100 ${styles["create-media-form"]}`}>
            <FormUI />
            <div className="d-flex w-100">
                <div className="row w-100 gx-3">
                    {/* Column one */}
                    <div className={`col-6 ${styles["image-column"]}`}>
                        <LargeFileInput 
                            name="mainImage"
                            label="Fichier"
                            formTools={formTools}
                           
                        />
                    </div>

                    {/* Column two */}
                    <div className={`col-6 ${styles["fields-column"]}`}>
                
                        <nav className={`container mb-2 ${styles["form-inner-nav"]}`}>
                            <p className="mb-0 ">Informations</p>
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
                            {/* Waiting for the tag components */}
                            <article className={`rounded d-flex ${styles["temporary-entity-tag"]}`}>
                                {entity.mainImage && 
                                <figure className="m-0">
                                    <img 
                                        src={process.env.NEXT_PUBLIC_API_URL + entity.mainImage.url} 
                                        alt={entity.mainImage.alt && entity.mainImage.alt} 
                                        className={``} 
                                    />
                                </figure>
                                }

                                <div className={`d-flex flex-column ms-2 py-1 ${styles["temporary-entity-tag__texts"]}`}>
                                    {entity.fullName && <p className="m-0 fs-6">{entity.fullName}</p>}
                                    {entity.name && <p className="m-0 fs-6">{entity.name}</p>}
                                    {entity.type == "person" && <p className="m-0 fs-6">Personne</p>}
                                    {entity.type == "organisation" && <p className="m-0 fs-6">Organisation</p>}
                                </div>
                            </article>
                            <Select 
                                name="licence"
                                label="licence"
                                options={licences}
                                formTools={formTools}
                            />
                            <small className="fs-6">Plus de détails sur les licences possibles.</small>
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
                                <Button 
                                    color="danger"
                                    size="slim"
                                >
                                    Supprimer
                                </Button>
          
                            </div>
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
                        </div>
                        }
                    </div>


                </div>
            </div>
        </form>
    )
}

export default CreateMediaForm