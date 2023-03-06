import { useEffect, useState, useContext } from 'react'

//Custom hooks
import { useFormUtils } from '@/src/hooks/useFormUtils/useFormUtils';
import { useHttpClient } from '@/src/hooks/http-hook'

//Components
import Button from '@/FormElements/Button/Button';
import Textarea from '@/FormElements/Textarea/Textarea';
import Select from '@/FormElements/Select/Select';
import Input from '@/FormElements/Input/Input'
import LargeFileInput from '@/FormElements/LargeFileInput/LargeFileInput'

//Context
import { useAuth } from "@/src/authentification/context/auth-context";
import { MessageContext } from '@/src/common/UserNotifications/Message/Context/Message-Context'

//Styling
import styles from "./CreateMediaForm.module.scss";


const CreateMediaForm = (props) => {

    const {
        initValues,
        positiveRequestActions,
        entity
    } = props;

    console.log("createMediaForm : ", entity, initValues);

    //For now, we assume the it is always going to be mainImage
    const {
        alt,
        description,
        entityId,
        entityType,
        extension,
        fileName,
        fileType,
        licence,
        url,
    } = initValues.mainImage;

    console.log("init value in field" , (initValues && initValues.mainImage) ? process.env.NEXT_PUBLIC_API_URL + url : '')
    
    //Authentication ref
    const auth = useAuth();

    //Extract the functions inside useHttpClient to send api request
    //NOT SUPPOSED TO BE USED
    const {isLoading, sendRequest} = useHttpClient();

    //Import message context 
    const msg = useContext(MessageContext);

    //Main form functionalities
    const { FormUI, submitRequest, formState, formTools } = useFormUtils(
        {
            entityId: {
                value: '',
                isValid: true
            },
            mainImage: {
                value: (initValues && initValues.mainImage) ? process.env.NEXT_PUBLIC_API_URL + url : '',
                isValid:  true
            },
            licence: {
                value: '',
                isValid:  true
            }, 
            description: {
                value: (initValues && initValues.mainImage) ? description : '',
                isValid:  true
            },
            alt: {
                value: (initValues && initValues.mainImage) ? alt : '',
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

    
    //Fetch licence list on load
    useEffect(() => {
        const fetchLicences = async() => {

            //Send the request with the specialized hook
            const response = await sendRequest (
                '/static/licences/',
                'GET',
                null
            );

            //If response is positive, update the state and pass the result to the select input
            if(!response.error) {
                const arrayOfLicences = Object.values(response.data);
                const options = arrayOfLicences.map(obj => ({label: obj.label, value: obj.label, disabled: false}));
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
            let  rawFromData = new FormData();

            const formData = {
                "title": entity.name ?? "allo",
                "alt": entity.name ?? "picasso",
                "description": formState.inputs.description.value,
                "licence":  "Public Domain (CC0)",
                "fileType": "image",
                "mediaField": "mainImage",
                "entityType": entity.type+"s",
                "entityId": formState.inputs.entityId.value,
                "status": {
                    "state": "pending",
                    "requestedBy": auth.user.id,
                    "lastModifiedBy": auth.user.id
                }
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
                            validationRules={[
                                {name: "REQUIRED"},
                                {name: "FILE_MAX_SIZE", specification: 2}
                            ]}
                        />
                    </div>

                    {/* Column two */}
                    <div className={`col-6 ${styles["fields-column"]}`}>
                
                        <nav className={`container mb-2 ${styles["form-inner-nav"]}`}>
                            <div className="row">
                                <button aria-current={ formPage === 0 ? "page" : ""} className={`${styles["form-inner-nav__button"]} col`} type="button" onClick={() => setFormPage(0)}>
                                    De base
                                </button>
                                <button aria-current={ formPage === 1 ? "page" : ""} className={`${styles["form-inner-nav__button"]} col`} type="button" onClick={() => setFormPage(1)}>
                                    Avancées
                                </button>
                            </div>
                        </nav>
                        {/* Section one of the form */}
                        {formPage === 0 &&
                        <div>
                            <small>Média associé à </small>
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